const PatientData = artifacts.require("PatientData");

module.exports = async function(callback) {
  try {
    const patientData = await PatientData.deployed();

    // Retrieve the patient data directly from the blockchain
    const patientId = 2; // Change this to the ID of the patient you want to retrieve
    const patient = await patientData.getPatient(patientId);
    
    console.log("Patient Data:");
    console.log("ID: ", patient.id.toString());
    console.log("Name: ", patient.basicInfo.name);
    console.log("Age: ", patient.basicInfo.age.toString());
    console.log("Gender: ", patient.basicInfo.gender);
    console.log("Blood Group: ", patient.basicInfo.bloodGroup);
    console.log("Condition: ", patient.medicalInfo.condition);
    console.log("Medications: ", patient.medicalInfo.medications);
    console.log("Last Check-up Date: ", patient.medicalInfo.lastCheckupDate);
    console.log("BMI: ", patient.medicalInfo.bmi);
    console.log("Location: ", patient.medicalInfo.location);
    console.log("Note: ", patient.additionalInfo.note);
    console.log("History: ", patient.additionalInfo.history);
    console.log("Filename: ", patient.additionalInfo.filename);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
