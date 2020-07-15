
const express = require("express");
const router = express.Router();
const passport=require("passport");

router.use('/doctor',require('./doctor'));
router.use('/patient',require('./patient'));

const reportsController = require("../../../controllers/api/v1/report_controller");

router.get(
	"/reports/:status",
	passport.authenticate("jwt", { session: false }),
	reportsController.ReportsByStatus
);

router.use("/", (req, res) => {
	return res.status(404).json({
		message: "Server could not find the requested resource, Check Request Again",
	});
});
module.exports=router;