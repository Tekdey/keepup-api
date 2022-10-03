const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");

//POUR LE FRONT
// function convertHour(number) {
//   const a = number.toString();
//   const b = ":";
//   const position = 2;
//   return [a.slice(0, position), b, a.slice(position)].join("");
// }

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
  async findEvents({ body }, res, next) {
    try {
      const events = await datamapper.event.find(body);

      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },
  async getOne({ params: { id: _id } }, res, next) {
    try {
      const event = await datamapper.event.findOne(_id);

      return res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  async update({ body, params: { id: _id } }, res, next) {
    try {
      const { matchedCount } = await datamapper.event.updateOne(
        { _id },
        { ...body }
      );

      if (!matchedCount) {
        createError(403, "Event not found");
      }

      res
        .status(200)
        .json({ status: "Success", message: "Votre event a été modifié" });
    } catch (error) {
      next(error);
    }
  },
  async addUser({ params: { id: _id, user: user } }, res, next) {
    try {
      const event = await datamapper.event.addUser({ _id }, user);

      if (!event) {
        createError(403, "Event not found");
      }

      res.status(200).json({
        status: "Success",
        message: "Le participant à été ajouté",
        event: event,
      });
    } catch (error) {
      next(error);
    }
  },
  async removeUser({ params: { id: _id, user: user } }, res, next) {
    try {
      const event = await datamapper.event.removeUser({ _id }, user);

      if (!event) {
        createError(403, "Event not found");
      }

      res.status(200).json({
        status: "Success",
        message: "Le participant à été retiré",
        event: event,
      });
    } catch (error) {
      next(error);
    }
  },
};
