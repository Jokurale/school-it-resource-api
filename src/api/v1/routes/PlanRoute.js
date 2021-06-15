const { Router } = require("express");

const { PlanController } = require("../controllers");

const { getAllPlans, getPlanById, addPlan, removePlan, updatePlan } =
  PlanController;

// ~~> Mounted as /groups
const route = Router();

route.get("/", getAllPlans);
route.post("/", addPlan);
route.get("/:id", getPlanById);
route.delete("/:id", removePlan);
route.put("/:id", updatePlan);

module.exports = route;
