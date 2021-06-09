const { prisma } = require("../database");

const { validatePersonalInfo } = require("../validators");

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
