process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Mark",
  path: "/marks",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("createdAt", "1970-01-01"))
  .registerParam(new RequiredParam("description", "Test mark description"))
  .registerParam(new RequiredParam("mark", "6"))
  .registerParam(new RequiredParam("weight", 10))
  .registerParam(new RequiredParam("studentId", global.mock.student.student.id))
  .registerParam(new RequiredParam("teacherId", global.mock.teacher.teacher.id))
  .registerParam(new RequiredParam("subjectId", global.mock.subject.id))
  .registerParam(new UpdateParam("description", "Test mark description update"))
  .registerParam(new UpdateParam("mark", "7"))
  .registerParam(new UpdateParam("weight", "8"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
