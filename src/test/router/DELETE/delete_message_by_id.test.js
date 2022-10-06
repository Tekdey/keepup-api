const request = require("supertest");

const { app } = require("../../../app.js");

const message_id = "633c237cd259add045be3fb1";

describe("DELETE /message/:id/delete", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .delete(`/api/v1/message/${message_id}/delete`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
