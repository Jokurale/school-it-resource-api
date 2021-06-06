const { Router } = require("express");

const { PersonalInfoController } = require("../controllers");

const {
  getAllPersonalInfos,
  getPersonalInfoById,
  addPersonalInfo,
  removePersonalInfo,
  updatePersonalInfo,
} = PersonalInfoController;

// ~~> Mounted as /personalinfos
const route = Router();

route.get("/", getAllPersonalInfos);
route.get("/:id", getPersonalInfoById);
route.post("/", addPersonalInfo);
route.delete("/:id", removePersonalInfo);
route.put("/:id", updatePersonalInfo);

module.exports = route;
