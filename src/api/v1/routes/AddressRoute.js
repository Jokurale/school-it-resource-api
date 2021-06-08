const { Router } = require("express");

const { AddressController } = require("../controllers");

const {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress,
} = AddressController;

// ~~> Mounted as /addresses
const route = Router();

route.get("/", getAllAddresses);
route.get("/:id", getAddressById);
route.post("/", addAddress);
route.put("/:id", updateAddress);
route.delete("/:id", removeAddress);

module.exports = route;
