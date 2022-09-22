const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const bcrypt = require("bcrypt");

const User = new Schema({
  firstname: {
    type: SchemaTypes.String,
    required: [true, "Le prénom est requis"],
  },
  lastname: {
    type: SchemaTypes.String,
    required: [true, "Le nom de famille est requis"],
  },
  handicap: {
    type: SchemaTypes.Boolean,
    required: [true, "Handicape est requis"],
  },
  gender: {
    type: SchemaTypes.String,
    default: "Non précisé",
    enum: {
      values: ["Homme", "Femme", "Non précisé"],
      message: `La clé '{VALUE}' n'est pas autorisé`,
    },
  },
  email: {
    type: SchemaTypes.String,
    validate: {
      validator: function (email) {
        return /^[a-z0-9.\-_]+@[a-z0-9._-]+$/.test(email);
      },
      message: (props) => {
        return `${props.value} n'est pas un email valide !`;
      },
    },
    unique: true,
    required: [true, "L'email est requis"],
    // index: true,
  },
  password: {
    type: SchemaTypes.String,
    required: [true, "Le mot de passe est requis"],
  },
  image_url: {
    type: SchemaTypes.String,
    default:
      "http://image.noelshack.com/fichiers/2022/38/4/1663838623-default-user-image.png",
  },
  age: {
    //TODO: calculate his age with mongoose middleware
    type: SchemaTypes.Number,
    required: [true, "Veuillez entrer votre age"],
    min: [15, "Il faut avoir minimum 15 ans pour vous inscrire sur Keep'up"],
    max: [100, "Votre age ne doit pas être supérieur a 100 ans"],
  },
  description: {
    type: SchemaTypes.String,
  },
  sports: [
    {
      level: {
        type: SchemaTypes.String,
        required: [true, "Le level est requis"],
      },
      sport: {
        type: SchemaTypes.String,
        required: [true, "Le sport est requis"],
      },
    },
  ],
  city: {
    type: SchemaTypes.String,
    required: [true, "La ville est requise"],
  },
  zipcode: {
    type: SchemaTypes.Number,
    required: [true, "Le code postal est requis"],
  },
  longitude: {
    type: SchemaTypes.Number,
  },
  latitude: {
    type: SchemaTypes.Number,
  },
  updated_at: {
    type: SchemaTypes.Date,
  },
  created_at: {
    type: SchemaTypes.Date,
  },
});

//  Methods

/**
 * Hash user password
 * @param {String} password user password
 */
User.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 12);
};
/**
 * Validate user password
 * @param {String} password user password
 * @returns {Boolean} is valid password or not
 */
User.methods.validatePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

//  Middleware

/**
 * Pre middleware listening on findOneAndUpdate()
 * Update with the current date
 * @param {Function} next Next
 */
User.pre("save", function (next) {
  this.updated_at = Date.now();
  this.created_at = Date.now();
  next();
});

/**
 * Pre middleware listening on findOneAndUpdate()
 * Update with the current date
 * @param {Function} next Next
 */
User.pre("save", function (next) {
  this.updated_at = Date.now();

  next();
});

/**
 * Pre middleware listening on findOneAndUpdate()
 * Update with the current date
 * @param {Function} next Next
 */
User.pre("findOneAndUpdate", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("user", User, "user");
