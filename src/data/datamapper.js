const { createError } = require("../helper/error/handler");
const { User } = require("../schema");
const { Activity } = require("../schema");
const jwt = require("../helper/jwt");

module.exports = {
  user: {
    async findOne(obj) {
      if (!obj) {
        throw error;
      }
      const searchKey = Object.keys(obj)[0];

      try {
        return await User.findOne({ [searchKey]: Object.values(obj)[0] });
      } catch (error) {
        return error;
      }
    },

    async create(user) {
      if (!user) {
        throw error;
      }

      const newUser = User(user);

      await newUser.setPassword(user.password);
      delete user.password;

      return newUser;
    },
  },
  event: {
    async create(event) {
      if (!event) {
        throw error;
      }

      return Event(event);
    },
  },
  activity: {
    async findAll(filter, sort) {
      return await Activity.find(filter, sort).lean();
    },
  },
};
