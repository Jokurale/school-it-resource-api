process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Homework",
  path: "/homeworks",
  app,
});

suite
  .registerResponseParam(new ResponseParam("id"))
  .registerRequiredParam(new RequiredParam("createdAt", "1970-01-01"))
  .registerRequiredParam(new RequiredParam("deadline", "1970-01-01"))
  .registerRequiredParam(
    new RequiredParam("description", "Valid test description")
  )
  .registerRequiredParam(
    new RequiredParam("studentId", "024ee216-3e2c-4ae2-a9d4-3feb38bc35ca")
  )
  .registerRequiredParam(
    new RequiredParam("teacherId", "07533bce-f01f-48a2-a7a7-ca553e9dc18f")
  )
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
