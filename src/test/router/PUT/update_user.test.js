const request = require("supertest");
const assert = require("assert");
const express = require("express");
const { faker } = require("@faker-js/faker");

const { app } = require("../../../app.js");

const user = () => {
  return {
    _id: "6331760ae17d6c76841f590e",
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

describe("POST /user/:id/update", function () {
  it("should return a json with status 200", function (done) {
    request(app)
      .post(`/api/v1/user/${user()._id}/update`)
      .send(user())
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should return a json with success status", function (done) {
    request(app)
      .post(`/api/v1/user/${user()._id}/update`)
      .send(user())
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

  it("update an user with an invalid id should return error", function (done) {
    request(app)
      .post(`/api/v1/user/${user()._id}1nv4l1d/update`)
      .send(user())
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

  it("update an user with an valid id but associated at no user, should return error", function (done) {
    request(app)
      .post(`/api/v1/user/6331760ae17d6c76841f595e/update`)
      .send(user())
      .set("Accept", "application/json")
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(403);
        return done();
      });
  });
});
