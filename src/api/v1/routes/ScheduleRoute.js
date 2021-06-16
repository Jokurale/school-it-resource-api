const { Router } = require("express");

const { ScheduleController } = require("../controllers");

const {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  removeSchedule,
  updateSchedule,
} = ScheduleController;

// ~~> Mounted as /schedules
const route = Router();

route.get("/", getAllSchedules);
route.post("/", addSchedule);
route.get("/:id", getScheduleById);
route.delete("/:id", removeSchedule);
route.put("/:id", updateSchedule);

module.exports = route;
