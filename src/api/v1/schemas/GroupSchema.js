const Joi = require("joi");

const {
  constants: { MAX_GROUP_SYMBOL_LENGTH, MIN_GROUP_SYMBOL_LENGTH },
} = require("../config");

const createSchema = Joi.object({
  symbol: Joi.string()
    .min(MIN_GROUP_SYMBOL_LENGTH)
    .max(MAX_GROUP_SYMBOL_LENGTH)
    .alphanum()
    .required(),
}).required();

module.exports = { createSchema, updateSchema: createSchema };
