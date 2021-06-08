const { UserSchema } = require("../schemas");
const { createSchema } = UserSchema;

const validateUser = async (user) => {
  const valid = await createSchema.validateAsync(user);

  return valid;
};

module.exports = validateUser;
