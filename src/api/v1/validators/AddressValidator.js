const { AddressSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(AddressSchema);

const { validator: validateAddress } = factory.getValidatorFunction();

module.exports = validateAddress;
