const { createSchema, updateSchema } = require("../schemas/Subject.schema");

const subjectPreparator = async (subject, mode = "create") => {
  // Await validation based on operation's mode
  const valid =
    mode == "create"
      ? await createSchema.validateAsync(subject)
      : await updateSchema.validateAsync(subject);

  // Prepare database query
  const databaseReadySubject = {
    data: {
      ...valid,
    },
  };

  return databaseReadySubject;
};

module.exports = subjectPreparator;
