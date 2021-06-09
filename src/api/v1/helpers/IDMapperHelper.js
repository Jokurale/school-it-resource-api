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

const symbolToGroupId = async (symbol) => {
  const group = await prisma.group.findFirst({
    where: {
      symbol,
    },
    select: {
      id: true,
    },
  });

  // Group does not exist
  if (!group)
    throw new Error(`Group with given symgol (${symbol}) - does not exist. `);

  return group.id;
};

module.exports = { userIdtoStudentId, symbolToGroupId };
