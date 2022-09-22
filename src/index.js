const express = require("express");
const app = express();
const router = require("./router");

// db connection
const MongooseConfig = require("./config/MongooseConfig");
const mongoose = new MongooseConfig();
mongoose.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("morgan")("dev"));
app.use("/api/v1", router);

module.exports = {
  app,
};
