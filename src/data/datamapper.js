const { createError } = require("../helper/error/handler");
const { User } = require("../schema");
const jwt = require("../helper/jwt");

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

      await newUser.setPassword(user.password);
      delete user.password;

      newUser.save();
      return newUser;
    },
  },
};
