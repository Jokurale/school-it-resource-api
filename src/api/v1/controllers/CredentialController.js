const { CredentialService } = require("../services");

const ash = require("express-async-handler");

// ~> Change password path
const changePassword = ash(async (req, res) => {
  const { id: credentialId } = req.params;

  const result = await CredentialService.changePassword(credentialId, req.body);

  return res.json(result);
});

module.exports = {
  changePassword,
};
