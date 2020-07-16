
const express = require("express");
const router = express.Router();
const passport=require("passport");

router.use('/doctor',require('./doctor'));
router.use('/patient',require('./patient'));


// Creating a route for fetching reports classified by status
const reportsController = require("../../../controllers/api/v1/report_controller");

router.get(
	"/reports/:status",
	passport.authenticate("jwt", { session: false }),
	reportsController.ReportsByStatus
);


module.exports=router;