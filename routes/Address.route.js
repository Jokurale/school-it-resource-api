const { Router } = require("express");
const {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress,
} = require("../controllers/Address.controller");

// ~~> Mounted as /homeworks
const route = Router();

route.get("/", getAllAddresses);
route.get("/:id", getAddressById);
route.post("/", addAddress);
route.put("/:id", updateAddress);
route.delete("/:id", removeAddress);

module.exports = route;
