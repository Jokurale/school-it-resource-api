const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");

const addressPreparator = require("../preparators/Address.preparator");

// ~> All addresses
module.exports.getAllAddresses = ash(async (req, res) => {
  const result = await prisma.address.findMany();
  res.json(result);

  await prisma.$disconnect();
});

// ~> Get specified address
module.exports.getAddressById = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.address.findFirst({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Add address
module.exports.addAddress = ash(async (req, res) => {
  const preparedAddress = await addressPreparator(req.body);

  const result = await prisma.address.create(preparedAddress);

  res.status(201).json(result);

  await prisma.$disconnect();
});

// ~> Update address
module.exports.updateAddress = ash(async (req, res) => {
  const { id } = req.params;

  const preparedAddress = await addressPreparator(req.body, "update");

  const result = await prisma.address.update({
    where: {
      id,
    },
    ...preparedAddress,
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Remove address
module.exports.removeAddress = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.address.delete({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});
