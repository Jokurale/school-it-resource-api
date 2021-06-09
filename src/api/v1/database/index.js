const DatabaseClient = require("./DatabaseClient");

module.exports = {
  prisma: DatabaseClient,
  // Backwards
  client: DatabaseClient,
};
