const Joi = require("joi");

const {
  constants: { UUID_LENGTH },
} = require("../config");

const createSchema = Joi.object({
  groupId: Joi.string().length(UUID_LENGTH).required(),
}).required();

module.exports = { createSchema, updateSchema: createSchema };
