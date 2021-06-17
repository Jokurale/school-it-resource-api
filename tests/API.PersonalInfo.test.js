process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Personal Infos",
  path: "/personalinfos",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new ResponseParam("dateOfBirth"))
  .registerParam(new ResponseParam("email"))
  .registerParam(new ResponseParam("firstname"))
  .registerParam(new ResponseParam("lastname"))
  .registerParam(new ResponseParam("middlename"))
  .registerParam(new ResponseParam("userId"))
  .setupGetTests()
  .exec();
