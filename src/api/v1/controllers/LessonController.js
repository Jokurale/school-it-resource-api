const { LessonService } = require("../services");

const ash = require("express-async-handler");

// ~> All Lessons
const getAllLessons = ash(async (req, res) => {
  const allLessons = await LessonService.getAllLessons();

  return res.json(allLessons);
});

// ~> Get specified Lesson
const getLessonById = ash(async (req, res) => {
  const { id: LessonId } = req.params;

  const Lesson = await LessonService.getLessonById(LessonId);

  return res.json(Lesson);
});

// ~> Add Lesson
const addLesson = ash(async (req, res) => {
  const result = await LessonService.addLesson(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update Lesson
const updateLesson = ash(async (req, res) => {
  const { id } = req.params;

  const result = await LessonService.updateLesson(id, req.body);

  return res.json(result);
});

// ~> Remove Lesson
const removeLesson = ash(async (req, res) => {
  const { id } = req.params;

  const result = await LessonService.removeLesson(id);

  return res.json(result);
});

module.exports = {
  getAllLessons,
  getLessonById,
  addLesson,
  updateLesson,
  removeLesson,
};
