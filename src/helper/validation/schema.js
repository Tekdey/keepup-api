const Joi = require("joi");

let sports = Joi.object().keys({
  level: Joi.string(),
  sport: Joi.string(),
});

module.exports = {
  login() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
      .required()
      .min(2)
      .max(2);
  },
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
      return Joi.object()
        .keys({
          name: Joi.string().required(),
          description: Joi.string().required(),
          sport: Joi.string().required(),
          level: Joi.string(),
          gender: Joi.string(),
          max: Joi.number().integer(),
          date: Joi.string().required(),
          period: Joi.object().keys({ start: Joi.string(), end: Joi.string() }),
          admin: Joi.string().required(),
          country: Joi.string(),
          address: Joi.string().required(),
          city: Joi.string(),
          zipcode: Joi.string(),
          location: Joi.object().keys({
            type: Joi.string(),
            coordinates: Joi.array()
              .items(Joi.number(), Joi.number())
              .required(),
          }),
        })
        .required()
        .min(6)
        .max(15);
    },
  },
  search() {
    return Joi.object()
      .keys({
        sport: Joi.string().allow(null).allow(""),
        level: Joi.string().allow(null).allow(""),
        gender: Joi.string().allow(null).allow(""),
        city: Joi.string().allow(null).allow(""),
        date: Joi.object()
          .keys({ from: Joi.date(), to: Joi.date() })
          .allow(null)
          .allow(""),
        period: Joi.object()
          .keys({ start: Joi.string(), end: Joi.string() })
          .allow(null)
          .allow(""),
        coordinates: Joi.array()
          .items(Joi.number(), Joi.number())
          .allow(null)
          .allow(""),
        location: Joi.object().keys({
          type: Joi.string(),
          coordinates: Joi.array().items(Joi.number(), Joi.number()),
        }),
      })
      .required()
      .min(0)
      .max(11);
  },
  user: {
    update() {
      return Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
        handicap: Joi.boolean(),
        gender: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        image_url: Joi.string(),
        dob: Joi.string(),
        description: Joi.string(),
        // sports: Joi.array().items(sports),
        city: Joi.string(),
        zipcode: Joi.number(),
        // longitude: Joi.string(),
        // latitude: Joi.string(),
      })
        .required()
        .min(0)
        .max(14);
    },
  },
};
