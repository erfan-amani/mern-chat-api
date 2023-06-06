const express = require("express");
require("dotenv").config();

const db = require("./db/mongoose");
const authRouter = require("./routes/auth");

console.log(process.env);

const app = express();

app.use("/auth", authRouter);

module.exports = app;
