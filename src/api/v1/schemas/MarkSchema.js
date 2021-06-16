const Joi = require("joi");

const {
  constants: {
    UUID_LENGTH,
    MAX_MARK_DESCRIPTION_LENGTH,
    MIN_MARK_DESCRIPTION_LENGTH,
    MAX_MARK_VALUE_LENGTH,
    MIN_MARK_VALUE_LENGTH,
    MAX_MARK_WEIGHT,
    MIN_MARK_WEIGHT,
  },
} = require("../config");

const createSchema = Joi.object({
  createdAt: Joi.date().required(),
  description: Joi.string()
    .min(MIN_MARK_DESCRIPTION_LENGTH)
    .max(MAX_MARK_DESCRIPTION_LENGTH)
    .required(),
  mark: Joi.string()
    .min(MIN_MARK_VALUE_LENGTH)
    .max(MAX_MARK_VALUE_LENGTH)
    .required(),
  weight: Joi.number().min(MIN_MARK_WEIGHT).max(MAX_MARK_WEIGHT).required(),
  studentId: Joi.string().length(UUID_LENGTH).required(),
  teacherId: Joi.string().length(UUID_LENGTH).required(),
  subjectId: Joi.string().length(UUID_LENGTH).required(),
}).required();

const updateSchema = Joi.object({
  createdAt: Joi.date(),
  description: Joi.string()
    .min(MIN_MARK_DESCRIPTION_LENGTH)
    .max(MAX_MARK_DESCRIPTION_LENGTH),
  mark: Joi.string().min(MIN_MARK_VALUE_LENGTH).max(MAX_MARK_VALUE_LENGTH),
  weight: Joi.number().min(MIN_MARK_WEIGHT).max(MAX_MARK_WEIGHT),
}).required();

module.exports = { createSchema, updateSchema };
