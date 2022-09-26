const request = require("supertest");
const assert = require("assert");
const express = require("express");

const { app } = require("../../app.js");

describe("GET /provoc404", function () {
  it("should get a 404 status code", function (done) {
    request(app)
      .get("/api/v1/provoc404")
      .set("Accept", "application/json")
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
