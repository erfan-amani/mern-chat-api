const Joi = require("joi");

const getAllMessagesSchema = Joi.object({
  room: Joi.string().required(),
});

module.exports = { getAllMessagesSchema };
