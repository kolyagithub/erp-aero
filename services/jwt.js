const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const generateJwt = (payload, expireIn) => {
	
	return jwt.sign(payload, config.secret,
		{
			algorithm: "HS256",
			expiresIn: expireIn
		});
	
};

const verifyJwt = (token) => {
	
	return new Promise((resolve, reject) => {
		
		jwt.verify(token, config.secret, (err, payload) => {
			
			if (err) {
				return reject(err);
			}
			resolve(payload.id);
			
		});
		
	})
	
};

module.exports = {
	generateJwt,
	verifyJwt
};