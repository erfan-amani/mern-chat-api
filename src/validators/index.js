const { registerSchema, loginSchema } = require("./auth.validator");
const { getAllMessagesSchema } = require("./message.validator");
const { getNotificationSchema } = require("./notification.validator");

module.exports = {
  registerSchema,
  loginSchema,
  getAllMessagesSchema,
  getNotificationSchema,
};
