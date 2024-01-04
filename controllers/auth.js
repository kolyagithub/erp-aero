const db = require("../models/db");
const User = db.user;
const bcrypt = require("bcryptjs");
const { generateJwt, verifyJwt } = require("../services/jwt");
const { checkUser } = require("../services/user");


module.exports = {
	
	signUp: async (req, res) => {
		
		try {
			
			const userId = req.body.login;
			const password = req.body.password;
			
			if(!userId || !password) {
				return res.status(400).send({ message: "Bad request" });
			}
			
			const isExistsUser = await checkUser(userId);
			
			if(isExistsUser) {
				return res.status(400).send({ message: "User already exists. Please login" });
			}
			
			await User.create({
				id: userId,
				password: bcrypt.hashSync(password, 10),
			});
			
			res.send({ message: "User created!" });
			
		} catch (e) {
			console.error("Catch exception in signUp()", e.message);
			res.status(500).send({ message: "Internal server error" });
		}
		
	},
	
	signIn: async (req, res) => {
		
		try {
			
			const userId = req.body.login;
			const password = req.body.password;
			
			if(!userId || !password) {
				return res.status(400).send({ message: "Bad request" });
			}
			
			const user = await User.findOne({
				where: {
					id: userId
				},
			});
			if (!user) {
				return res.status(404).send({ message: "User not found." });
			}
			
			const passwordIsValid = bcrypt.compareSync(password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({ message: "Invalid login or password!" });
			}
			
			const accessToken = generateJwt({ id: user.id }, 600); // 10 min
			const refreshToken = generateJwt({ id: user.id }, 86400); // 24 hours
			
			return res.status(200).send({
				accessToken: accessToken,
				refreshToken: refreshToken
			});
			
		} catch (e) {
			console.error("Catch exception in signUp()", e.message);
			res.status(500).send({ message: "Internal server error" });
		}
	
	},
	
	refreshToken: async (req, res) => {
		
		const refreshToken = req.body.refreshToken;
		if(!refreshToken) {
			return res.status(400).send({ message: "Bad request" });
		}
		
		verifyJwt(refreshToken).then((userId) => {
			
			const accessToken = generateJwt({ id: userId }, 600);
			return res.status(200).send({
				accessToken: accessToken,
				refreshToken: refreshToken
			});
			
		}).catch(e => {
			console.error("Catch exception in refreshToken()", e.message);
			res.status(401).send({ message: "Refresh token expired or invalid" });
		})
	
	},
	
};