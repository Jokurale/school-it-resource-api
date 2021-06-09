const { Router } = require("express");

const { GroupController } = require("../controllers");

const { getAllGroups, getGroupById, addGroup, removeGroup, updateGroup } =
  GroupController;

// ~~> Mounted as /groups
const route = Router();

route.get("/", getAllGroups);
route.post("/", addGroup);
route.get("/:id", getGroupById);
route.delete("/:id", removeGroup);
route.put("/:id", updateGroup);

module.exports = route;
