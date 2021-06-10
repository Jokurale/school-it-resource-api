const { Router } = require("express");

const { UserController } = require("../controllers");

const {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
  getUsersAddresses,
  getUsersPersonalInfo,
} = UserController;

// ~~> Mounted as /students
const route = Router();

route.get("/", getAllUsers);
route.get("/:id", getUserById);
route.post("/", addUser);
route.delete("/:id", removeUser);
route.get("/:id/addresses", getUsersAddresses);
route.get("/:id/personalInfo", getUsersPersonalInfo);

// Aliases
route.get("/:id/profile", getUsersPersonalInfo);

module.exports = route;
