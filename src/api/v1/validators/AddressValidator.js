const { AddressSchema } = require("../schemas");
const { createSchema, updateSchema } = AddressSchema;

const validateAddress = async (address, mode = "create") => {
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

module.exports = validateAddress;
