const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const user_id = "6331760ae17d6c76841f590e";

describe("GET /user/:id", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .get("/api/v1/user/" + user_id)
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with the same _id", function (done) {
    request(app)
      .get("/api/v1/user/" + user_id)
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
        console.log(res);
        expect(res.status).toBe(403);
        // expect(JSON.parse(res.text).user._id).toBe(user_id);
        return done();
      });
  });

  //   it("post json without required fields and should return an error", function (done) {
  //     const newUser = {
  //       sports: [
  //         {
  //           level: "Expert",
  //           sport: "63315cc303beff9752dd8e45",
  //         },
  //       ],
  //     };
  //     request(app)
  //       .post("/api/v1/create/user")
  //       .send(newUser)
  //       .set("Accept", "application/json")
  //       .expect(401)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         expect(res.status).toBe(401);
  //         return done();
  //       });
  //   });

  //   it("post json with required fields and it should work", function (done) {
  //     request(app)
  //       .post("/api/v1/create/user")
  //       .send(user())
  //       .set("Accept", "application/json")
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) {
  //           return done(err);
  //         }
  //         expect(res.status).toBe(200);
  //         return done();
  //       });
  //   });
});
