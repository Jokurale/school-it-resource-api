const { prisma } = require("../database");

const { validateLesson } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateLesson, "lesson");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllLessons: getAll,
  getLessonById: getById,
  addLesson: add,
  updateLesson: update,
  removeLesson: remove,
};
