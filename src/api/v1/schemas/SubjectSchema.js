const Joi = require("joi");

const {
  constants: { MAX_SUBJECT_NAME_LENGTH, MIN_SUBJECT_NAME_LENGTH },
} = require("../config");

const createSchema = Joi.object({
  name: Joi.string()
    .max(MAX_SUBJECT_NAME_LENGTH)
    .min(MIN_SUBJECT_NAME_LENGTH)
    .required(),
}).required();

const updateSchema = Joi.object({
  name: Joi.string().max(MAX_SUBJECT_NAME_LENGTH).min(MIN_SUBJECT_NAME_LENGTH),
}).required();

module.exports = { createSchema, updateSchema };
