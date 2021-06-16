const { ScheduleService } = require("../services");

const ash = require("express-async-handler");

// ~> All groups
const getAllSchedules = ash(async (req, res) => {
  const allSchedules = await ScheduleService.getAllSchedules();

  return res.json(allSchedules);
});

// ~> Get specified schedule
const getScheduleById = ash(async (req, res) => {
  const { id: groupId } = req.params;

  const schedule = await ScheduleService.getScheduleById(groupId);

  return res.json(schedule);
});

// ~> Add schedule
const addSchedule = ash(async (req, res) => {
  const result = await ScheduleService.addSchedule(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update schedule
const updateSchedule = ash(async (req, res) => {
  const { id } = req.params;

  const result = await ScheduleService.updateSchedule(id, req.body);

  return res.json(result);
});

// ~> Remove schedule
const removeSchedule = ash(async (req, res) => {
  const { id } = req.params;

  const result = await ScheduleService.removeSchedule(id);

  return res.json(result);
});

module.exports = {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  removeSchedule,
};
