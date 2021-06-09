const { prisma } = require("../database");

const { validateGroup } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateGroup, "group");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllMarks: getAll,
  getMarkById: getById,
  addMark: add,
  updateMark: update,
  removeMark: remove,
};
