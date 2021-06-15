const { LessonSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(LessonSchema);

const { validator: validateLesson } = factory.getValidatorFunction();

module.exports = validateLesson;
