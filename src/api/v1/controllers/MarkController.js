const { MarkService } = require("../services");

const ash = require("express-async-handler");

// ~> All marks
const getAllMarks = ash(async (req, res) => {
  const allMarks = await MarkService.getAllMarks();

  res.json(allMarks);
});

// ~> Get specified mark
const getMarkById = ash(async (req, res) => {
  const { id: markId } = req.params;

  const mark = await MarkService.getMarkById(markId);

  res.json(mark);
});

// ~> Add mark
const addMark = ash(async (req, res) => {
  const result = await MarkService.addMark(req.body);

  if (result) res.status(201);
  res.json(result);
});

// ~> Update mark
const updateMark = ash(async (req, res) => {
  const { id } = req.params;

  const result = await MarkService.updateMark(id, req.body);

  res.json(result);
});

// ~> Remove mark
const removeMark = ash(async (req, res) => {
  const { id } = req.params;

  const result = await MarkService.removeMark(id);

  res.json(result);
});

module.exports = {
  getAllMarks,
  getMarkById,
  addMark,
  updateMark,
  removeMark,
};
