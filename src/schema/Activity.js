const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const Activity = new Schema({
  category: {
    type: SchemaTypes.String,
    required: [true, "La category est requise"],
    unique: true,
    lowercase: true,
  },
  name: {
    type: SchemaTypes.String,
    required: [true, "Le nom de l'activité est requise"],
    lowercase: true,
  },
});

module.exports = mongoose.model("activity", Activity, "activity");
