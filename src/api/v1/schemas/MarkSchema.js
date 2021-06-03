const Joi = require("joi");

const createSchema = Joi.object({
  createdAt: Joi.date().required(),
  description: Joi.string().max(150).required(),
  mark: Joi.string().max(100).required(),
  weight: Joi.number().min(0).required(),
  studentId: Joi.string().length(36).required(),
  teacherId: Joi.string().length(36).required(),
  subjectId: Joi.string().length(36).required(),
});

const updateSchema = Joi.object({
  createdAt: Joi.date(),
  description: Joi.string().max(150),
  mark: Joi.string().max(100).required(),
  weight: Joi.number().min(0).required(),
});

module.exports = { createSchema, updateSchema };
