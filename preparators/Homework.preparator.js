const { createSchema, updateSchema } = require("../schemas/Homework.schema");

const homeworkPreparator = async (homework, mode = "create") => {
  // Await validation based on operation's mode
  const valid =
    mode == "create"
      ? await createSchema.validateAsync(homework)
      : await updateSchema.validateAsync(homework);

  // Prepare database query
  const databaseReadyHomework = {
    data: {
      ...valid,
    },
  };

  return databaseReadyHomework;
};

module.exports = homeworkPreparator;
