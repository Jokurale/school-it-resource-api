const { PersonalInfoSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(PersonalInfoSchema);

const { validator: validatePersonalInfo } = factory.getValidatorFunction();

module.exports = validatePersonalInfo;
