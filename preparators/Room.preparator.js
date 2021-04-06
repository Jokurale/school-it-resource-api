const { createSchema, updateSchema } = require("../schemas/Room.schema");

const roomPreparator = async (room, mode = "create") => {
  // Await validation based on operation's mode
  const valid =
    mode == "create"
      ? await createSchema.validateAsync(room)
      : await updateSchema.validateAsync(room);

  // Prepare database query
  const databaseReadyRoom = {
    data: {
      ...valid,
    },
  };

  return databaseReadyRoom;
};

module.exports = roomPreparator;
