const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
	
	try {
		
		const authorization = req.headers.authorization || req.headers["authorization"];
		if (!authorization) {
			return res.status(403).send({
				message: "Token not found"
			});
		}
		
		const bearer = authorization.split(" ");
		if (!bearer || bearer.length < 2) {
			return res.status(403).send({
				message: "Invalid token"
			});
		}
		const accessToken = bearer[1];
		
		jwt.verify(accessToken, config.secret, (err, _) => {
			
			if (err) {
				return res.status(401).send({
					message: "Unauthorized!"
				});
			}
			next();
			
		});
		
	} catch (e) {
		console.error("Catch exception in verify JWT token", e.message);
		return null;
	}
};

module.exports = {
	verifyToken
};