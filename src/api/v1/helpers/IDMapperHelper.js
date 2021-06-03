const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userIdtoStudentId = async (userId) => {
  const result = await prisma.student.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
    select: {
      id: true,
    },
  });

  return result?.id ?? false;
};

module.exports = { userIdtoStudentId };
