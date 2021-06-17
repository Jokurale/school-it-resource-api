const { Router } = require("express");

const { GroupController } = require("../controllers");

const {
  getAllGroups,
  getGroupById,
  addGroup,
  removeGroup,
  updateGroup,
  getGroupsSchedule,
  getGroupsMembers,
} = GroupController;

// ~~> Mounted as /groups
const route = Router();

route.get("/", getAllGroups);
route.post("/", addGroup);
route.get("/:id", getGroupById);
route.delete("/:id", removeGroup);
route.put("/:id", updateGroup);
route.get("/:id/schedule", getGroupsSchedule);
route.get("/:id/members", getGroupsMembers);

module.exports = route;
