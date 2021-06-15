const { prisma } = require("../database");

const { validatePlan } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validatePlan, "plan");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllPlans: getAll,
  getPlanById: getById,
  addPlan: add,
  updatePlan: update,
  removePlan: remove,
};
