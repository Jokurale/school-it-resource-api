const { Router } = require("express");

const { UserController } = require("../controllers");

const { getAllUsers, getUserById, addUser, removeUser } = UserController;

// ~~> Mounted as /students
const route = Router();

route.get("/", getAllUsers);
route.get("/:id", getUserById);
route.post("/", addUser);
route.delete("/:id", removeUser);

module.exports = route;
