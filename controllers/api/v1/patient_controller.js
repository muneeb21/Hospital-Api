const Patient = require('../../../models/patient');
const jwt = require('jsonwebtoken');
const Report=require('../../../models/patient-report');

// Register a new patient
module.exports.register = async function(req, res)  {
	try {
		const { name, phonenumber, password } = req.body;
		let patient = await Patient.findOne({phonenumber: req.body.phonenumber}).populate({
			
			// If patient already exists, populate all fields except patient and return existing records
			path: "reports",
			select: "-patient -__v",

			// Dont populate Doctor's encrypted password in results
			populate: { path: "doctor", select: "-password -__v" },
        });

		// If user is already Registered
		if (patient) {
			return res.status(200).json({
				message:
                    "This patient is already registered",
                    data: { patient: patient },
			});
		}

		
        let newPatient = await Patient.create({name, phone });
		

		return res.status(200).json({
			message: `Patient registered successfully `,
			data: {
				patientId: newPatient._id,
			},
		});

	} catch (err) {
		console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}




		



module.exports.createReport = async function(req, res){
    try {
		

		// if input is a valid MongoDB id 
		
		
		let patient=await Patient.findById(req.params.id);
		if (!patient)
			return res.status(200).json({ message: "Patient not registered, register the patient first" });


		const reportData = {
			status: req.body.status,
			date: req.body.date,
			doctor: req.user._id,
			patient: patient,
		};

		// Add new Report
		let report = await Report.create(reportData);
        await patient.save();
		
		return res.status(200).json({ message: "Patient Report Added Successfully" });
	
	
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}

    
}




module.exports.GetallReports = async function(req, res){

    try{
		let patient = await (await Patient.findById(req.params.id)).sort('-createdAt')
		.populate({
			// Dont populate sensitive/redundant fields
			path: "reports",
			select: "-patient -__v",
			populate: { path: "doctor", select: "-password -__v" },
		});
        
        

		if(patient){
            let reports = await patient.reports;
            return res.status(200).json({
                message:"List of all patient reports",
                reports:reports
            })
        }else{
            return res.status(200).json({
                message:"No reports found",
            })
        }
		
        
        
        

    }catch(err){
        console.log('********', err);
        return res.status(500).json( {
            message: "Internal Server Error"
        });
    }
    
}



