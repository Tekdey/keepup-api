const request = require("supertest");
const { app } = require("../../../app.js");
//

const email = "keepup.oclock@gmail.com";

describe("GET /auth/password/:email", function () {
  it("should return an status 200", function (done) {
    request(app)
      .get("/api/v1/auth/password/" + email)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
