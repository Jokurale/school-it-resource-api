const { SubjectService } = require("../services");

const ash = require("express-async-handler");

// ~> All subjects
const getAllSubjects = ash(async (req, res) => {
  const allSubjects = await SubjectService.getAllSubjects();

  res.json(allSubjects);
});

// ~> Get specified Subject
const getSubjectById = ash(async (req, res) => {
  const { id: SubjectId } = req.params;

  const subject = await SubjectService.getSubjectById(SubjectId);

  res.json(subject);
});

// ~> Add subject
const addSubject = ash(async (req, res) => {
  const result = await SubjectService.addSubject(req.body);

  if (result) res.status(201);
  res.json(result);
});

// ~> Update subject
const updateSubject = ash(async (req, res) => {
  const { id } = req.params;

  const result = await SubjectService.updateSubject(id, req.body);

  res.json(result);
});

// ~> Remove subject
const removeSubject = ash(async (req, res) => {
  const { id } = req.params;

  const result = await SubjectService.removeSubject(id);

  res.json(result);
});

module.exports = {
  getAllSubjects,
  getSubjectById,
  addSubject,
  updateSubject,
  removeSubject,
};
