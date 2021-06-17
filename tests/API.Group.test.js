process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Group",
  path: "/groups",
  app,
  extraGetPaths: ["/schedule", "/members"],
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("symbol", "TESTCLASS"))
  .registerParam(new UpdateParam("symbol", "TESTCLASSSYMBOL"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
