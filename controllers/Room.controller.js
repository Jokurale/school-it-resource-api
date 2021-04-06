const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");
const roomPreparator = require("../preparators/Room.preparator");

// ~> Get all rooms
module.exports.getAllRooms = ash(async (req, res) => {
  const result = await prisma.room.findMany();

  res.json(result);

  await prisma.$disconnect();
});

// ~> Get specified room
module.exports.getRoomById = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.room.findFirst({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Add room
module.exports.addRoom = ash(async (req, res) => {
  const preparedRoom = await roomPreparator(req.body);

  const result = await prisma.room.create(preparedRoom);

  res.json(result);

  await prisma.$disconnect();
});

// ~> Update room
module.exports.updateRoom = ash(async (req, res) => {
  const { id } = req.params;

  const preparedRoom = await roomPreparator(req.body, (type = "update"));

  const result = await prisma.room.update({
    where: {
      id,
    },
    ...preparedRoom,
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Remove room
module.exports.removeRoom = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.room.delete({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});
