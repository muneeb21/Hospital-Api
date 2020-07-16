const Patient = require('../../../models/patient');
const jwt = require('jsonwebtoken');
const Report=require('../../../models/patient-report');
// const { report } = require('../../../routes');


// Register a new patient

module.exports.register = async function(req, res)  {
	try {
		const { name, phonenumber } = req.body;
		let patient = await Patient.findOne({phonenumber: req.body.phonenumber}).populate({
			
			// Populatinng necessary information
			
			path: "reports",
			select: "-patient -__v",
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

		// If patient is not registered then register 
        let newPatient = await Patient.create({name, phonenumber });
		

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




		

// After registering a patient a doctor has to create a report

module.exports.createReport = async function(req, res){
    try { 
		
		
		let patient=await Patient.findById(req.params.id);
		
		// If patient id exists
		if (!patient)
			return res.status(200).json({ message: "Patient not registered" });

        // Else adding creating a new report of patient and saving it
		const reportData = {
			status: req.body.status,
			date: req.body.date,
			doctor: req.user._id,
			patient: patient,
		};

		let report = await Report.create(reportData);
		patient.reports.unshift(report);
        await patient.save();
		
		return res.status(200).json({ message: "Patient Report Added " });
	
	
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}

    
}



// Action for fetching all the reports of a patient
module.exports.GetallReports = async function(req, res){

    try{
		let patient = await Patient.findById(req.params.id).populate({
			// Populating necessary information
			path: "reports",
			select: "-patient -__v",
			populate: { path: "doctor", select: "-password -__v" },
		});
        
        
        //   if patient exists then returning all reports
		if(patient){
			
            return res.status(200).json({
                message:"List of all patient reports",
                reports:patient.reports
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



