const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ~> Get user credentials for specified login
module.exports.getCredentialsByLogin = async (req, res) => {
  const { login } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        credential: {
          login,
        },
      },
      include: {
        credential: true,
        student: true,
      },
    });

    res.json(user);
  } catch {
    res.json({ error: "Credentials error" });
  }
};
