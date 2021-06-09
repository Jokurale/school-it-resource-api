const { StudentService } = require("../services");

const { validateGroup } = require("../validators");

const ash = require("express-async-handler");

const getAllStudents = ash(async (req, res) => {
  const students = await StudentService.getAllStudents();

  return res.json(students);
});

const getStudentById = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const student = await StudentService.getStudentById(studentId);

  return res.json(student);
});

const getStudentsHomeworks = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const homeworks = await StudentService.getHomeworks(studentId);

  return res.json(homeworks);
});

const getStudentsMarks = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const marks = await StudentService.getMarks(studentId);

  return res.json(marks);
});

const getStudentsAddresses = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const addresses = await StudentService.getAddresses(studentId);

  return res.json(addresses);
});

const getStudentsPersonalInfo = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const personalInfo = await StudentService.getPersonalInfo(studentId);

  return res.json(personalInfo);
});

const getStudentsGroup = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const group = await StudentService.getGroup(studentId);

  return res.json(group);
});

const assignStudentToGroup = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const {
    data: { symbol },
  } = await validateGroup(req.body);

  const result = await StudentService.assignToGroup(studentId, symbol);

  return res.json(result);
});

module.exports = {
  getStudentsHomeworks,
  getAllStudents,
  getStudentById,
  getStudentsAddresses,
  getStudentsHomeworks,
  getStudentsMarks,
  getStudentsPersonalInfo,
  getStudentsGroup,
  assignStudentToGroup,
};
