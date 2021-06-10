const { Router } = require("express");

const { TeacherController } = require("../controllers");

const {
  getTeachersHomeworks,
  getAllTeachers,
  getTeacherById,
  getTeachersAddresses,
  getTeachersMarks,
  getTeachersPersonalInfo,
} = TeacherController;

// ~~> Mounted as /teachers
const route = Router();

route.get("/", getAllTeachers);
route.get("/:id", getTeacherById);
route.get("/:id/homeworks", getTeachersHomeworks);
route.get("/:id/addresses", getTeachersAddresses);
route.get("/:id/marks", getTeachersMarks);
route.get("/:id/personalInfo", getTeachersPersonalInfo);

// Aliases
route.get("/:id/profile", getTeachersPersonalInfo);

module.exports = route;
