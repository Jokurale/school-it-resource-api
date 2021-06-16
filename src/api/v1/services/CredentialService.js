const { prisma } = require("../database");

const { validatePassword } = require("../validators");

const {
  PasswordHelper: { hash },
} = require("../helpers");

const changePassword = async (credentialId, password) => {
  const validPassword = await validatePassword(password);

  const hashedPassword = await hash(validPassword.password);

  const result = await prisma.credential.update({
    where: {
      id: credentialId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return result;
};

module.exports = {
  changePassword,
};
