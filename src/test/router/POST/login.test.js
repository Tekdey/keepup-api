const request = require("supertest");

const { app } = require("../../../app.js");

const user = {
  email: "test@test.com",
  password: "password123",
};

describe("POST /auth/login", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .post("/api/v1/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with key access and refresh", function (done) {
    request(app)
      .post("/api/v1/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).access).toBeDefined();
        expect(JSON.parse(res.text).refresh).toBeDefined();
        return done();
      });
  });
});
