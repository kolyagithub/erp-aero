require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const morgan = require("morgan");
const app = express();
const config = require("./config/app.config.js");

app.use(bodyParser.json());
app.use(cors());

// logging
const logMorgan = morgan("common");

// database
const db = require("./models/db");
db.sequelize.sync();

app.use("/", logMorgan, routes);

app.listen(config.port, () => {
	console.log(`ERP AERO server is running on port ${config.port}`);
});