const { prisma } = require("../database");

const { validateHomework } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateHomework, "homework");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllHomeworks: getAll,
  getHomeworkById: getById,
  addHomework: add,
  updateHomework: update,
  removeHomework: remove,
};
