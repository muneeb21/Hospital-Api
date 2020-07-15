const express = require("express");
const router = express.Router();
const passport = require("passport");

const patientController = require("../../../controllers/api/v1/patient_controller");

router.post(
	"/register",passport.authenticate("jwt", { session: false }),patientController.register
);

router.post(
	"/:id/create-report",passport.authenticate("jwt", { session: false }),
	patientController.createReport
);

router.get(
	"/:id/all-reports",
	passport.authenticate("jwt", { session: false }),
	patientController.GetallReports
);

module.exports = router;