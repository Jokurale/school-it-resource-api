process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Schedule",
  path: "/schedules",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("groupId", global.mock.groups[0].id))
  .registerParam(new UpdateParam("groupId", global.mock.groups[1].id))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
