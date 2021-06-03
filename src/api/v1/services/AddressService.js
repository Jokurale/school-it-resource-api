const { PrismaClient } = require("@prisma/client");
const { validateAddress } = require("../validators");
const prisma = new PrismaClient();

const { ServiceFactory } = require("../helpers");

const factory = new ServiceFactory(prisma, validateAddress, "address");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllAddresses: getAll,
  getAddressById: getById,
  addAddress: add,
  updateAddress: update,
  removeAddress: remove,
};
