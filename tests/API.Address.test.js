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
  .registerResponseParam(new ResponseParam("id"))
  .registerRequiredParam(
    new RequiredParam("personalInfoId", "024a26ac-2e93-45d1-b7b9-a2a79b5bdb61")
  )
  .registerRequiredParam(new RequiredParam("address1", "Test Address"))
  .registerOptionalParam(new OptionalParam("address2"))
  .registerOptionalParam(new OptionalParam("address3"))
  .registerRequiredParam(new RequiredParam("city", "Test city"))
  .registerRequiredParam(new RequiredParam("country", "UK"))
  .registerRequiredParam(new RequiredParam("postalCode", "10-100"))
  .registerRequiredParam(new RequiredParam("state", "Test state"))
  .registerUpdateParam(new UpdateParam("address2", "Test address to update 2"))
  .registerUpdateParam(new UpdateParam("address3", "Test address to update 3"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
