const Message = require("../models/message");
const createError = require("../utils/error");

const getMessagesOfRoom = async (req, res, next) => {
  try {
    const room = req.query.room;

    if (!room) {
      throw createError("Please provide room!", 400);
    }

    const messages = await Message.find({ room });

    res.send(messages);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessagesOfRoom,
};
