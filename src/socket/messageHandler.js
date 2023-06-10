const Room = require("../models/room");

const registerMessageHandler = (socket, io) => {
  socket.on("join", async (other, callback) => {
    let room;
    room = await Room.findOne({ users: { $in: [other, socket.user._id] } });
    if (!room) {
      room = new Room();
      room.users.push(other, socket.user._id);
      await room.save();
    }

    socket.join(room._id.toString());

    callback(room);
  });

  socket.on("sendMessage", (message) => {
    const { text, room } = message || {};

    io.to(room).emit("message", text);
  });
};

module.exports = registerMessageHandler;
