const Room = require("../models/room");
const Message = require("../models/message");
const { getActiveRooms } = require("../utils/room");

const registerMessageHandler = async (socket, io) => {
  socket.on("send_message", async (data) => {
    const { text, room } = data || {};

    const message = new Message({ room, text, sender: socket.user._id });

    await message.populate("room");
    message.room.lastMessage = message._id;
    await message.room.save();
    await message.save();

    io.to(room).emit("message", message);

    const updatedRoom = await getActiveRooms(socket.user, room);
    io.to(room).emit("room_update", updatedRoom);
  });

  socket.on("read", async (messageId, cb) => {
    try {
      if (!messageId) throw new Error("No id provided!");

      const message = await Message.findOne({ _id: messageId, read: false });

      if (!message) throw new Error("Message not found!");

      message.read = true;
      await message.save();

      io.to(message.room.toString()).emit("message_update", message);
      cb();
    } catch (err) {
      cb(err.message || err);
    }
  });
};

module.exports = registerMessageHandler;
