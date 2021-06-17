const { Router } = require("express");

const { LessonController } = require("../controllers");

const { getAllLessons, getLessonById, addLesson, removeLesson, updateLesson } =
  LessonController;

// ~~> Mounted as /lessons
const route = Router();

route.get("/", getAllLessons);
route.get("/:id", getLessonById);
route.post("/", addLesson);
route.delete("/:id", removeLesson);
route.put("/:id", updateLesson);

module.exports = route;
