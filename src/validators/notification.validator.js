const Joi = require("joi");

const getNotificationSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = { getNotificationSchema };
