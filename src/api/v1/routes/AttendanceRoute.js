const { Router } = require("express");

const { AttendanceController } = require("../controllers");

const {
  getAllAttendances,
  getAttendanceById,
  addAttendance,
  removeAttendance,
  updateAttendance,
} = AttendanceController;

// ~~> Mounted as /Attendances
const route = Router();

route.get("/", getAllAttendances);
route.get("/:id", getAttendanceById);
route.post("/", addAttendance);
route.delete("/:id", removeAttendance);
route.put("/:id", updateAttendance);

module.exports = route;
