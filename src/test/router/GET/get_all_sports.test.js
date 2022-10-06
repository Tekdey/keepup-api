const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const event_id = "633490ebf0805bc06edcbfe5";

describe("GET /sports", function () {
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

  it("should return a json with the key 'sports' and 'level'", function (done) {
    request(app)
      .get("/api/v1/sports")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(
          Object.keys(JSON.parse(res.text))
            .toString()
            .includes(["sports", "level"])
        ).toBe(true);
        return done();
      });
  });
});
