const request = require("supertest");
const { app } = require("../../../app.js");

describe("GET /signup", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .get("/api/v1/signup")
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with the key level gender and sport", function (done) {
    request(app)
      .get("/api/v1/signup")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).level).toBeDefined();
        expect(JSON.parse(res.text).gender).toBeDefined();
        expect(JSON.parse(res.text).sports).toBeDefined();
        return done();
      });
  });
});
