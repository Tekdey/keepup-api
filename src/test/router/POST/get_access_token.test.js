const request = require("supertest");

const { app } = require("../../../app.js");

const token = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2FhMWFlOWM1ZDcwMzMzZmNkMDQwOCIsImlhdCI6MTY2NDc4Njg2MiwiZXhwIjoxNjY1MzkxNjYyfQ._DLPbE3ROdCOYZyYjOB3uxJLHy_KATaK1EWV4-vdmxk",
};

describe("POST /auth/token", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .post("/api/v1/auth/token")
      .send(token)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with key access token", function (done) {
    request(app)
      .post("/api/v1/auth/token")
      .send(token)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).access).toBeDefined();
        return done();
      });
  });
});
