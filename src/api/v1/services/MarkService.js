const { PrismaClient } = require("@prisma/client");
const { validateMark } = require("../validators");
const prisma = new PrismaClient();

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateMark, "mark");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllMarks: getAll,
  getMarkById: getById,
  addMark: add,
  updateMark: update,
  removeMark: remove,
};
