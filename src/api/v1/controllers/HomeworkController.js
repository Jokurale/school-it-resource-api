const { HomeworkService } = require("../services");

const ash = require("express-async-handler");

// ~> All homeworks
const getAllHomeworks = ash(async (req, res) => {
  const allHomeworks = await HomeworkService.getAllHomeworks();

  return res.json(allHomeworks);
});

// ~> Get specified homework
const getHomeworkById = ash(async (req, res) => {
  const { id: HomeworkId } = req.params;

  const Homework = await HomeworkService.getHomeworkById(HomeworkId);

  return res.json(Homework);
});

// ~> Add homework
const addHomework = ash(async (req, res) => {
  const result = await HomeworkService.addHomework(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update homework
const updateHomework = ash(async (req, res) => {
  const { id } = req.params;

  const result = await HomeworkService.updateHomework(id, req.body);

  return res.json(result);
});

// ~> Remove homework
const removeHomework = ash(async (req, res) => {
  const { id } = req.params;

  const result = await HomeworkService.removeHomework(id);

  return res.json(result);
});

module.exports = {
  getAllHomeworks,
  getHomeworkById,
  addHomework,
  updateHomework,
  removeHomework,
};
