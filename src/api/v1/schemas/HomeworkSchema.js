const Joi = require("joi");

const {
  constants: {
    UUID_LENGTH,
    MAX_HOMEWORK_DESCRIPTION_LENGTH,
    MIN_HOMEWORK_DESCRIPTION_LENGTH,
    GENERAL_REGEX,
  },
} = require("../config");

const createSchema = Joi.object({
  createdAt: Joi.date().required(),
  deadline: Joi.date().required(),
  description: Joi.string()
    .regex(RegExp(GENERAL_REGEX))
    .min(MIN_HOMEWORK_DESCRIPTION_LENGTH)
    .max(MAX_HOMEWORK_DESCRIPTION_LENGTH)
    .required(),
  studentId: Joi.string().length(UUID_LENGTH).required(),
  teacherId: Joi.string().length(UUID_LENGTH).required(),
}).required();

const updateSchema = Joi.object({
  createdAt: Joi.date(),
  deadline: Joi.date(),
  description: Joi.string()
    .min(MIN_HOMEWORK_DESCRIPTION_LENGTH)
    .max(MAX_HOMEWORK_DESCRIPTION_LENGTH)
    .regex(RegExp(GENERAL_REGEX)),
  studentId: Joi.string().length(UUID_LENGTH),
  teacherId: Joi.string().length(UUID_LENGTH),
}).required();

module.exports = { createSchema, updateSchema };
