const Joi = require("joi");

const createSchema = Joi.object({
  groupId: Joi.string().length(36).required(),
}).required();

module.exports = { createSchema, updateSchema: createSchema };
