const { prisma } = require("../database");

const { validateRoom } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateRoom, "room");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllRooms: getAll,
  getRoomById: getById,
  addRoom: add,
  updateRoom: update,
  removeRoom: remove,
};
