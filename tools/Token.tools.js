const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  verify: (token) => {
    let verificationResult;

    try {
      verificationResult = jwt.verify(token, process.env.JWT_ACCESS);
    } catch {
      verificationResult = false;
    }

    return verificationResult;
  },
};
