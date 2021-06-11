process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Homework",
  path: "/homeworks",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("createdAt", "1970-01-01"))
  .registerParam(new RequiredParam("deadline", "1970-01-01"))
  .registerParam(new RequiredParam("description", "Valid test description"))
  .registerParam(
    new RequiredParam("studentId", "024ee216-3e2c-4ae2-a9d4-3feb38bc35ca")
  )
  .registerParam(
    new RequiredParam("teacherId", "07533bce-f01f-48a2-a7a7-ca553e9dc18f")
  )
  .registerParam(new UpdateParam("description", "Test updated description"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
