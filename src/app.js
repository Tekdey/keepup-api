const express = require("express");
const router = require("./router");
const cors = require("cors");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app, {});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

// require("./helper/swagger/apiDocs")(app);

// db connection
const MongooseConfig = require("./config/MongooseConfig");
const mongoose = new MongooseConfig();
mongoose.connect();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declarations
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("morgan")("dev"));
// api-doc
require("./helper/swagger/apiDocs")(app);
app.use("/api/v1", router);

require("./service/socket").connect(io);

module.exports = {
  app: httpServer,
};
