const Report = require('../../../models/patient-report');


// Action for fetching all the reports classified by a status
module.exports.ReportsByStatus = async function(req, res)  {
	try {
		

		let reports = await Report.find({ status: req.params.status })
			
		
		   // Populating necessary information only
			.populate({ path: "patient", select: "-reports -password -__v" })
			.populate({ path: "doctor", select: "-password -__v" });

		return res.status(200).json({
			message: " Fetched all reports according to status",
			data: {
				reports: reports,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};