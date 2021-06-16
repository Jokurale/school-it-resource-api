const Joi = require("joi");

const {
  constants: { UUID_LENGTH, VALID_LESSON_DAYS },
} = require("../config");

const createSchema = Joi.object({
  day: Joi.string()
    .valid(...VALID_LESSON_DAYS)
    .required(),
  teacherId: Joi.string().length(UUID_LENGTH).required(),
  roomId: Joi.string().length(UUID_LENGTH).required(),
  subjectId: Joi.string().length(UUID_LENGTH).required(),
  hourId: Joi.string().length(UUID_LENGTH).required(),
}).required();

const updateSchema = Joi.object({
  day: Joi.string().valid(...VALID_LESSON_DAYS),
  teacherId: Joi.string().length(UUID_LENGTH),
  roomId: Joi.string().length(UUID_LENGTH),
  subjectId: Joi.string().length(UUID_LENGTH),
  hourId: Joi.string().length(UUID_LENGTH),
}).required();

module.exports = { createSchema, updateSchema };
