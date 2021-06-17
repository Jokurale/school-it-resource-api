process.env.NODE_ENV = "testing";
// Test grabber

const { readMockFile } = require("../ParseMockData");

// Register global mock data
global.mock = readMockFile();

// Register test names to run (API.<name>.test.js)
const tests = ["Address", "Homework", "Mark"];

describe("⚡ Loading school-it resource-api REST tests...", () => {
  tests.forEach((testName) => {
    it(`Loaded API.${testName}.test.js`, () => {
      require(`../../API.${testName}.test.js`);
    });
  });
});
