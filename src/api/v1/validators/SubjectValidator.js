const { SubjectSchema } = require("../schemas");
const { createSchema, updateSchema } = SubjectSchema;

const validateSubject = async (subject, mode = "create") => {
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

module.exports = validateSubject;
