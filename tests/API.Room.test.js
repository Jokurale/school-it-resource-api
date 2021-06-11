process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Room",
  path: "/rooms",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("type", "Test Lab"))
  .registerParam(new RequiredParam("number", "100T"))
  .registerParam(new UpdateParam("type", "Test Lab Updated"))
  .registerParam(new UpdateParam("number", "100E"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
