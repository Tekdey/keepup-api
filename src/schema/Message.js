const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const Message = new Schema({
  sender: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "ID de l'envoyeur doit être définit"],
  },
  receiver: {
    type: SchemaTypes.ObjectId,
    ref: "event",
    required: [true, "ID du receveur doit être définit"],
  },
  content: {
    type: SchemaTypes.String,
    // minlength: 1,
    // maxlength: 250,
  },
  created_at: {
    type: SchemaTypes.Date,
  },
});

Message.index({ receiver: 1 });

Message.pre("save", function (next) {
  this.created_at = Date.now();
  next();
});

module.exports = mongoose.model("message", Message, "message");
