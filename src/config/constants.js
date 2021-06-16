module.exports = Object.freeze({
  MAX_ADDRESSES_PER_REGISTER: 3,
  MIN_ADDRESSES_PER_REGISTER: 1,

  MAX_ADDRESS_LENGTH: 150,
  MIN_ADDRESS_LENGTH: 5,

  MAX_CITY_LENGTH: 100,
  MIN_CITY_LENGTH: 2,

  MAX_STATE_LENGTH: 50,
  MIN_STATE_LENGTH: 2,

  MAX_COUNTRY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 2,

  MAX_POSTAL_CODE_LENGTH: 10,
  MIN_POSTAL_CODE_LENGTH: 2,

  UUID_LENGTH: 36,

  MAX_LOGIN_LENGTH: 3,
  MIN_LOGIN_LENGTH: 30,

  PASSWORD_REGEX_PATTERN:
    "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,25}/",

  MAX_PASSWORD_LENGTH: 25,
  MIN_PASSWORD_LENGTH: 8,

  MAX_GROUP_SYMBOL_LENGTH: 30,
  MIN_GROUP_SYMBOL_LENGTH: 2,

  MAX_HOMEWORK_DESCRIPTION_LENGTH: 512,
  MIN_HOMEWORK_DESCRIPTION_LENGTH: 0,

  MAX_MARK_DESCRIPTION_LENGTH: 512,
  MIN_MARK_DESCRIPTION_LENGTH: 0,

  // ! Mark values are treated as strings
  MAX_MARK_VALUE_LENGTH: 100,
  MIN_MARK_VALUE_LENGTH: 1,

  // ! Mark's weight are treated as numbers
  MAX_MARK_WEIGHT: 100,
  MIN_MARK_WEIGHT: 0,

  VALID_LESSON_DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

  MAX_ROLE_LENGTH: 25,
  MIN_ROLE_LENGTH: 5,

  VALID_ATTENDANCE_TYPES: ["Absent", "Present", "Excused absence", "Lateness"],

  DEFAULT_ROLE_ON_REGISTER: "student",

  VALID_ROLES_TO_REGISTER: ["student", "teacher"],

  MAX_FIRSTNAME_LENGTH: 50,
  MIN_FIRSTNAME_LENGTH: 2,

  MAX_MIDDLENAME_LENGTH: 50,
  MIN_MIDDLENAME_LENGTH: 2,

  MAX_LASTNAME_LENGTH: 50,
  MIN_LASTNAME_LENGTH: 2,

  MIN_EMAIL_DOMAIN_SEGEMENTS: 2,

  ALLOWED_EMAIL_DOMAINS: ["pl", "com", "net"],

  MAX_ROOM_TYPE_LENGTH: 50,
  MIN_ROOM_TYPE_LENGTH: 5,

  // ! Room's numbers are treated as strings (e.g 100A, 100B)
  MAX_ROOM_NUMBER_LENGTH: 20,
  MIN_ROOM_NUMBER_LENGTH: 1,

  MAX_SUBJECT_NAME_LENGTH: 50,
  MIN_SUBJECT_NAME_LENGTH: 2,

  // prettier-ignore
  GENERAL_REGEX: "^[,. \\-\\w0-9]+$",

  PROTECTED_ROLES: ["admin", "root", "administrator", "headmaster"],
  AVAILABLE_ROLES: [
    "admin",
    "headmaster",
    "root",
    "administrator",
    "teacher",
    "student",
  ],
});
