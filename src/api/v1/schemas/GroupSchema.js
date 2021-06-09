const Joi = require("joi");

const createSchema = Joi.object({
  symbol: Joi.string().min(2).max(30).required(),
}).required();

module.exports = { createSchema, updateSchema: createSchema };
