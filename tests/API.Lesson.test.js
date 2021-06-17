process.env.NODE_ENV = "testing";

const {
  TestFactory,
  RequiredParam,
  ResponseParam,
  UpdateParam,
} = require("./utils/TestFactory");

const app = require("../src/index");

const suite = new TestFactory({
  moduleName: "Lesson",
  path: "/lessons",
  app,
});

suite
  .registerParam(new ResponseParam("id"))
  .registerParam(new RequiredParam("day", "Monday"))
  .registerParam(new RequiredParam("hourId", global.mock.hour.id))
  .registerParam(new RequiredParam("teacherId", global.mock.teacher.teacher.id))
  .registerParam(new RequiredParam("roomId", global.mock.room.id))
  .registerParam(new RequiredParam("subjectId", global.mock.subject.id))
  .registerParam(new UpdateParam("day", "Friday"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
