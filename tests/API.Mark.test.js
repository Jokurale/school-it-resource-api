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
  .registerParam(
    new RequiredParam("studentId", "024ee216-3e2c-4ae2-a9d4-3feb38bc35ca")
  )
  .registerParam(
    new RequiredParam("teacherId", "09549965-4939-4cc8-b2b7-499c72b7a656")
  )
  .registerParam(
    new RequiredParam("subjectId", "006adb36-4085-471b-8de5-cd34902d05f9")
  )
  .registerParam(new UpdateParam("description", "Test mark description update"))
  .registerParam(new UpdateParam("mark", "7"))
  .registerParam(new UpdateParam("weight", "8"))
  .setupGetTests()
  .setupPostTests()
  .setupPutTests()
  .setupDeleteTests()
  .exec();
