const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().max(150).min(5).required(),
}).required();

const updateSchema = Joi.object({
  name: Joi.string().max(150).min(5),
}).required();

module.exports = { createSchema, updateSchema };
