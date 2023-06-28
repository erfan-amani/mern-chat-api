const Joi = require("joi");

const getUserDataSchema = Joi.object({
  id: Joi.string().required(),
});
const getAllUsersSchema = Joi.object({
  search: Joi.string(),
});

module.exports = { getUserDataSchema, getAllUsersSchema };
