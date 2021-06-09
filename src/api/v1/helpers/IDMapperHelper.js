const { prisma } = require("../database");

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
