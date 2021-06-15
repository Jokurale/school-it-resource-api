const Joi = require("joi");

const createSchema = Joi.object({
  type: Joi.string().max(150).min(5).required(),
  number: Joi.string().min(0).required(),
}).required();

const updateSchema = Joi.object({
  type: Joi.string().max(150).min(5),
  number: Joi.string().min(0),
}).required();

module.exports = { createSchema, updateSchema };
