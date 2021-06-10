const { TeacherService } = require("../services");

const ash = require("express-async-handler");

const getAllTeachers = ash(async (req, res) => {
  const teachers = await TeacherService.getAllTeachers();

  return res.json(teachers);
});

const getTeacherById = ash(async (req, res) => {
  const { id: teacherId } = req.params;

  const teacher = await TeacherService.getTeacherById(teacherId);

  return res.json(teacher);
});

const getTeachersHomeworks = ash(async (req, res) => {
  const { id: teacherId } = req.params;

  const homeworks = await TeacherService.getHomeworks(teacherId);

  return res.json(homeworks);
});

const getTeachersMarks = ash(async (req, res) => {
  const { id: teacherId } = req.params;

  const marks = await TeacherService.getMarks(teacherId);

  return res.json(marks);
});

const getTeachersAddresses = ash(async (req, res) => {
  const { id: teacherId } = req.params;

  const addresses = await TeacherService.getAddresses(teacherId);

  return res.json(addresses);
});

const getTeachersPersonalInfo = ash(async (req, res) => {
  const { id: teacherId } = req.params;

  const personalInfo = await TeacherService.getPersonalInfo(teacherId);

  return res.json(personalInfo);
});

module.exports = {
  getTeachersHomeworks,
  getAllTeachers,
  getTeacherById,
  getTeachersAddresses,
  getTeachersHomeworks,
  getTeachersMarks,
  getTeachersPersonalInfo,
};
