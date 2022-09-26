const { createError } = require("../helper/error/handler");
const { User } = require("../schema");
const jwt = require("../helper/jwt");

module.exports = {
  user: {
    async findOne(email) {
      try {
        if (!email) {
          throw error;
        }

        return await User.findOne({ email });
      } catch (error) {
        throw error;
      }
    },
    async create(user) {
      try {
        if (!user) {
          throw error;
        }

        const newUser = User(user);

        await newUser.setPassword(user.password);
        delete user.password;

        newUser.save();
        return newUser;
      } catch (error) {
        throw error;
      }
    },
  },
};
