const Joi = require("joi");

const {
  constants: {
    MAX_FIRSTNAME_LENGTH,
    MIN_FIRSTNAME_LENGTH,
    MAX_MIDDLENAME_LENGTH,
    MIN_MIDDLENAME_LENGTH,
    MAX_LASTNAME_LENGTH,
    MIN_LASTNAME_LENGTH,
    MIN_EMAIL_DOMAIN_SEGEMENTS,
    ALLOWED_EMAIL_DOMAINS,
  },
} = require("../config");

const createSchema = Joi.object({
  firstname: Joi.string()
    .max(MAX_FIRSTNAME_LENGTH)
    .min(MIN_FIRSTNAME_LENGTH)
    .alphanum()
    .required(),
  middlename: Joi.string()
    .max(MAX_MIDDLENAME_LENGTH)
    .min(MIN_MIDDLENAME_LENGTH)
    .alphanum(),
  lastname: Joi.string()
    .max(MAX_LASTNAME_LENGTH)
    .min(MIN_LASTNAME_LENGTH)
    .alphanum()
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: MIN_EMAIL_DOMAIN_SEGEMENTS,
      tlds: { allow: ALLOWED_EMAIL_DOMAINS },
    })
    .required(),
  dateOfBirth: Joi.date().required(),
}).required();

const updateSchema = Joi.object({
  firstname: Joi.string()
    .max(MAX_FIRSTNAME_LENGTH)
    .min(MIN_FIRSTNAME_LENGTH)
    .alphanum(),
  middlename: Joi.string()
    .max(MAX_MIDDLENAME_LENGTH)
    .min(MIN_MIDDLENAME_LENGTH)
    .alphanum(),
  lastname: Joi.string()
    .max(MAX_LASTNAME_LENGTH)
    .min(MIN_LASTNAME_LENGTH)
    .alphanum(),
  email: Joi.string().email({
    minDomainSegments: MIN_EMAIL_DOMAIN_SEGEMENTS,
    tlds: { allow: ALLOWED_EMAIL_DOMAINS },
  }),
  dateOfBirth: Joi.date(),
}).required();

module.exports = { createSchema, updateSchema };
