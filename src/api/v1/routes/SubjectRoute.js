const { Router } = require("express");

const { SubjectController } = require("../controllers");

const {
  getAllSubjects,
  getSubjectById,
  addSubject,
  removeSubject,
  updateSubject,
} = SubjectController;

// ~~> Mounted as /subjects
const route = Router();

route.get("/", getAllSubjects);
route.get("/:id", getSubjectById);
route.post("/", addSubject);
route.delete("/:id", removeSubject);
route.put("/:id", updateSubject);

module.exports = route;
