process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  OptionalParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Address",
  path: "/addresses",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(
    new RequiredParam("personalInfoId", global.mock.student.personalInfo.id)
  )
  .registerParam(new RequiredParam("address1", "Test Address"))
  .registerParam(new OptionalParam("address2"))
  .registerParam(new OptionalParam("address3"))
  .registerParam(new RequiredParam("city", "TestCity"))
  .registerParam(new RequiredParam("country", "UK"))
  .registerParam(new RequiredParam("postalCode", "10-100"))
  .registerParam(new RequiredParam("state", "TestState"))
  .registerParam(new UpdateParam("address2", "Test address to update 2"))
  .registerParam(new UpdateParam("address3", "Test address to update 3"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
