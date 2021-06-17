const Joi = require("joi");

const {
  constants: {
    MAX_SUBJECT_NAME_LENGTH,
    MIN_SUBJECT_NAME_LENGTH,
    GENERAL_REGEX,
  },
} = require("../config");

const createSchema = Joi.object({
  name: Joi.string()
    .max(MAX_SUBJECT_NAME_LENGTH)
    .min(MIN_SUBJECT_NAME_LENGTH)
    .regex(RegExp(GENERAL_REGEX))
    .required(),
}).required();

const updateSchema = Joi.object({
  name: Joi.string()
    .max(MAX_SUBJECT_NAME_LENGTH)
    .min(MIN_SUBJECT_NAME_LENGTH)
    .regex(RegExp(GENERAL_REGEX)),
}).required();

module.exports = { createSchema, updateSchema };
