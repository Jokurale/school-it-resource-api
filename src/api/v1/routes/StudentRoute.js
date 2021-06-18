const { Router } = require("express");

const { StudentController } = require("../controllers");

const {
  getStudentsHomeworks,
  getAllStudents,
  getStudentById,
  getStudentsAddresses,
  getStudentsMarks,
  getStudentsPersonalInfo,
  getStudentsGroups,
  getStudentsAttendance,
  assignStudentToGroup,
  removeStudentFromGroup,
} = StudentController;

// ~~> Mounted as /students
const route = Router();

route.get("/", getAllStudents);
route.get("/:id", getStudentById);
route.get("/:id/homeworks", getStudentsHomeworks);
route.get("/:id/addresses", getStudentsAddresses);
route.get("/:id/marks", getStudentsMarks);
route.get("/:id/personalInfo", getStudentsPersonalInfo);
route.get("/:id/groups", getStudentsGroups);
route.post("/:id/group/:groupId", assignStudentToGroup);
route.delete("/:id/group/:groupId", removeStudentFromGroup);
route.get("/:id/attendance", getStudentsAttendance);

// Aliases
route.get("/:id/profile", getStudentsPersonalInfo);

module.exports = route;
