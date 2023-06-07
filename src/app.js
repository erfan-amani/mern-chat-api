const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);

module.exports = app;
