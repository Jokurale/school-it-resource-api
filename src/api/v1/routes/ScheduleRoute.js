const { Router } = require("express");

const { ScheduleController } = require("../controllers");

const {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  removeSchedule,
  updateSchedule,
  removeLessonFromSchedule,
  cleanUpSchedule,
} = ScheduleController;

// ~~> Mounted as /schedules
const route = Router();

route.get("/", getAllSchedules);
route.post("/", addSchedule);
route.get("/:id", getScheduleById);
route.delete("/:id", removeSchedule);
route.put("/:id", updateSchedule);
route.delete("/:id/lessons/all", cleanUpSchedule);
route.delete("/:id/lessons/:lessonId", removeLessonFromSchedule);

module.exports = route;
