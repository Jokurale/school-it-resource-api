const Joi = require("joi");

const {
  constants: { VALID_ATTENDANCE_TYPES, UUID_LENGTH },
} = require("../config");

const createSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string()
    .valid(...VALID_ATTENDANCE_TYPES)
    .required(),
  hourId: Joi.string().length(UUID_LENGTH).required(),
  teacherId: Joi.string().length(UUID_LENGTH).required(),
  studentId: Joi.string().length(UUID_LENGTH).required(),
}).required();

const updateSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid(...VALID_ATTENDANCE_TYPES),
  hourId: Joi.string().length(UUID_LENGTH),
  teacherId: Joi.string().length(UUID_LENGTH),
  studentId: Joi.string().length(UUID_LENGTH),
}).required();

module.exports = { createSchema, updateSchema };
