const { PlanSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(PlanSchema);

const { validator: validatePlan } = factory.getValidatorFunction();

module.exports = validatePlan;
