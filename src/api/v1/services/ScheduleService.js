const { prisma } = require("../database");

const { validateSchedule } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateSchedule, "schedule");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllSchedules: getAll,
  getScheduleById: getById,
  addSchedule: add,
  updateSchedule: update,
  removeSchedule: remove,
};
