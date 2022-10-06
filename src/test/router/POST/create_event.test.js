const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app");

const event = () => {
  return {
    name: faker.name.firstName(),
    sport: "63315d0903beff9752dd8e4b",
    level: "Débutant",
    gender: "Homme",
    max: 30,
    date: "06/03/2000",
    period: {
      start: "1665058293",
      end: "1665663093",
    },
    admin: "6331760ae98d6c76841f590e",
    country: "France",
    address: "2 rue de l'horloge",
    city: faker.address.cityName(),
    zipcode: 30000,
    description: "Ceci est un event cool merci d'y participer",
    location: {
      type: "Point",
      coordinates: [43.836699, 4.360054],
    },
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
      name: null,
      sport: null,
      level: null,
      gender: null,
      max: null,
      date: null,
      period: {
        start: null,
        end: null,
      },
      admin: null,
      country: null,
      address: null,
      city: null,
      zipcode: null,

      location: {
        type: null,
      },
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
