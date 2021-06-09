const { prisma } = require("../database");

const { validateSubject } = require("../validators");

const prisma = new PrismaClient();

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateSubject, "subject");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllSubjects: getAll,
  getSubjectById: getById,
  addSubject: add,
  updateSubject: update,
  removeSubject: remove,
};
