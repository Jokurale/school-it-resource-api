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
    new RequiredParam("personalInfoId", "024a26ac-2e93-45d1-b7b9-a2a79b5bdb61")
  )
  .registerParam(new RequiredParam("address1", "Test Address"))
  .registerParam(new OptionalParam("address2"))
  .registerParam(new OptionalParam("address3"))
  .registerParam(new RequiredParam("city", "Test city"))
  .registerParam(new RequiredParam("country", "UK"))
  .registerParam(new RequiredParam("postalCode", "10-100"))
  .registerParam(new RequiredParam("state", "Test state"))
  .registerParam(new UpdateParam("address2", "Test address to update 2"))
  .registerParam(new UpdateParam("address3", "Test address to update 3"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
