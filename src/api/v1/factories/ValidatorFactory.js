class ValidatorFactory {
  /**
   * Create new validator factory
   * @param {ValidationSchema} validationSchema - Validation schema which generated function will rely on
   */

  constructor(validationSchema) {
    this.schema = validationSchema;

    this.getServiceFunctions = this.getValidatorFunction.bind(this);
  }

  generateValidatorFunction() {
    this.validatorFunction = async (object, mode = "create") => {
      const { createSchema, updateSchema } = this.schema;

      const valid =
        mode == "create"
          ? await createSchema.validateAsync(object)
          : await updateSchema.validateAsync(object);

      const databaseReadyObject = {
        data: {
          ...valid,
        },
      };

      return databaseReadyObject;
    };
  }

  getValidatorFunction() {
    this.generateValidatorFunction();

    return { validator: this.validatorFunction };
  }
}

module.exports = ValidatorFactory;
