const { createSchema, updateSchema } = require("../schemas/Address.schema");

const addressPreparator = async (address, mode = "create") => {
  // Await validation based on operation's mode
  const valid =
    mode == "create"
      ? await createSchema.validateAsync(address)
      : await updateSchema.validateAsync(address);

  // Prepare database query
  const databaseReadyAddress = {
    data: {
      ...valid,
    },
  };

  return databaseReadyAddress;
};

module.exports = addressPreparator;
