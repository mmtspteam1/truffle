import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers'; // Correct import for ethers v6
import PatientData from './PatientData.json'; // ABI and Contract address file

const App = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                console.log("Checking if MetaMask is available...");

                // Check if MetaMask is installed
                if (window.ethereum) {
                    const provider = new BrowserProvider(window.ethereum);
                    await provider.send("eth_requestAccounts", []); // Request MetaMask accounts

                    const signer = await provider.getSigner();

                    console.log("MetaMask connected. Fetching contract info...");

                    // Check if contract data is available for Sepolia network (11155111)
                    if (!PatientData.networks["11155111"]) {
                        setError("Contract is not deployed on the Sepolia network.");
                        setLoading(false);
                        return;
                    }

                    const contractAddress = PatientData.networks["11155111"].address;
                    const contractABI = PatientData.abi;

                    console.log("Contract Address: ", contractAddress);
                    
                    const contract = new Contract(contractAddress, contractABI, signer);

                    console.log("Fetching patient count...");
                    const patientCount = await contract.patientCount();

                    // Convert to a normal number using Number()
                    const patientCountNum = Number(patientCount); // Using Number instead of BigInt

                    if (patientCountNum === 0) {
                        setError("No patients found in the contract.");
                        setLoading(false);
                        return;
                    }

                    console.log(`Found ${patientCountNum} patients. Fetching details...`);

                    const fetchedPatients = [];
                    for (let i = 1; i <= patientCountNum; i++) {
                        const patient = await contract.getPatient(i);
                        fetchedPatients.push({
                            id: patient[0].toString(),
                            name: patient[1],
                            dob: patient[2],
                            age: patient[3].toString(),
                            gender: patient[4],
                            medicalCondition: patient[5],
                            bloodType: patient[6],
                            medicalHistory: patient[7],
                            medication: patient[8],
                            lastCheckupDate: patient[9],
                            notes: patient[10]
                        });
                    }

                    setPatients(fetchedPatients);
                    setLoading(false);
                    console.log("Patient data fetched successfully.");
                } else {
                    console.error("MetaMask not found.");
                    setError("Ethereum object not found. Please install MetaMask.");
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error in fetchPatients: ", err);
                setError("Failed to load patient data. " + err.message);
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Patient Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Medical Condition</th>
                            <th>Blood Type</th>
                            <th>Medical History</th>
                            <th>Medication</th>
                            <th>Last Checkup Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.medicalCondition}</td>
                                <td>{patient.bloodType}</td>
                                <td>{patient.medicalHistory}</td>
                                <td>{patient.medication}</td>
                                <td>{patient.lastCheckupDate}</td>
                                <td>{patient.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
