const Room = require("../models/room");
const Message = require("../models/message");
const { getOrCreateRoom, getActiveRooms } = require("../utils/room");

const registerMessageHandler = (socket, io) => {
  socket.on("join", async (other, callback) => {
    const { room } = await getOrCreateRoom(socket.user._id, other);

    socket.join(room._id.toString());

    callback(room);
  });

  socket.on("sendMessage", async (data) => {
    const { text, room } = data || {};

    const message = new Message({ room, text, sender: socket.user._id });

    await message.populate("room");
    message.room.lastMessage = message._id;
    await message.room.save();
    await message.save();

    io.to(room).emit("message", message);

    const rooms = await getActiveRooms(socket.user, room);
    io.to(room).emit("activeRooms", rooms);
  });
};

module.exports = registerMessageHandler;
