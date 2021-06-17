process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Attendance",
  path: "/attendance",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("date", "1970-01-01"))
  .registerParam(new RequiredParam("studentId", global.mock.student.student.id))
  .registerParam(new RequiredParam("teacherId", global.mock.teacher.teacher.id))
  .registerParam(new RequiredParam("hourId", global.mock.hour.id))
  .registerParam(new RequiredParam("type", "Present"))
  .registerParam(new UpdateParam("type", "Excused absence"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
