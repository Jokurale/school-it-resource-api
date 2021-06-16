const { prisma } = require("../database");

const { validateGroup } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateGroup, "group");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

const getSchedule = async (groupId) => {
  const plan = await prisma.group.findFirst({
    where: {
      id: groupId,
    },
    include: {
      schedule: {
        include: {
          lesson: true,
        },
      },
    },
  });

  return plan;
};

const removeGroup = async (groupId) => {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
    },
    include: {
      plan: {
        select: {
          id: true,
        },
      },
    },
  });

  // Disconnect any relations before deleting
  const planDeleteResult = group?.plan?.id
    ? await prisma.plan.delete({
        where: {
          id: group.plan.id,
        },
      })
    : true;

  if (planDeleteResult) {
    const result = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    return result;
  }
};

module.exports = {
  getAllGroups: getAll,
  getGroupById: getById,
  addGroup: add,
  updateGroup: update,
  removeGroup,
  getSchedule,
};
