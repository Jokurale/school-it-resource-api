const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

const app = require("../src/index");

// ~~ TODO: Integration testing: change user's password
// ~~ TODO: Integration testing: assign student to group
// ~~ TODO: Integration testing: remove student from group
// ~~ TODO: Integration testing: clean up schedule
// ~~ TODO: Integration testing: add lesson to schedule
// ~~ TODO: Integration testing: remove lesson from schedule
// TODO: Integration testing: update personal info

describe("### Integration tests ###", () => {
  // Launch tests here

  changeUserPassword();
  assignStudentToGroup();
  removeStudentFromGroup();
  assignLessonToSchedule();
  removeLessonFromSchedule();
  cleanUpSchedule();
  updatePersonalInfo();
});

// Test cases
function changeUserPassword() {
  describe(`POST /credentials/{credentialId}`, () => {
    it("Changes user's password", (done) => {
      chai
        .request(app)
        .post(`/credentials/${global.mock.student.credential.id}`)
        .send({ password: "P@ssw0rd" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("password");

          done();
        });
    });
  });
}

function assignStudentToGroup() {
  describe(`POST /students/{studentId}/group/{groupId}`, () => {
    it("Assigns student to group", (done) => {
      chai
        .request(app)
        .post(
          `/students/${global.mock.student.student.id}/group/${global.mock.groups[0].id}`
        )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("userId");

          done();
        });
    });
  });
}

function removeStudentFromGroup() {
  describe(`DELETE /students/{studentId}/group/{groupId}`, () => {
    it("Removes student from group", (done) => {
      chai
        .request(app)
        .delete(
          `/students/${global.mock.student.student.id}/group/${global.mock.groups[0].id}`
        )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("userId");

          done();
        });
    });
  });
}

function assignLessonToSchedule() {
  describe(`POST /schedules/{scheduleId}/lessons/{lessonId}`, () => {
    it("Assigns lesson to schedule", (done) => {
      chai
        .request(app)
        .post(
          `/schedules/${global.mock.schedule.id}/lessons/${global.mock.lessons[0].id}`
        )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("groupId");

          done();
        });
    });
  });
}

function removeLessonFromSchedule() {
  describe(`DELETE /schedules/{scheduleId}/lessons/{lessonId}`, () => {
    it("Removes lesson from schedule", (done) => {
      chai
        .request(app)
        .delete(
          `/schedules/${global.mock.schedule.id}/lessons/${global.mock.lessons[0].id}`
        )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("groupId");

          done();
        });
    });
  });
}

function cleanUpSchedule() {
  describe(`DELETE /schedules/{scheduleId}/lessons/{lessonId}`, () => {
    it("Cleans up schedule", (done) => {
      chai
        .request(app)
        .delete(`/schedules/${global.mock.schedule.id}/lessons/all`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property("body");

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.be.an("array");

          done();
        });
    });
  });
}

function updatePersonalInfo() {
  {
    describe(`PUT /personalinfos/{personalInfoId}`, () => {
      it("Updates personal informations", (done) => {
        chai
          .request(app)
          .put(`/personalinfos/${global.mock.student.personalInfo.id}`)
          .send({
            middlename: "TestMiddlename",
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property("body");

            expect(res.body).to.not.have.property("error");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("middlename");
            expect(res.body.middlename).to.be.eq("TestMiddlename");

            done();
          });
      });
    });
  }
}
