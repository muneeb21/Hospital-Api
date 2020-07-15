const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");




module.exports.login = async function(req, res){

    try{
        let docotr = await Doctor.findOne({email: req.body.email});

        if (!doctor || doctor.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '100000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}




// Register a new Doctor
module.exports.register = async function(req, res)  {
	try {
		const { name, email, password } = req.body;
		let doctor = await Doctor.findOne({email: req.body.email});

		// If user is already Registered
		if (doctor) {
			return res.status(200).json({
				message:
					"This email is already registered, try with another email or login instead",
			});
		}

		// Encrypt Password
		const salt = await bcrypt.genSalt(10);
		const hashedPwd = await bcrypt.hash(password, salt);

		let newDoctor = await Doctor.create({ name, email, password: hashedPwd });

		

		return res.status(200).json({
			message: `Registration successful, token expires soon`,
			data:  {
                token: jwt.sign(doctor.toJSON(), 'codeial', {expiresIn:  '100000'})
            }
		});

	} catch (err) {
		console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
