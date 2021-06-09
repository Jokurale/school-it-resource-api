const { GroupService } = require("../services");

const ash = require("express-async-handler");

// ~> All groups
const getAllGroups = ash(async (req, res) => {
  const allGroups = await GroupService.getAllGroups();

  return res.json(allGroups);
});

// ~> Get specified group
const getGroupById = ash(async (req, res) => {
  const { id: groupId } = req.params;

  const group = await GroupService.getGroupById(groupId);

  return res.json(group);
});

// ~> Add group
const addGroup = ash(async (req, res) => {
  const result = await GroupService.addGroup(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update group
const updateGroup = ash(async (req, res) => {
  const { id } = req.params;

  const result = await GroupService.updateGroup(id, req.body);

  return res.json(result);
});

// ~> Remove group
const removeGroup = ash(async (req, res) => {
  const { id } = req.params;

  const result = await GroupService.removeGroup(id);

  return res.json(result);
});

module.exports = {
  getAllGroups,
  getGroupById,
  addGroup,
  updateGroup,
  removeGroup,
};
