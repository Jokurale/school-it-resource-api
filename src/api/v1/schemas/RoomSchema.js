const Joi = require("joi");

const {
  constants: {
    MIN_ROOM_TYPE_LENGTH,
    MAX_ROOM_TYPE_LENGTH,
    MAX_ROOM_NUMBER_LENGTH,
    MIN_ROOM_NUMBER_LENGTH,
  },
} = require("../config");

const createSchema = Joi.object({
  type: Joi.string()
    .max(MAX_ROOM_TYPE_LENGTH)
    .min(MIN_ROOM_TYPE_LENGTH)
    .required(),
  number: Joi.string()
    .min(MIN_ROOM_NUMBER_LENGTH)
    .max(MAX_ROOM_NUMBER_LENGTH)
    .required(),
}).required();

const updateSchema = Joi.object({
  type: Joi.string().max(MAX_ROOM_TYPE_LENGTH).min(MIN_ROOM_TYPE_LENGTH),
  number: Joi.string().min(MIN_ROOM_NUMBER_LENGTH).max(MAX_ROOM_NUMBER_LENGTH),
}).required();

module.exports = { createSchema, updateSchema };
