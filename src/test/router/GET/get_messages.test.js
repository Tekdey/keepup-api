const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const event_id = "63348fecf0805bc06edcbfdc";

describe("GET /event/:id/chat", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .get("/api/v1/event/" + event_id + "/chat")
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with the message key", function (done) {
    request(app)
      .get("/api/v1/event/" + event_id + "/chat")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(Object.keys(JSON.parse(res.text)).toString()).toBe("messages");
        return done();
      });
  });

  it("find an event with the wrong id should return an error", function (done) {
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
