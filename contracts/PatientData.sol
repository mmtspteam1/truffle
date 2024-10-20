// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientData {
    struct BasicInfo {
        string name;
        uint age;
        string gender;
        string bloodGroup;
    }

    struct MedicalInfo {
        string condition;
        string medications;
        string lastCheckupDate;
        string bmi;
        string location;
    }

    struct AdditionalInfo {
        string note;
        string history;
        string filename;
    }

    struct Patient {
        uint id;
        BasicInfo basicInfo;
        MedicalInfo medicalInfo;
        AdditionalInfo additionalInfo;
    }

    mapping(uint => Patient) public patients;
    uint public patientCount;

    // Function to add patient basic info
    function addBasicInfo(
        uint _id,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _bloodGroup
    ) public {
        Patient storage patient = patients[_id];
        patient.id = _id;
        patient.basicInfo = BasicInfo(_name, _age, _gender, _bloodGroup);
        patientCount++;
    }

    // Function to add medical info
    function addMedicalInfo(
        uint _id,
        string memory _condition,
        string memory _medications,
        string memory _lastCheckupDate,
        string memory _bmi,
        string memory _location
    ) public {
        Patient storage patient = patients[_id];
        patient.medicalInfo = MedicalInfo(_condition, _medications, _lastCheckupDate, _bmi, _location);
    }

    // Function to add additional info
    function addAdditionalInfo(
        uint _id,
        string memory _note,
        string memory _history,
        string memory _filename
    ) public {
        Patient storage patient = patients[_id];
        patient.additionalInfo = AdditionalInfo(_note, _history, _filename);
    }

    // Function to retrieve patient data
    function getPatient(uint _id) public view returns (Patient memory) {
        return patients[_id];
    }
}
