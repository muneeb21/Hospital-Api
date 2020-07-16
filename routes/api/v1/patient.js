const express = require("express");
const router = express.Router();
const passport = require("passport");

const patientController = require("../../../controllers/api/v1/patient_controller");

// for registering a new patient
router.post(
	"/register",passport.authenticate("jwt", { session: false }),patientController.register);

// for creating a new report
router.post(
	"/:id/create-report",passport.authenticate("jwt", { session: false }),
	patientController.createReport);

// for getting all the reports of a patient
router.get(
	"/:id/all-reports",
	passport.authenticate("jwt", { session: false }),patientController.GetallReports);

module.exports = router;