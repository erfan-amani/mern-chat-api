const Joi = require("joi");

const getOneRoomSchema = Joi.object({
  other: Joi.string().required(),
});
const getActiveRoomsSchema = Joi.object({
  search: Joi.string(),
});
const getAllRoomsSchema = Joi.object({
  otherId: Joi.string(),
  pending: Joi.boolean(),
});
const sendContactRequestSchema = Joi.object({
  other: Joi.string(),
});
const rejectContactRequestSchema = Joi.object({
  type: Joi.string().valid("REJECT"),
  id: Joi.string(),
});
const acceptContactRequestSchema = Joi.object({
  id: Joi.string(),
});
const getRoomUsersSchema = Joi.object({
  id: Joi.string(),
});

module.exports = {
  getOneRoomSchema,
  getActiveRoomsSchema,
  getAllRoomsSchema,
  sendContactRequestSchema,
  rejectContactRequestSchema,
  acceptContactRequestSchema,
  getRoomUsersSchema,
};
