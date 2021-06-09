const { GroupSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(GroupSchema);

const { validator: validateGroup } = factory.getValidatorFunction();

module.exports = validateGroup;
