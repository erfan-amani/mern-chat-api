const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;

  try {
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) throw new Error();

    socket.user = user;
    socket.token = token;

    next();
  } catch (err) {
    next(new Error("Not authorized. Please provide a valid token!"));
  }
});

io.on("connection", (socket) => {
  console.log(socket.user);

  socket.emit("test");
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
