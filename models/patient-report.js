const mongoose = require("mongoose");
const Doctor = require("./doctor.js");
const Patient=require("./patient.js")

// Schema for every report

const PatientReportSchema = new mongoose.Schema({
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	date: {
		type: String,
		// Change UTC to IST
		// default: getCurrentIST(),
	},
	status: {
		type: String,
		required: true,
		enum: ["Negative", "Travelled", "Symptoms", "Positive"],
	},
});

const Report = mongoose.model("Patient-report", PatientReportSchema);
module.exports = Report;