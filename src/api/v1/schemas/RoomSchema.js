const Joi = require("joi");

const {
  constants: {
    MIN_ROOM_TYPE_LENGTH,
    MAX_ROOM_TYPE_LENGTH,
    MAX_ROOM_NUMBER_LENGTH,
    MIN_ROOM_NUMBER_LENGTH,
    GENERAL_REGEX,
  },
} = require("../config");

const createSchema = Joi.object({
  type: Joi.string()
    .max(MAX_ROOM_TYPE_LENGTH)
    .min(MIN_ROOM_TYPE_LENGTH)
    .regex(RegExp(GENERAL_REGEX))
    .required(),
  number: Joi.string()
    .min(MIN_ROOM_NUMBER_LENGTH)
    .max(MAX_ROOM_NUMBER_LENGTH)
    .alphanum()
    .required(),
}).required();

const updateSchema = Joi.object({
  type: Joi.string()
    .max(MAX_ROOM_TYPE_LENGTH)
    .min(MIN_ROOM_TYPE_LENGTH)
    .regex(RegExp(GENERAL_REGEX)),
  number: Joi.string()
    .min(MIN_ROOM_NUMBER_LENGTH)
    .max(MAX_ROOM_NUMBER_LENGTH)
    .alphanum(),
}).required();

module.exports = { createSchema, updateSchema };
