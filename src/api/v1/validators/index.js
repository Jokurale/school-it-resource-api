const validateAddress = require("./AddressValidator");
const validateRoom = require("./RoomValidator");
const validateSubject = require("./SubjectValidator");
const validateHomework = require("./HomeworkValidator");
const validateMark = require("./MarkValidator");
const validatePersonalInfo = require("./PersonalInfoValidator");
const validateUser = require("./UserValidator");

module.exports = {
  validateAddress,
  validateRoom,
  validateSubject,
  validateHomework,
  validateMark,
  validatePersonalInfo,
  validateUser,
};
