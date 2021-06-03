const { SubjectSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(SubjectSchema);

const { validator: validateSubject } = factory.getServiceFunctions();

module.exports = validateSubject;
