process.env.NODE_ENV = "testing";
// Test grabber

// TODO: Integration testing: change user's password
// TODO: Integration testing: get group's plan
// TODO: Integration testing: get group's members
// TODO: Integration testing: assign student to group
// TODO: Integration testing: change student's group
// TODO: Integration testing: remove student from group
// TODO: Integration testing: clean up schedule
// TODO: Integration testing: add lesson to schedule
// TODO: Integration testing: remove lesson from schedule
// TODO: Integration testing: add user
// TODO: Integration testing: remove user
// TODO: Integration testing: update personal info

const { readMockFile } = require("../ParseMockData");

// Register global mock data
global.mock = readMockFile();

// Register test names to run (API.<name>.test.js)
const tests = [
  "Address",
  "Homework",
  "Mark",
  "Room",
  "Student",
  "Subject",
  "Teacher",
  "User",
  "Attendance",
  "PersonalInfo",
  "Group",
  "Lesson",
];

describe("⚡ Loading school-it resource-api REST tests...", () => {
  tests.forEach((testName) => {
    it(`Loaded API.${testName}.test.js`, () => {
      require(`../../API.${testName}.test.js`);
    });
  });
});
