const { Router } = require("express");

const { CredentialController } = require("../controllers");

const { changePassword } = CredentialController;

// ~~> Mounted as /credentials
const route = Router();

route.post("/:id", changePassword);

module.exports = route;
