const { PrismaClient } = require("@prisma/client");
const { validatePersonalInfo } = require("../validators");
const prisma = new PrismaClient();

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(
  prisma,
  validatePersonalInfo,
  "personalInfo"
);

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllPersonalInfos: getAll,
  getPersonalInfoById: getById,
  addPersonalInfo: add,
  updatePersonalInfo: update,
  removePersonalInfo: remove,
};
