const { prisma } = require("../database");

const { validateAddress } = require("../validators");

const { ServiceFactory } = require("../factories");

const factory = new ServiceFactory(prisma, validateAddress, "address");

const { getAll, getById, add, update, remove } = factory.getServiceFunctions();

module.exports = {
  getAllAddresses: getAll,
  getAddressById: getById,
  addAddress: add,
  updateAddress: update,
  removeAddress: remove,
};
