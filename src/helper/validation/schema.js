const Joi = require("joi");

let sports = Joi.object().keys({
  level: Joi.string(),
  sport: Joi.string(),
});

module.exports = {
  create: {
    user() {
      return Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        handicap: Joi.boolean().required(),
        gender: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        image_url: Joi.string(),
        dob: Joi.string().required(),
        description: Joi.string(),
        sports: Joi.array().items(sports),
        city: Joi.string().required(),
        zipcode: Joi.number().required(),
        longitude: Joi.string(),
        latitude: Joi.string(),
      })
        .required()
        .min(8)
        .max(14);
    },
    event() {
      return Joi.object({
        name: Joi.string().required(),
        sport: Joi.string().required(),
        level: Joi.string(),
        gender: Joi.string(),
        handicap: Joi.boolean(),
        max: Joi.number(),
        date: Joi.date().required(),
        // messages: Joi.array(),
        admin: Joi.string().required(),
        // participant: Joi.string(),
        country: Joi.string(),
        city: Joi.string().required(),
        zipcode: Joi.boolean().required(),
        longitude: Joi.string(),
        latitude: Joi.string(),
      })
        .required()
        .min(6)
        .max(15);
    },
  },
};
