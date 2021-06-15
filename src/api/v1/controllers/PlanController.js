const { PlanService } = require("../services");

const ash = require("express-async-handler");

// ~> All groups
const getAllPlans = ash(async (req, res) => {
  const allPlans = await PlanService.getAllPlans();

  return res.json(allPlans);
});

// ~> Get specified plan
const getPlanById = ash(async (req, res) => {
  const { id: groupId } = req.params;

  const plan = await PlanService.getPlanById(groupId);

  return res.json(plan);
});

// ~> Add plan
const addPlan = ash(async (req, res) => {
  const result = await PlanService.addPlan(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update plan
const updatePlan = ash(async (req, res) => {
  const { id } = req.params;

  const result = await PlanService.updatePlan(id, req.body);

  return res.json(result);
});

// ~> Remove plan
const removePlan = ash(async (req, res) => {
  const { id } = req.params;

  const result = await PlanService.removePlan(id);

  return res.json(result);
});

module.exports = {
  getAllPlans,
  getPlanById,
  addPlan,
  updatePlan,
  removePlan,
};
