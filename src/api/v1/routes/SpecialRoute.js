const { Router } = require("express");

const { SpecialController } = require("../controllers");

// ~~> Mounted as /auth
const route = Router();

// ~> Get user credentials for
route.get("/:login", SpecialController.getCredentialsByLogin);

module.exports = route;
