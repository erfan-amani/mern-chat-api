const Message = require("../models/message");
const { getUserSocketConnection } = require("../utils/socket");

const registerMessageHandler = async (socket, io) => {
  socket.on("send_message", async (data) => {
    const { text, room } = data || {};

    const message = new Message({ room, text, sender: socket.user._id });
    await message.save(); // save earlier because of populate('lastMessage')

    await message.populate("room");

    const noChatHistory = !message.room.lastMessage;
    message.room.lastMessage = message._id;

    await message.room.populate("users");
    await message.room.populate("lastMessage");

    if (noChatHistory) {
      for (const user of message.room.users) {
        const userSocket = await getUserSocketConnection(io, user._id);
        userSocket.join(room.toString());
        // because user joint to room here we emit data directly
        userSocket.emit("room_update", message.room);
        userSocket.emit("message", message);
      }
    } else {
      io.to(room).emit("room_update", message.room);
      io.to(room).emit("message", message);
    }

    await message.room.save();
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
