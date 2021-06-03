const bcrypt = require("bcrypt");

const salt = process.env.PASS_SALT;

async function hash(password) {
  return await bcrypt.hash(password.trim() + salt, 10);
}

module.exports = { hash };
