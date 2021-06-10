process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Subject",
  path: "/subjects",
  app,
});

suite
  .registerResponseParam(new ResponseParam("id"))
  .registerRequiredParam(new RequiredParam("name", "Subject test name"))
  .registerUpdateParam(new UpdateParam("name", "Update subject name"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
