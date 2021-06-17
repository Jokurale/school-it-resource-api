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
  .registerParam(new RequiredParam("studentId", global.mock.student.student.id))
  .registerParam(new RequiredParam("teacherId", global.mock.teacher.teacher.id))
  .registerParam(new UpdateParam("description", "Test updated description"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
