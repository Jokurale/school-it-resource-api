const { Router } = require("express");

const { StudentController } = require("../controllers");

const {
  getStudentsHomeworks,
  getAllStudents,
  getStudentById,
  getStudentsAddresses,
  getStudentsMarks,
  getStudentsPersonalInfo,
  getStudentsGroup,
  getStudentsAttendance,
  assignStudentToGroup,
} = StudentController;

// ~~> Mounted as /students
const route = Router();

route.get("/", getAllStudents);
route.get("/:id", getStudentById);
route.get("/:id/homeworks", getStudentsHomeworks);
route.get("/:id/addresses", getStudentsAddresses);
route.get("/:id/marks", getStudentsMarks);
route.get("/:id/personalInfo", getStudentsPersonalInfo);
route.get("/:id/group", getStudentsGroup);
route.post("/:id/group", assignStudentToGroup);
route.get("/:id/attendance", getStudentsAttendance);

// Aliases
route.get("/:id/profile", getStudentsPersonalInfo);

module.exports = route;
