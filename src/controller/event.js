const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");

module.exports = {
  async create({ body }, res, next) {
    try {
      const event = await datamapper.event.create(body);

      try {
        await event.save();
      } catch (error) {
        return next(error);
      }

      return res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
};
