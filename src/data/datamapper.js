const { createError } = require("../helper/error/handler");
const { User } = require("../schema");
const { Activity } = require("../schema");
const jwt = require("../helper/jwt");
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
      const newEvent = new Event(event);

      return newEvent;
    },
  },
  activity: {
    async findAll() {
      return await Activity.find();
    },
  },
};
