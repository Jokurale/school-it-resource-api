const { HomeworkSchema } = require("../schemas");
const { createSchema, updateSchema } = HomeworkSchema;

const validateHomework = async (address, mode = "create") => {
  // Await validation based on operation's mode
  const valid =
    mode == "create"
      ? await createSchema.validateAsync(address)
      : await updateSchema.validateAsync(address);

  // Prepare database query
  const databaseReadyHomework = {
    data: {
      ...valid,
    },
  };

  return databaseReadyHomework;
};

module.exports = validateHomework;
