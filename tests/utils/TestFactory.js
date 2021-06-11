// TODO: Beautify code

const chalk = require("chalk");

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

class TestFactory {
  constructor(
    config = {
      app: any,
      moduleName: String,
      path: String,
      extraGetPaths: [],
    }
  ) {
    this.app = config?.app;
    this.moduleName = config?.moduleName;
    this.path = config?.path;
    this.extraGetPaths = config?.extraGetPaths;

    this.tests = [];
    this.optionalParams = [];
    this.requiredParams = [];
    this.responseParams = [];
    this.updateParams = [];

    this.tempId;

    this.registerParam = this.registerParam.bind(this);

    this.runResponseParamsCheck = this.runResponseParamsCheck.bind(this);

    this.setupGetTests = this.setupGetTests.bind(this);
    this.setupPostTests = this.setupPostTests.bind(this);
    this.setupPutTests = this.setupPutTests.bind(this);
    this.setupDeleteTests = this.setupDeleteTests.bind(this);

    this.exec = this.exec.bind(this);
  }

  runResponseParamsCheck(baseObj) {
    const cominbedParams = [
      ...this.requiredParams,
      ...this.optionalParams,
      ...this.responseParams,
    ];

    cominbedParams.forEach((param) =>
      expect(baseObj).to.have.property(param.paramName)
    );
  }

  setupGetTests() {
    const genericGetTestCase = () =>
      describe(`GET ${this.path}`, () => {
        it("Lists all objects properly", (done) => {
          chai
            .request(this.app)
            .get(this.path)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.have.property("body");

              expect(res.body).to.not.have.property("error");
              expect(res.body).to.be.an("array");

              this.runResponseParamsCheck(res.body[0]);

              const [{ id }] = res.body;
              this.tempId = id;

              done();
            });
        });
      });

    const IdGetTestCase = () => {
      describe(`GET ${this.path}/{id}`, () => {
        it("Receives particular object with given ID", (done) => {
          chai
            .request(this.app)
            .get(`${this.path}/${this.tempId}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.have.property("body");

              expect(res.body).to.not.have.property("error");
              expect(res.body).to.be.an("object");

              this.runResponseParamsCheck(res.body);

              done();
            });
        });
      });
    };

    this.tests.push(genericGetTestCase, IdGetTestCase);

    this.extraGetPaths?.forEach((path) =>
      this.tests.push(() => {
        describe(`GET ${this.path}/{id}${path} (shallow)`, () => {
          it("Receives valid response", (done) => {
            chai
              .request(this.app)
              .get(`${this.path}/${this.tempId}${path}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.property("body");

                expect(res.body).to.not.have.property("error");
                expect(res.body).to.be.satisfy(
                  (body) =>
                    Array.isArray(body) ||
                    (typeof body === "object" && body !== null)
                );
                done();
              });
          });
        });
      })
    );

    return this;
  }

  setupPostTests() {
    const genericPostTestCase = () => {
      let postData = {};

      // Setup post data
      [...this.requiredParams, ...this.optionalParams].forEach(
        (param) => (postData[param.paramName] = param.validValue)
      );

      describe(`POST ${this.path}`, () => {
        it("Receives newly created object", (done) => {
          chai
            .request(this.app)
            .post(this.path)
            .send(postData)
            .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res).to.have.property("body");
              expect(res.body).to.not.have.property("error");
              expect(res.body).to.be.an("object");

              this.runResponseParamsCheck(res.body);

              const { id } = res.body;

              this.tempId = id;

              done();
            });
        });
      });
    };

    this.tests.push(genericPostTestCase);

    return this;
  }

  setupPutTests() {
    const genericPutTestCase = () => {
      let putData = {};

      // Setup put data (update)
      this.updateParams.forEach(
        (param) => (putData[param.paramName] = param.validValue)
      );

      describe(`PUT ${this.path}/{id}`, () => {
        it("Receives updated properly object", (done) => {
          chai
            .request(this.app)
            .put(`${this.path}/${this.tempId}`)
            .send(putData)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.have.property("body");
              expect(res.body).to.not.have.property("error");
              expect(res.body).to.be.an("object");

              this.runResponseParamsCheck(res.body);

              done();
            });
        });
      });
    };

    this.tests.push(genericPutTestCase);

    return this;
  }

  setupDeleteTests() {
    const genericDeleteTestCase = () =>
      describe(`DELETE ${this.path}/{id}`, () => {
        it("Recieves deleted object", (done) => {
          chai
            .request(this.app)
            .delete(`${this.path}/${this.tempId}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.have.property("body");
              expect(res.body).to.not.have.property("error");
              expect(res.body).to.be.an("object");

              this.runResponseParamsCheck(res.body);

              done();
            });
        });
      });

    this.tests.push(genericDeleteTestCase);

    return this;
  }

  registerParam(param) {
    if (!param instanceof Param)
      throw Error(
        `Invalid parameter class. Argument should be type of Param, '${param?.constructor?.name} given.'`
      );

    const {
      constructor: { name: paramType },
    } = param;

    const validParamTypes = [
      "RequiredParam",
      "OptionalParam",
      "ResponseParam",
      "UpdateParam",
    ];

    // ??????????
    const paramArrayName = paramType.split("Param")[0].toLowerCase() + "Params";

    if (validParamTypes.includes(paramType)) this[paramArrayName].push(param);

    return this;
  }

  exec() {
    describe(`# ${this.moduleName} Module (auto-generated)`, () => {
      // Run each defined test
      for (const test of this.tests) {
        test();
      }
    });
  }
}

class Param {
  constructor(paramName, validValue) {
    this.paramName = paramName;
    this.validValue = validValue;

    this.transform = this.transform.bind(this);
  }

  transform() {
    return {
      [this.paramName]: this.validValue,
    };
  }
}

class RequiredParam extends Param {
  constructor(paramName, validValue) {
    super(paramName, validValue);
  }
}

class OptionalParam extends Param {
  constructor(paramName, validValue) {
    super(paramName, validValue);
  }
}

class UpdateParam extends Param {
  constructor(paramName, validValue) {
    super(paramName, validValue);
  }
}

class ResponseParam extends Param {
  constructor(paramName) {
    super(paramName, null);
  }
}

module.exports = {
  TestFactory,
  OptionalParam,
  RequiredParam,
  ResponseParam,
  UpdateParam,
};
