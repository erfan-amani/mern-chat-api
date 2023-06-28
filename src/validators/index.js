const { registerSchema, loginSchema } = require("./auth.validator");
const { getAllMessagesSchema } = require("./message.validator");
const { getNotificationSchema } = require("./notification.validator");
const {
  getOneRoomSchema,
  getActiveRoomsSchema,
  getAllRoomsSchema,
  sendContactRequestSchema,
  rejectContactRequestSchema,
  acceptContactRequestSchema,
  getRoomUsersSchema,
} = require("./room.validator");
const { getUserDataSchema, getAllUsersSchema } = require("./user.validator");

module.exports = {
  registerSchema,
  loginSchema,
  getAllMessagesSchema,
  getNotificationSchema,
  getOneRoomSchema,
  getOneRoomSchema,
  getActiveRoomsSchema,
  getAllRoomsSchema,
  sendContactRequestSchema,
  rejectContactRequestSchema,
  acceptContactRequestSchema,
  getRoomUsersSchema,
  getUserDataSchema,
  getAllUsersSchema,
};
