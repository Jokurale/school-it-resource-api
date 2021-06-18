const { StudentService } = require("../services");

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

const getStudentsGroups = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const group = await StudentService.getGroups(studentId);

  return res.json(group);
});

const getStudentsAttendance = ash(async (req, res) => {
  const { id: studentId } = req.params;

  const attendance = await StudentService.getAttendance(studentId);

  return res.json(attendance);
});

const assignStudentToGroup = ash(async (req, res) => {
  const { id: studentId, groupId } = req.params;

  const result = await StudentService.assignToGroup(studentId, groupId);

  return res.json(result);
});

const removeStudentFromGroup = ash(async (req, res) => {
  const { id: studentId, groupId } = req.params;

  const result = await StudentService.removeFromGroup(studentId, groupId);

  return res.json(result);
});

module.exports = {
  getStudentsHomeworks,
  getAllStudents,
  getStudentById,
  getStudentsAddresses,
  getStudentsMarks,
  getStudentsPersonalInfo,
  getStudentsGroups,
  getStudentsAttendance,
  assignStudentToGroup,
  removeStudentFromGroup,
};
