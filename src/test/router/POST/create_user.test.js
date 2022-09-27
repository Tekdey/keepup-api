const request = require("supertest");
const assert = require("assert");
const express = require("express");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const user = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    handicap: faker.datatype.boolean(),
    gender: "Homme",
    email: faker.internet.email(),
    password: "password123",
    dob: "06/03/2000",
    sports: [
      {
        level: "Expert",
        sport: "63315cc303beff9752dd8e45",
      },
    ],
    city: faker.address.cityName(),
    zipcode: 30000,
  };
};

describe("POST /create/:collection", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .post("/api/v1/create/user")
      .send(user())
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with key access and refresh", function (done) {
    request(app)
      .post("/api/v1/create/user")
      .send(user())
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(JSON.parse(res.text).access).toBeDefined();
        expect(JSON.parse(res.text).refresh).toBeDefined();
        return done();
      });
  });

  it("post json without required fields and should return an error", function (done) {
    const newUser = {
      sports: [
        {
          level: "Expert",
          sport: "63315cc303beff9752dd8e45",
        },
      ],
    };
    request(app)
      .post("/api/v1/create/user")
      .send(newUser)
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
      .post("/api/v1/create/user")
      .send(user())
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
