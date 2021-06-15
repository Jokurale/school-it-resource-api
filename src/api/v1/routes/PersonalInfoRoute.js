const { Router } = require("express");

const { PersonalInfoController } = require("../controllers");

const { getAllPersonalInfos, getPersonalInfoById, updatePersonalInfo } =
  PersonalInfoController;

// ~~> Mounted as /personalinfos
const route = Router();

route.get("/", getAllPersonalInfos);
route.get("/:id", getPersonalInfoById);
route.put("/:id", updatePersonalInfo);

module.exports = route;
