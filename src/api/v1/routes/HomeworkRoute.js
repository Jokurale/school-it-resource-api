const { Router } = require("express");

const { HomeworkController } = require("../controllers");

const {
  getAllHomeworks,
  getHomeworkById,
  addHomework,
  removeHomework,
  updateHomework,
} = HomeworkController;

// ~~> Mounted as /homeworks
const route = Router();

route.get("/", getAllHomeworks);
route.post("/", addHomework);
route.get("/:id", getHomeworkById);
route.delete("/:id", removeHomework);
route.put("/:id", updateHomework);

module.exports = route;
