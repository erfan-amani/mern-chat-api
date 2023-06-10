const Room = require("../models/room");
const Message = require("../models/message");

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

  socket.on("sendMessage", async (data) => {
    const { text, room } = data || {};

    const message = new Message({ room, text, sender: socket.user._id });
    await message.save();

    io.to(room).emit("message", message);
  });
};

module.exports = registerMessageHandler;
