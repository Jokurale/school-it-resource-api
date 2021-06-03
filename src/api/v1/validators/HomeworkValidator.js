const { HomeworkSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(HomeworkSchema);

const { validator: validateHomework } = factory.getServiceFunctions();

module.exports = validateHomework;
