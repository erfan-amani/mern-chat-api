const Message = require("../models/message");

const getMessagesOfRoom = async (req, res) => {
  try {
    const room = req.query.room;

    console.log(!room);

    if (!room) {
      return res.status(400).send("Please provide room!");
    }

    const messages = await Message.find({ room });

    res.send(messages);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong!");
  }
};

module.exports = {
  getMessagesOfRoom,
};
