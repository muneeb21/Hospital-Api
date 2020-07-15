const Report = require('../../../models/patient-report');



module.exports.ReportsByStatus = async function(req, res)  {
	try {
		

		let reports = await Report.find({ status: req.params.status })
			// Dont populate sensitive/redundant fields
			.populate({ path: "patient", select: "-reports -password -__v" })
			.populate({ path: "doctor", select: "-password -__v" });

		return res.status(200).json({
			message: "Fetched Reports Successfully",
			data: {
				reports: reports,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};