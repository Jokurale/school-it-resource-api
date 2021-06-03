const app = require("../src");

const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

process.env.NODE_ENV = "testing";

chai.use(chaiHttp);

let tempSubjectId;

describe("# Subject Module", () => {
  describe("GET /subjects", () => {
    it("Receives list of all subjects", (done) => {
      chai
        .request(app)
        .get("/subjects")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("name");

          const [{ id }] = res.body;
          tempSubjectId = id;

          done();
        });
    });
  });

  describe("GET /subjects/{id}", () => {
    it("Receives particular subject with given ID", (done) => {
      chai
        .request(app)
        .get(`/subjects/${tempSubjectId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          done();
        });
    });

    it("Receives null when provieded ID is invalid ", (done) => {
      chai
        .request(app)
        .get(`/subjects/${tempSubjectId}TEST`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.be.null;

          done();
        });
    });
  });

  describe("POST /subjects", () => {
    it("Receives newly created subject when 'name' is valid", (done) => {
      chai
        .request(app)
        .post(`/subjects`)
        .send({ name: "New subject, test name" })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          const { id } = res.body;
          tempSubjectId = id;

          done();
        });
    });

    it("Receives error when 'name' is not supplied", (done) => {
      chai
        .request(app)
        .post(`/subjects`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.have.property("error");
          expect(res.body).to.be.an("object");

          done();
        });
    });
  });

  describe("PUT /subjects/{id}", () => {
    it("Receives the same object when no 'name' is supplied", (done) => {
      chai
        .request(app)
        .put(`/subjects/${tempSubjectId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          done();
        });
    });

    it("Receives updated subject when valid 'name' is supplied ", (done) => {
      chai
        .request(app)
        .put(`/subjects/${tempSubjectId}`)
        .send({ name: "New test name" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          expect(res.body.name).to.be.equal("New test name");

          done();
        });
    });
  });

  describe("DELETE /subjects/{id}", () => {
    it("Receives error when invalid ID is supplied", (done) => {
      chai
        .request(app)
        .delete(`/subjects/${tempSubjectId}TEST`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property("body");
          expect(res.body).to.have.property("error");
          expect(res.body).to.be.an("object");

          done();
        });
    });

    it("Receives the same object when valid ID is supplied", (done) => {
      chai
        .request(app)
        .delete(`/subjects/${tempSubjectId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");
          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          done();
        });
    });
  });
});
