const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");
const { User } = require("../schema");

module.exports = {
  async getSports(req, res, next) {
    try {
      const sports = await datamapper.activity.findAll();
      if (!sports) {
        createError(401, "no sports found");
      }
      const level = User.schema.path("sports.level").enumValues;

      return res.status(200).json({ sports: sports, level: level });
    } catch (error) {
      next(error);
    }
  },
};
