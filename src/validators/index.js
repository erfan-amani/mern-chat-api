const { registerSchema, loginSchema } = require("./auth.validator");
const { getAllMessagesSchema } = require("./message.validator");

module.exports = { registerSchema, loginSchema, getAllMessagesSchema };
