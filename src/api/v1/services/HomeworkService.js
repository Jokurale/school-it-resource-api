const { PrismaClient } = require("@prisma/client");
const { validateHomework } = require("../validators");
const prisma = new PrismaClient();

const { ServiceFactory } = require("../helpers");

const factory = new ServiceFactory(prisma, validateHomework, "homework");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllHomeworks: getAll,
  getHomeworkById: getById,
  addHomework: add,
  updateHomework: update,
  removeHomework: remove,
};
