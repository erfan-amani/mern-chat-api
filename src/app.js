const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();

const { socketAuth } = require("./middlewares/auth");
const registerMessageHandler = require("./socket/messageHandler");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.use(socketAuth);

io.on("connection", (socket) => {
  registerMessageHandler(socket);
});

const db = require("./db/mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((error, req, res, next) => {
  res.status(500).send(error.message || error);
});

module.exports = server;
