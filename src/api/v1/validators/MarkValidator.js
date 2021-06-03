const { MarkSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(MarkSchema);

const { validator: validateMark } = factory.getValidatorFunction();

module.exports = validateMark;
