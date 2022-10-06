const request = require("supertest");
const assert = require("assert");
const express = require("express");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const event_id = "63348fecf0805bc06edcbfdc";
const event = () => {
  return {
    // name: faker.name.firstName(),
    // sport: "63315d0903beff9752dd8e4b",
    // level: "Débutant",
    // gender: "Homme",
    max: 50,
    // date: "06/03/2000",
    // period: {
    //   start: "1665058293",
    //   end: "1665663093",
    // },
    // admin: "6331760ae98d6c76841f590e",
    // country: "France",
    // address: "2 rue de l'horloge",
    // city: faker.address.cityName(),
    // zipcode: 30000,
    // description: "Ceci est un event cool merci d'y participer",
    // location: {
    //   type: "Point",
    //   coordinates: [43.836699, 4.360054],
    // },
  };
};

describe("PUT /event/:id/update", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .put(`/api/v1/event/${event_id}/update`)
      .send(event())
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with success status", function (done) {
    request(app)
      .put(`/api/v1/event/${event_id}/update`)
      .send(event())
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).status).toBe("Success");
        return done();
      });
  });

  it("update an event with an invalid id should return error", function (done) {
    request(app)
      .put(`/api/v1/event/${event_id}1v4l1d3/update`)
      .send(event())
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

  it("update an event with an valid id should return error", function (done) {
    request(app)
      .put(`/api/v1/event/${event_id}/update`)
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
