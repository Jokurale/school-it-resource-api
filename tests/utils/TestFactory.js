const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

class TestFactory {
  constructor(config = {}) {
    this.app = config?.app;
    this.moduleName = config?.moduleName;
    this.path = config?.path;

    this.tests = [];
    this.optionalParams = [];
    this.requiredParams = [];
    this.responseParams = [];
    this.updateParams = [];

    this.tempId;

    this.registerOptionalParam = this.registerOptionalParam.bind(this);
    this.registerRequiredParam = this.registerRequiredParam.bind(this);
    this.registerResponseParam = this.registerResponseParam.bind(this);
    this.registerUpdateParam = this.registerUpdateParam.bind(this);
    this.setupGetTests = this.setupGetTests.bind(this);
    this.setupPostTests = this.setupPostTests.bind(this);
    this.setupPutTests = this.setupPutTests.bind(this);
    this.setupDeleteTests = this.setupDeleteTests.bind(this);
    this.exec = this.exec.bind(this);
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

              [
                ...this.responseParams,
                ...this.optionalParams,
                ...this.requiredParams,
              ].forEach((param) =>
                expect(res.body[0]).to.have.property(param.paramName)
              );

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

              [
                ...this.responseParams,
                ...this.optionalParams,
                ...this.requiredParams,
              ].forEach((param) =>
                expect(res.body).to.have.property(param.paramName)
              );

              done();
            });
        });
      });
    };

    this.tests.push(genericGetTestCase, IdGetTestCase);

    return this;
  }

  setupPostTests() {
    const genericPostTestCase = () => {
      let postData = {};

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

              [
                ...this.responseParams,
                ...this.optionalParams,
                ...this.requiredParams,
              ].forEach((param) =>
                expect(res.body).to.have.property(param.paramName)
              );

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
      let putData;

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

              [
                ...this.responseParams,
                ...this.optionalParams,
                ...this.requiredParams,
              ].forEach((param) =>
                expect(res.body).to.have.property(param.paramName)
              );

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

              done();
            });
        });
      });

    this.tests.push(genericDeleteTestCase);

    return this;
  }

  registerOptionalParam(param) {
    if (!param instanceof OptionalParam)
      throw Error(
        `Invalid parameter class. Argument should be type of OptionalParam, '${param?.constructor?.name} given.'`
      );

    this.optionalParams.push(param);

    return this;
  }

  registerRequiredParam(param) {
    if (!param instanceof RequiredParam)
      throw Error(
        `Invalid parameter class. Argument should be type of RequiredParam, '${param?.constructor?.name} given.'`
      );

    this.requiredParams.push(param);

    return this;
  }

  registerResponseParam(param) {
    if (!param instanceof ResponseParam)
      throw Error(
        `Invalid parameter class. Argument should be type of ResponseParam, '${param?.constructor?.name} given.'`
      );

    this.responseParams.push(param);

    return this;
  }

  registerUpdateParam(param) {
    if (!param instanceof UpdateParam)
      throw Error(
        `Invalid parameter class. Argument should be type of UpdateParam, '${param?.constructor?.name} given.'`
      );

    this.updateParams.push(param);

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

class OptionalParam {
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

class RequiredParam {
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

class UpdateParam {
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

class ResponseParam {
  constructor(paramName) {
    this.paramName = paramName;
  }
}

module.exports = {
  TestFactory,
  OptionalParam,
  RequiredParam,
  ResponseParam,
  UpdateParam,
};
