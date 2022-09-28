const { createError } = require("../helper/error/handler");
const { User } = require("../schema");
const { Activity } = require("../schema");
const { Event } = require("../schema");

module.exports = {
  user: {
    async findOne(obj) {
      if (!obj) {
        throw error;
      }
      const searchKey = Object.keys(obj)[0];

      return await User.findOne({ [searchKey]: Object.values(obj)[0] });
    },

    async create(user) {
      if (!user) {
        throw error;
      }
      const newUser = User(user);

      return newUser;
    },
  },
  event: {
    async create(event) {
      if (!event) {
        throw error;
      }

      event.period.start = parseInt(event.period.start.replace(/:/g, ""));
      event.period.end = parseInt(event.period.end.replace(/:/g, ""));

      const newEvent = new Event(event);

      return newEvent;
    },

    async find(body) {
      let query = {};
      if (typeof body !== "object" && Object.keys(body).length !== 0) {
        throw error;
      }
      if (body.sport !== null) {
        query.sport = [body.sport];
      }
      if (body.level !== null) {
        query.level = [body.level];
      }
      if (body.genre !== null) {
        query.genre = [body.genre];
      }
      if (body.date !== null) {
        query.date = { $gte: body.date.from, $lt: body.date.to };
      }
      if (body.period !== null) {
        const start = parseInt(body.period.start.replace(/:/g, ""));
        const end = parseInt(body.period.end.replace(/:/g, ""));
        query["period.start"] = { $gte: start, $lt: end };
      }
      if (body.location.coordinates.length !== 0) {
        query.location = {
          $near: { $geometry: body.location, $maxDistance: 10000 },
        };
      }
      return await Event.find(query);
    },
  },
  activity: {
    async findAll() {
      return await Activity.find();
    },
  },
};
