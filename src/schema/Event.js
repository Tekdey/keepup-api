const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const Event = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  sport: {
    type: SchemaTypes.ObjectId,
    ref: "activity",
    required: [true, "Le sport est requis"],
  },
  level: {
    type: SchemaTypes.String,
    enum: {
      values: ["Débutant", "Intermediaire", "Expert"],
      message: `Le level '{VALUE}' n'est pas autorisé`,
    },
  },
  gender: {
    type: SchemaTypes.String,
    default: "Non précisé",
    enum: {
      values: ["Homme", "Femme", "Non binaire", "Non précisé"],
      message: `La clé '{VALUE}' n'est pas autorisé`,
    },
  },
  max: {
    type: SchemaTypes.Number,
    min: [0, "Le nombre de participant ne peut pas être inférieurs a {VALUE}"],
    max: [
      100,
      "Le nombre de participant ne peut pas être supérieurs a {VALUE}",
    ],
  },
  date: {
    type: SchemaTypes.Date,
    required: true,
  },
  period: {
    start: { type: SchemaTypes.Number, required: true },
    end: { type: SchemaTypes.Number, required: true },
  },
  messages: [
    {
      type: SchemaTypes.ObjectId,
      ref: "message",
    },
  ],
  admin: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  participant: [
    {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  ],
  country: {
    type: SchemaTypes.String,
    default: "France",
    required: true,
  },
  address: {
    type: SchemaTypes.String,
    required: true,
  },
  city: {
    type: SchemaTypes.String,
    required: true,
  },
  zipcode: {
    type: SchemaTypes.Number,
    required: true,
  },
  location: {
    type: { type: SchemaTypes.String, enum: ["Point"], required: true },
    coordinates: { type: [SchemaTypes.Number], required: true },
  },
  description: {
    type: SchemaTypes.String,
  },
  created_at: {
    type: SchemaTypes.Date,
  },
});

Event.index({ location: 1, city: 1, zipcode: 1, date: 1, sport: 1, level: 1 });

Event.pre("save", function (next) {
  this.created_at = Date.now();
  next();
});

module.exports = mongoose.model("event", Event, "event");
