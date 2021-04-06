const Joi = require("joi");

const createSchema = Joi.object({
  credential: Joi.object().required(),
  personalInfo: Joi.object().required(),
  address: Joi.array().required(),
});

module.exports = { createSchema };
