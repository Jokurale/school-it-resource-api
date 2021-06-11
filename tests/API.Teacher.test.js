process.env.NODE_ENV = "testing";

const { TestFactory, ResponseParam } = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Teacher",
  path: "/teachers",
  app,
  extraGetPaths: [
    "/homeworks",
    "/marks",
    "/profile",
    "/personalInfo",
    "/addresses",
  ],
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new ResponseParam("userId"))
  .setupGetTests()
  .exec();
