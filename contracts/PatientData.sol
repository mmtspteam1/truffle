// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientData {
    struct Patient {
        uint256 id;
        string name;
        string dob;
        uint8 age;
        string gender;
        string medicalCondition;
        string bloodType;
        string medicalHistory;
        string medication;
        string lastCheckupDate;
        string notes;
    }

    mapping(uint256 => Patient) public patients;
    uint256 public patientCount;

    event PatientAdded(uint256 id, string name);

    // Function to add multiple patients at once
    function addPatients(
        string[] memory _names,
        string[] memory _dobs,
        uint8[] memory _ages,
        string[] memory _genders,
        string[] memory _medicalConditions,
        string[] memory _bloodTypes,
        string[] memory _medicalHistories,
        string[] memory _medications,
        string[] memory _lastCheckupDates,
        string[] memory _notes
    ) public {
        require(
            _names.length == _dobs.length &&
                _dobs.length == _ages.length &&
                _ages.length == _genders.length &&
                _genders.length == _medicalConditions.length &&
                _medicalConditions.length == _bloodTypes.length &&
                _bloodTypes.length == _medicalHistories.length &&
                _medicalHistories.length == _medications.length &&
                _medications.length == _lastCheckupDates.length &&
                _lastCheckupDates.length == _notes.length,
            "All input arrays must have the same length."
        );

        for (uint256 i = 0; i < _names.length; i++) {
            patientCount++;
            patients[patientCount] = Patient(
                patientCount,
                _names[i],
                _dobs[i],
                _ages[i],
                _genders[i],
                _medicalConditions[i],
                _bloodTypes[i],
                _medicalHistories[i],
                _medications[i],
                _lastCheckupDates[i],
                _notes[i]
            );
            emit PatientAdded(patientCount, _names[i]);
        }
    }

    // Function to retrieve a single patient's details by ID
    function getPatient(
        uint256 _id
    )
        public
        view
        returns (
            uint256 id,
            string memory name,
            string memory dob,
            uint8 age,
            string memory gender,
            string memory medicalCondition,
            string memory bloodType,
            string memory medicalHistory,
            string memory medication,
            string memory lastCheckupDate,
            string memory notes
        )
    {
        require(_id > 0 && _id <= patientCount, "Patient does not exist.");

        Patient memory patient = patients[_id];
        return (
            patient.id,
            patient.name,
            patient.dob,
            patient.age,
            patient.gender,
            patient.medicalCondition,
            patient.bloodType,
            patient.medicalHistory,
            patient.medication,
            patient.lastCheckupDate,
            patient.notes
        );
    }
}
