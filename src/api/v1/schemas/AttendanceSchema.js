const Joi = require("joi");

const createSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string()
    .valid("Absent", "Present", "Excused absence", "Lateness")
    .required(),
  hourId: Joi.string().length(36).required(),
  teacherId: Joi.string().length(36).required(),
  studentId: Joi.string().length(36).required(),
}).required();

const updateSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid("Absent", "Present", "Excused absence", "Lateness"),
  hourId: Joi.string().length(36),
  teacherId: Joi.string().length(36),
  studentId: Joi.string().length(36),
}).required();

module.exports = { createSchema, updateSchema };
