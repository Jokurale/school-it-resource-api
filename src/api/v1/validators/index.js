const validateAddress = require("./AddressValidator");
const validateRoom = require("./RoomValidator");
const validateSubject = require("./SubjectValidator");
const validateHomework = require("./HomeworkValidator");
const validateMark = require("./MarkValidator");
const validatePersonalInfo = require("./PersonalInfoValidator");
const validateUser = require("./UserValidator");
const validateGroup = require("./GroupValidator");
const validateLesson = require("./LessonValidator");
const validateAttendance = require("./AttendanceValidator");
const validateSchedule = require("./ScheduleValidator");
const validatePassword = require("./PasswordValidator");

module.exports = {
  validateAddress,
  validateLesson,
  validateRoom,
  validateSubject,
  validateHomework,
  validateMark,
  validatePersonalInfo,
  validateUser,
  validateGroup,
  validateAttendance,
  validateSchedule,
  validatePassword,
};
