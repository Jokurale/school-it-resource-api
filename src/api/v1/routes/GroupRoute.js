const { Router } = require("express");

const { GroupController } = require("../controllers");

const {
  getAllGroups,
  getGroupById,
  addGroup,
  removeGroup,
  updateGroup,
  getGroupsPlan,
} = GroupController;

// ~~> Mounted as /groups
const route = Router();

route.get("/", getAllGroups);
route.post("/", addGroup);
route.get("/:id", getGroupById);
route.delete("/:id", removeGroup);
route.put("/:id", updateGroup);
route.get("/:id/plan", getGroupsPlan);

module.exports = route;
