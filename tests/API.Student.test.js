process.env.NODE_ENV = "testing";

const { TestFactory, ResponseParam } = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Student",
  path: "/students",
  app,
  extraGetPaths: [
    "/homeworks",
    "/marks",
    "/profile",
    "/personalInfo",
    "/addresses",
    "/group",
  ],
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new ResponseParam("userId"))
  .setupGetTests()
  .exec();
