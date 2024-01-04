const db = require("../models/db");
const User = db.user;

const checkUser = async (id) => {
	
	let user = await User.findOne({
		where: {
			id: id
		}
	});
	
	return !!user;
	
};

module.exports = {
	checkUser
};