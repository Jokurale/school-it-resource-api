const { prisma } = require("../database");

const { validateRoom } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateRoom, "room");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

const getLessons = async (roomId) => {
  const lessons = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      lesson: true,
    },
  });

  return lessons;
};

module.exports = {
  getAllRooms: getAll,
  getRoomById: getById,
  addRoom: add,
  updateRoom: update,
  removeRoom: remove,
  getLessons,
};
