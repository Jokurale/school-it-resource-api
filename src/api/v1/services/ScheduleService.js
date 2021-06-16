const { prisma } = require("../database");

const { validateSchedule } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateSchedule, "schedule");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

const removeLessonFromSchedule = async (scheduleId, lessonId) => {
  const result = await prisma.schedule.update({
    where: {
      id: scheduleId,
    },
    data: {
      lesson: {
        disconnect: {
          id: lessonId,
        },
      },
    },
  });

  return result;
};

const cleanUpSchedule = async (scheduleId) => {
  const { lesson: lessons } = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
    },
    include: {
      lesson: {
        select: {
          id: true,
        },
      },
    },
  });

  if (lessons.length <= 0)
    throw Error("Schedule with given ID has no lessons assigned.");

  const lessonsIds = lessons.map((lesson) => lesson.id);

  const results = [];

  for (const lessonId of lessonsIds) {
    results.push(lessonId);

    await prisma.schedule.update({
      where: {
        id: scheduleId,
      },
      data: {
        lesson: {
          disconnect: {
            id: lessonId,
          },
        },
      },
    });
  }

  return results;
};

module.exports = {
  getAllSchedules: getAll,
  getScheduleById: getById,
  addSchedule: add,
  updateSchedule: update,
  removeSchedule: remove,
  removeLessonFromSchedule,
  cleanUpSchedule,
};
