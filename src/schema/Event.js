const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const Event = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  sport: {
    type: SchemaTypes.String,
    required: true,
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
      values: ["Homme", "Femme", "Non précisé"],
      message: `La clé '{VALUE}' n'est pas autorisé`,
    },
  },
  handicap: {
    type: SchemaTypes.Boolean,
    required: true,
  },
  max: {
    type: SchemaTypes.Number,
    validate: {
      min: [
        0,
        "Le nombre de participant ne peut pas être inférieurs a {VALUE}",
      ],
      max: [
        100,
        "Le nombre de participant ne peut pas être supérieurs a {VALUE}",
      ],
    },
  },
  date: {
    type: SchemaTypes.Date,
    required: true,
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
  city: {
    type: SchemaTypes.String,
    required: true,
  },
  zipcode: {
    type: SchemaTypes.Number,
    required: true,
  },
  longitude: {
    type: SchemaTypes.Number,
  },
  latitude: {
    type: SchemaTypes.Number,
  },
  created_at: {
    type: SchemaTypes.Date,
  },
});

Event.index({ city: 1, zipcode: 1, date: 1, sport: 1, level: 1 });

module.exports = mongoose.model("event", Event, "event");
