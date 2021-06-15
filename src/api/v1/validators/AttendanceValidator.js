const { AttendanceSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(AttendanceSchema);

const { validator: validateAttendance } = factory.getValidatorFunction();

module.exports = validateAttendance;
