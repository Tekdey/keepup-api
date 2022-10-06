const request = require("supertest");

const { app } = require("../../../app.js");

const user_id = "633e81c6db50460c7b4eacd0";
const sports = () => {
  return {
    sports: [
      {
        level: "Expert",
        sport: "63315d0903beff9752dd8e4b",
      },
      {
        level: "Intermediaire",
        sport: "63315d5b03beff9752dd8e54",
      },
    ],
  };
};

describe("PUT /user/:id/add/sport", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .put(`/api/v1/user/${user_id}/add/sport`)
      .send(sports())
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("add a sport with an invalid user id should return error", function (done) {
    request(app)
      .put(`/api/v1/user/${user_id}1nv4l1d/update`)
      .send(sports())
      .set("Accept", "application/json")
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(401);
        return done();
      });
  });
});
