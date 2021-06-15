const Joi = require("joi");

const createSchema = Joi.object({
  day: Joi.string()
    .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")
    .required(),
  teacherId: Joi.string().length(36).required(),
  roomId: Joi.string().length(36).required(),
  subjectId: Joi.string().length(36).required(),
  hourId: Joi.string().length(36).required(),
}).required();

const updateSchema = Joi.object({
  day: Joi.string().valid(
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ),
  teacherId: Joi.string().length(36),
  roomId: Joi.string().length(36),
  subjectId: Joi.string().length(36),
  hourId: Joi.string().length(36),
}).required();

module.exports = { createSchema, updateSchema };
