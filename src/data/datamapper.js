const { createError } = require("../helper/error/handler");
const { User, Message } = require("../schema");
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
    async getUserView(id) {
      if (!id) {
        throw error;
      }
      console.log(id);

      try {
        return await User.findOne(id, {
          _id: 1,
          image_url: 1,
          firstname: 1,
          city: 1,
          gender: 1,
          dob: 1,
          sports: 1,
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
      event.period.start = parseInt(event.period.start.replace(/:/g, ""));
      event.period.end = parseInt(event.period.end.replace(/:/g, ""));
      const newEvent = new Event(event);

      return newEvent;
    },
    async updateOne(event, newInfo) {
      if (!event) {
        throw error;
      }

      return await Event.updateOne(event, newInfo);
    },
    async addUser(event, user) {
      if (!event) {
        throw error;
      }
      console.log(user);
      const result = await Event.updateOne(
        { _id: "633490ebf0805bc06edcbfe5" },
        {
          $push: { participant: "6331760ae17d6c76841f590e" },
        }
      );

      console.log(result);

      return result;
    },
    async findOne(id) {
      if (!id) {
        throw error;
      }
      return Event.findOne({ _id: id }).populate({
        path: "participant",
        select: "_id  image_url firstname  gender dob city sports",
      });
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
      return await Event.find(query).populate({
        path: "participant",
        select: "_id  image_url firstname",
      });
    },
  },
  activity: {
    async findAll() {
      return await Activity.find();
    },
  },
  activity: {
    async findAll(filter, sort) {
      return await Activity.find(filter, sort).lean();
    },
  },
  message: {
    async getMessagesByEvent(id) {
      return await Event.findOne({ _id: id }).populate({
        path: "messages",
        select: "messages",
      });
    },
    async insert(obj) {
      const message = Message(obj);

      return message;
    },
  },
};
