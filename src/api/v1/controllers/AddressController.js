const { AddressService } = require("../services");

const ash = require("express-async-handler");

// ~> All addresses
const getAllAddresses = ash(async (req, res) => {
  const allAddresses = await AddressService.getAllAddresses();

  res.json(allAddresses);
});

// ~> Get specified address
const getAddressById = ash(async (req, res) => {
  const { id: addressId } = req.params;

  const address = await AddressService.getAddressById(addressId);

  res.json(address);
});

// ~> Add address
const addAddress = ash(async (req, res) => {
  const result = await AddressService.addAddress(req.body);

  if (result) res.status(201);
  res.json(result);
});

// ~> Update address
const updateAddress = ash(async (req, res) => {
  const { id } = req.params;

  const result = await AddressService.updateAddress(id, req.body);

  res.json(result);
});

// ~> Remove address
const removeAddress = ash(async (req, res) => {
  const { id } = req.params;

  const result = await AddressService.removeAddress(id);

  res.json(result);
});

module.exports = {
  getAllAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  removeAddress,
};
