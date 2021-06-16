const Joi = require("joi");

const {
  constants: {
    MAX_ADDRESS_LENGTH,
    MIN_ADDRESS_LENGTH,
    MAX_CITY_LENGTH,
    MIN_CITY_LENGTH,
    MAX_STATE_LENGTH,
    MIN_STATE_LENGTH,
    MAX_COUNTRY_LENGTH,
    MIN_COUNTRY_LENGTH,
    MAX_POSTAL_CODE_LENGTH,
    MIN_POSTAL_CODE_LENGTH,
    UUID_LENGTH,
    MAX_ADDRESSES_PER_REGISTER,
    MIN_ADDRESSES_PER_REGISTER,
  },
} = require("../config");

const createSchema = Joi.object({
  address1: Joi.string()
    .max(MAX_ADDRESS_LENGTH)
    .min(MIN_ADDRESS_LENGTH)
    .required(),
  address2: Joi.string().max(MAX_ADDRESS_LENGTH).min(MIN_ADDRESS_LENGTH),
  address3: Joi.string().max(MAX_ADDRESS_LENGTH).min(MIN_ADDRESS_LENGTH),
  city: Joi.string().max(MAX_CITY_LENGTH).min(MIN_CITY_LENGTH).required(),
  state: Joi.string().max(MAX_STATE_LENGTH).min(MIN_STATE_LENGTH).required(),
  country: Joi.string()
    .max(MAX_COUNTRY_LENGTH)
    .min(MIN_COUNTRY_LENGTH)
    .required(),
  postalCode: Joi.string()
    .max(MAX_POSTAL_CODE_LENGTH)
    .min(MIN_POSTAL_CODE_LENGTH)
    .required(),
  personalInfoId: Joi.string().length(UUID_LENGTH).required(),
}).required();

const createManySchema = Joi.array()
  .min(MIN_ADDRESSES_PER_REGISTER)
  .max(MAX_ADDRESSES_PER_REGISTER)
  .items(createSchema)
  .required();

const updateSchema = Joi.object({
  address1: Joi.string().max(MAX_ADDRESS_LENGTH).min(MIN_ADDRESS_LENGTH),
  address2: Joi.string().max(MAX_ADDRESS_LENGTH).min(MIN_ADDRESS_LENGTH),
  address3: Joi.string().max(MAX_ADDRESS_LENGTH).min(MIN_ADDRESS_LENGTH),
  city: Joi.string().max(MAX_CITY_LENGTH).min(MIN_CITY_LENGTH),
  state: Joi.string().max(MAX_STATE_LENGTH).min(MIN_STATE_LENGTH),
  country: Joi.string().max(MAX_COUNTRY_LENGTH).min(MIN_COUNTRY_LENGTH),
  postalCode: Joi.string()
    .max(MAX_POSTAL_CODE_LENGTH)
    .min(MIN_POSTAL_CODE_LENGTH),
}).required();

module.exports = { createSchema, updateSchema, createManySchema };
