const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');



// login/sign up for a doctor

module.exports.login = async function(req, res){

    try{
        let doctor = await Doctor.findOne({email: req.body.email});

        if (!doctor){
            return res.json(422, {
                message: "Invalid username "
			});
			
		}

		// Comparing entered password with stored password
		
			if (req.body.password!=doctor.password){
				return res.status(401).json({ message: "Invalid  Password" });
			}
        return res.json(200, {
            message: 'Sign in successful',
            data:  {
                token: jwt.sign(doctor.toJSON(), 'codeial', {expiresIn:  '9000000000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}




// Register a new doctor
module.exports.register = async function(req, res)  {
	try {
		const { name, email, password } = req.body;
		let doctor = await Doctor.findOne({email: req.body.email});

		// Check if user is already Registered
		if (doctor) {
			return res.status(200).json({
				message:
					"This email is already registered, try with another email or login instead",
			});
		}

		
        //  Else register a new doctor
		const newDoctor=await Doctor.create( { name, email, password });

		

		return res.status(200).json({
			message: `Registration successful`,
			data:  {
                token: jwt.sign(newDoctor.toJSON(), 'codeial', {expiresIn:  '90000000000'})
            }
		});

	
	

	} catch (err) {
		console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
