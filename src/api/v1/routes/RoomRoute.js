const { Router } = require("express");

const { RoomController } = require("../controllers");

const {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoom,
  removeRoom,
  getRoomsLessons,
} = RoomController;

// ~~> Mounted as /subjects
const route = Router();

route.get("/", getAllRooms);
route.get("/:id", getRoomById);
route.post("/", addRoom);
route.delete("/:id", removeRoom);
route.put("/:id", updateRoom);
route.get("/:id/lessons", getRoomsLessons);

module.exports = route;
