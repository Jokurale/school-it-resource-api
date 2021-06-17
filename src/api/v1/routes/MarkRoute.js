const { Router } = require("express");

const { MarkController } = require("../controllers");

const { getAllMarks, getMarkById, addMark, removeMark, updateMark } =
  MarkController;

// ~~> Mounted as /marks
const route = Router();

route.get("/", getAllMarks);
route.post("/", addMark);
route.get("/:id", getMarkById);
route.delete("/:id", removeMark);
route.put("/:id", updateMark);

module.exports = route;
