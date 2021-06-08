const Joi = require("joi");

const createSchema = Joi.object({
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  role: Joi.string()
    .min(1)
    .max(20)
    .default("student")
    .valid("student", "teacher"),
}).required();

module.exports = { createSchema };
