const PatientData = artifacts.require("PatientData");  // Import the contract

const patientsData = require('../patients.json');  // Load the patients data from the JSON file

module.exports = async function (deployer) {
    const instance = await PatientData.deployed();  // Get the deployed instance of the contract

    // Loop through each patient and add it to the blockchain
    for (let i = 0; i < patientsData.length; i++) {
        const patient = patientsData[i];

        // Add the patient to the blockchain using the contract's method
        // Ensure that the function parameters in Solidity contract match with below values
        await instance.addPatient(
            patient.Id,                     // Id from the JSON
            patient.name,                   // Name
            patient.Age,                    // Age
            patient.Gender,                 // Gender
            patient["Blood group"],         // Blood group
            patient["Medical Conidtion"],   // Medical condition
            patient.Medications,            // Medications
            patient["Last Check-up date"],  // Last check-up date
            patient.BMI,                    // BMI (Make sure the field is correct in JSON)
            patient.location,               // Location
            patient.Note                    // Note about patient
        );
    }
};
