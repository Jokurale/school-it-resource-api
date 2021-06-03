const { RoomSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(RoomSchema);

const { validator: validateRoom } = factory.getServiceFunctions();

module.exports = validateRoom;
