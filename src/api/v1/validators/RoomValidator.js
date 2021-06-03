const { RoomSchema } = require("../schemas");

const { ValidatorFactory } = require("../factories");

const factory = new ValidatorFactory(RoomSchema);

const { validator: validateRoom } = factory.getValidatorFunction();

module.exports = validateRoom;
