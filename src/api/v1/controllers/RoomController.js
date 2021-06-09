const { RoomService } = require("../services");

const ash = require("express-async-handler");

// ~> All rooms
const getAllRooms = ash(async (req, res) => {
  const allRooms = await RoomService.getAllRooms();

  return res.json(allRooms);
});

// ~> Get specified room
const getRoomById = ash(async (req, res) => {
  const { id: roomId } = req.params;

  const room = await RoomService.getRoomById(roomId);

  return res.json(room);
});

// ~> Add room
const addRoom = ash(async (req, res) => {
  const result = await RoomService.addRoom(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update room
const updateRoom = ash(async (req, res) => {
  const { id } = req.params;

  const result = await RoomService.updateRoom(id, req.body);

  return res.json(result);
});

// ~> Remove room
const removeRoom = ash(async (req, res) => {
  const { id } = req.params;

  const result = await RoomService.removeRoom(id);

  return res.json(result);
});

module.exports = {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoom,
  removeRoom,
};
