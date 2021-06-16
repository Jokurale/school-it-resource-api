const { CredentialSchema } = require("../schemas");
const { updateSchema } = CredentialSchema;

const validatePassowrd = async (password) => {
  const valid = await updateSchema.validateAsync(password);

  return valid;
};

module.exports = validatePassowrd;
