const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const event_id = "633490ebf0805bc06edcbfe5";

describe("GET /event/:id", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .get("/api/v1/event/" + event_id)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with the same _id", function (done) {
    request(app)
      .get("/api/v1/event/" + event_id)
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text)._id).toBe(event_id);
        return done();
      });
  });

  it("find user with the wrong id should return an error", function (done) {
    request(app)
      .get("/api/v1/event/" + "r4nd0m1D")
      .set("Accept", "application/json")
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(500);
        return done();
      });
  });
});
