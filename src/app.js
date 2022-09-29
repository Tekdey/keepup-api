const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
// db connection
const MongooseConfig = require("./config/MongooseConfig");
const mongoose = new MongooseConfig();
mongoose.connect();

const corsOptions = {
  origin: ["*", "http://localhost:3000"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(require("morgan")("dev"));
app.use("/api/v1", router);

module.exports = {
  app,
};
