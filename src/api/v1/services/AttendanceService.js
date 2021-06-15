const { prisma } = require("../database");

const { validateAttendance } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateAttendance, "attendance");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllAttendances: getAll,
  getAttendanceById: getById,
  addAttendance: add,
  updateAttendance: update,
  removeAttendance: remove,
};
