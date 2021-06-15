const { AttendanceService } = require("../services");

const ash = require("express-async-handler");

// ~> All Attendances
const getAllAttendances = ash(async (req, res) => {
  const allAttendances = await AttendanceService.getAllAttendances();

  return res.json(allAttendances);
});

// ~> Get specified Attendance
const getAttendanceById = ash(async (req, res) => {
  const { id: AttendanceId } = req.params;

  const Attendance = await AttendanceService.getAttendanceById(AttendanceId);

  return res.json(Attendance);
});

// ~> Add Attendance
const addAttendance = ash(async (req, res) => {
  const result = await AttendanceService.addAttendance(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update Attendance
const updateAttendance = ash(async (req, res) => {
  const { id } = req.params;

  const result = await AttendanceService.updateAttendance(id, req.body);

  return res.json(result);
});

// ~> Remove Attendance
const removeAttendance = ash(async (req, res) => {
  const { id } = req.params;

  const result = await AttendanceService.removeAttendance(id);

  return res.json(result);
});

module.exports = {
  getAllAttendances,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  removeAttendance,
};
