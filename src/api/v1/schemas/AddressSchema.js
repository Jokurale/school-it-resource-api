const Joi = require("joi");

const createSchema = Joi.object({
  address1: Joi.string().max(150).required(),
  address2: Joi.string().max(150),
  address3: Joi.string().max(150),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(50).required(),
  country: Joi.string().max(50).required(),
  postalCode: Joi.string().max(10).required(),
  personalInfoId: Joi.string().length(36).required(),
}).required();

const createManySchema = Joi.array()
  .min(1)
  .max(3)
  .items(createSchema)
  .required();

const updateSchema = Joi.object({
  address1: Joi.string().max(150),
  address2: Joi.string().max(150),
  address3: Joi.string().max(150),
  city: Joi.string().max(100),
  state: Joi.string().max(50),
  country: Joi.string().max(50),
  postalCode: Joi.string().max(10),
}).required();

module.exports = { createSchema, updateSchema, createManySchema };
