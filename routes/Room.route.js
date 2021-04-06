const { Router } = require("express");

const {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoom,
  removeRoom,
} = require("../controllers/Room.controller");

// ~~> Mounted as /subjects
const route = Router();

route.get("/", getAllRooms);
route.get("/:id", getRoomById);
route.post("/", addRoom);
route.delete("/:id", removeRoom);
route.put("/:id", updateRoom);

module.exports = route;
