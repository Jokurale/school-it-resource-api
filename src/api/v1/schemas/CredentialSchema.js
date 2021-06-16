const Joi = require("joi");

const {
  constants: {
    MIN_LOGIN_LENGTH,
    MAX_LOGIN_LENGTH,
    PASSWORD_REGEX_PATTERN,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_ROLE_LENGTH,
    MIN_ROLE_LENGTH,
    DEFAULT_ROLE_ON_REGISTER,
    VALID_ROLES_TO_REGISTER,
  },
} = require("../config");

const createSchema = Joi.object({
  login: Joi.string()
    .min(MIN_LOGIN_LENGTH)
    .max(MAX_LOGIN_LENGTH)
    .alphanum()
    .required(),
  password: Joi.string()
    .regex(RegExp(PASSWORD_REGEX_PATTERN))
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH),
  role: Joi.string()
    .alphanum()
    .min(MIN_ROLE_LENGTH)
    .max(MAX_ROLE_LENGTH)
    .default(DEFAULT_ROLE_ON_REGISTER)
    .valid(...VALID_ROLES_TO_REGISTER),
}).required();

module.exports = { createSchema };
