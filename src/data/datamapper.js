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

      try {
        return await User.findOne({
          [searchKey]: Object.values(obj)[0],
        }).populate({
          path: "sports.sport",
        });
      } catch (error) {
        return error;
      }
    },

    async create(user) {
      if (!user) {
        throw error;
      }
      const newUser = User(user);

      return newUser;
    },

    async updateOne(user, newInfo) {
      if (!user) {
        throw error;
      }

      return await User.updateOne(user, newInfo);
    },

    async addSport(user, { sports }) {
      if (!user) {
        throw error;
      }

      // console.log(sports);

      return await User.updateOne(user, sports);
    },
  },
  event: {
    async create(event) {
      if (!event) {
        throw error;
      }

      const newEvent = new Event(event);

      return newEvent;
    },

    async find(body) {
      let query = {};
      if (typeof body !== "object" && Object.keys(body).length !== 0) {
        throw error;
      }
      if (body.sport) {
        query.sport = [body.sport];
      }
      if (body.level) {
        query.level = [body.level];
      }
      if (body.genre) {
        query.genre = [body.genre];
      }
      if (body.date) {
        query.date = { $gte: body.date.from, $lt: body.date.to };
      }
      if (body.period) {
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
      return Event(event);
    },
  },
  activity: {
    async findAll(filter, sort) {
      return await Activity.find(filter, sort).lean();
    },
  },
};
