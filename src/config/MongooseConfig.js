require("dotenv").config();

class Mongoose {
  constructor() {
    this.mongoose = require("mongoose");
    this.db = this.mongoose.connection;
  }

  connect() {
    //Set up default mongoose connection
    this.mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    //Bind connection to error event (to get notification of connection errors)
    this.db.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );

    return this.db;
  }
}

module.exports = Mongoose;
