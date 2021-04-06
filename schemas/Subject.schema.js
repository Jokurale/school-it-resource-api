const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().max(150).min(5).required(),
})
  .required()
  .messages({
    "object.base": "Supply valid subject data.",
  });

const updateSchema = Joi.object({
  name: Joi.string().max(150).min(5),
});

module.exports = { createSchema, updateSchema };
