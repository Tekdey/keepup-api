const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app");

const event = () => {
  return {
    name: faker.name.firstName(),
    sport: faker.name.lastName(),
    level: faker.word.adverb(),
    gender: "Homme",
    handicap: faker.datatype.boolean(),
    max: 30,
    date: "06/03/2000",
    admin: "admin",
    country: faker.address.country(),
    address: faker.address.streetAddress(),
  };
};

describe("POST /create/:collection", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .post("/api/v1/create/event")
      .send(event())
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("post json without required fields and should return an error", function (done) {
    const newEvent = {
      level: faker.word.adverb(),
      gender: "Homme",
      handicap: faker.datatype.boolean(),
      max: 30,
      country: faker.address.country(),
    };
    request(app)
      .post("/api/v1/create/user")
      .send(newEvent)
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

  it("post json with required fields and it should work", function (done) {
    request(app)
      .post("/api/v1/create/event")
      .send(event())
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        return done();
      });
  });
});
