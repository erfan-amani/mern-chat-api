const Message = require("../models/message");
const createError = require("../utils/error");
const { getAllMessagesSchema } = require("../validators");

const getMessagesOfRoom = async (req, res, next) => {
  try {
    await getAllMessagesSchema.validateAsync(req.query);

    const room = req.query.room;

    const messages = await Message.find({ room });

    res.send(messages);
  } catch (err) {
    next(createError(err));
  }
};

module.exports = {
  getMessagesOfRoom,
};
