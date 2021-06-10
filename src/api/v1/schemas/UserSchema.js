const Joi = require("joi");

const CredentialSchema = require("./CredentialSchema");
const PersonalInfoSchema = require("./PersonalInfoSchema");
const AddressSchema = require("./AddressSchema");

const createSchema = Joi.object({
  credential: CredentialSchema.createSchema,
  personalInfo: PersonalInfoSchema.createSchema,
  address: AddressSchema.createManySchema,
});

module.exports = { createSchema };
