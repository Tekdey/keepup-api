const request = require("supertest");
const { faker } = require("@faker-js/faker");
const ObjectId = require("mongoose").Types.ObjectId;
const { app } = require("../../../app.js");

const user_id = "633e81c6db50460c7b4eacd0";

describe("GET /user/:id/view", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .get("/api/v1/user/" + user_id + "/view")
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with the same _id", function (done) {
    request(app)
      .get("/api/v1/user/" + user_id + "/view")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).user._id).toBe(user_id);
        return done();
      });
  });

  it("find user with the wrong id should return an error", function (done) {
    request(app)
      .get("/api/v1/user/" + "r4nd0m1D")
      .set("Accept", "application/json")
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(403);
        return done();
      });
  });

  it("find user without populate should return sport object without populate", function (done) {
    request(app)
      .get("/api/v1/user/" + user_id + "/view")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(
          ObjectId.isValid(JSON.parse(res.text).user.sports[0].sport)
        ).toBe(true);
        return done();
      });
  });
});
