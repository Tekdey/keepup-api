const request = require("supertest");

const { app } = require("../../../app.js");

const event_id = "63348fecf0805bc06edcbfdc";
const user_id = "633e81c6db50460c7b4eacd0";

describe("DELETE /event/:id/remove/participant/:user", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .delete(`/api/v1/event/${event_id}/remove/participant/${user_id}`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
