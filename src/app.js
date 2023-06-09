const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();

const { socketAuth } = require("./middlewares/auth");
const registerMessageHandler = require("./socket/messageHandler");
const registerChatDataHandler = require("./socket/chatDataHandler");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");
const notificationRouter = require("./routes/notification");
const { getConnectedUsers } = require("./utils/socket");
require("./db/mongoose");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.use(socketAuth);

io.on("connection", (socket) => {
  registerChatDataHandler(socket, io);
  registerMessageHandler(socket, io);

  app.set("io", io);

  socket.on("disconnect", () => {
    const users = getConnectedUsers(io);
    io.emit("chatData", users);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/message", messageRouter);
app.use("/notification", notificationRouter);

app.use((error, req, res, next) => {
  const { status = 500, message = error } = error || {};

  res.status(status).send(message);
});

module.exports = server;
