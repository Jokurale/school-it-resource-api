process.env.NODE_ENV = "testing";

const { TestFactory, ResponseParam } = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Users",
  path: "/users",
  app,
  extraGetPaths: ["/profile", "/addresses"],
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new ResponseParam("personalInfo"))
  .registerParam(new ResponseParam("credential"))
  .registerParam(new ResponseParam("student"))
  .registerParam(new ResponseParam("teacher"))
  .setupGetTests()
  .exec();
