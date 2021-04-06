const { Router } = require("express");

const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
} = require("../controllers/Students.controller");

// ~~> Mounted as /students
const route = Router();

route.get("/", getAllStudents);
route.get("/:id", getStudentById);
route.put("/:id", updateStudent);
route.post("/", addStudent);

module.exports = route;
