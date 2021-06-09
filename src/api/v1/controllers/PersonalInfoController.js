const { PersonalInfoService } = require("../services");

const ash = require("express-async-handler");

// ~> All PersonalInfos
const getAllPersonalInfos = ash(async (req, res) => {
  const allPersonalInfos = await PersonalInfoService.getAllPersonalInfos();

  return res.json(allPersonalInfos);
});

// ~> Get specified PersonalInfo
const getPersonalInfoById = ash(async (req, res) => {
  const { id: PersonalInfoId } = req.params;

  const PersonalInfo = await PersonalInfoService.getPersonalInfoById(
    PersonalInfoId
  );

  return res.json(PersonalInfo);
});

// ~> Add PersonalInfo
const addPersonalInfo = ash(async (req, res) => {
  const result = await PersonalInfoService.addPersonalInfo(req.body);

  if (result) res.status(201);
  return res.json(result);
});

// ~> Update PersonalInfo
const updatePersonalInfo = ash(async (req, res) => {
  const { id } = req.params;

  const result = await PersonalInfoService.updatePersonalInfo(id, req.body);

  return res.json(result);
});

// ~> Remove PersonalInfo
const removePersonalInfo = ash(async (req, res) => {
  const { id } = req.params;

  const result = await PersonalInfoService.removePersonalInfo(id);

  return res.json(result);
});

module.exports = {
  getAllPersonalInfos,
  getPersonalInfoById,
  addPersonalInfo,
  updatePersonalInfo,
  removePersonalInfo,
};
