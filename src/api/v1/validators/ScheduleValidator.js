const { ScheduleSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(ScheduleSchema);

const { validator: validateSchedule } = factory.getValidatorFunction();

module.exports = validateSchedule;
