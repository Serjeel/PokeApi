export { }
require("./config/database").connect();
const express = require("express");
const passport = require('passport')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

const userRoute = require("./routes/userRoute");

app.use("/user", userRoute);

module.exports = app;