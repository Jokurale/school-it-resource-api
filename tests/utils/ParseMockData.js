const fs = require("fs");

const readMockFile = () => {
  let mock = JSON.parse(fs.readFileSync("../../mock.json", "utf8"));

  return mock;
};

module.exports = {
  readMockFile,
};
