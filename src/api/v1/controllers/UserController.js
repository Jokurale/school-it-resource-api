const { UserService } = require("../services");

const ash = require("express-async-handler");

// ~> All users
const getAllUsers = ash(async (req, res) => {
  const allUsers = await UserService.getAllUsers();

  return res.json(allUsers);
});

// ~> Get specified user
const getUserById = ash(async (req, res) => {
  const { id: userId } = req.params;

  const user = await UserService.getUserById(userId);

  return res.json(user);
});

// ~> Add user
const addUser = ash(async (req, res) => {
  const result = await UserService.addUser(req.body);

  console.log(result);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Remove user
const removeUser = ash(async (req, res) => {
  const { id: userId } = req.params;

  const result = await UserService.removeUser(userId);

  return res.json(result);
});

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
};
