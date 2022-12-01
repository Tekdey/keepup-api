const express = require("express");
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
  /**
   * Event controller to create a record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async create({ body }, res, next) {
    try {
      const event = await datamapper.event.create(body);
      console.log(event);
      try {
        await event.save();
      } catch (error) {
        console.log("______________");
        console.log(error);
        console.log("______________");
        return next(error);
      }
      console.log("----------======----------");
      console.log(event);
      return res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Event controller to get records.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async findEvents({ body }, res, next) {
    try {
      console.log(body);
      const events = await datamapper.event.find(body);
      console.log(events);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Event controller to get a record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async getOne({ params: { id: _id } }, res, next) {
    try {
      const event = await datamapper.event.findOne(_id);
      if (!event) {
        createError(403, "Event not found");
      }
      return res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Event controller to update a record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
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

  /**
   * Event controller to add a user to a record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async addUser({ params: { id: _id, user: user } }, res, next) {
    try {
      const event = await datamapper.event.addUser({ _id }, user);

      if (!event) {
        createError(403, "Event not found");
      }

      res.status(200).json({
        status: "Success",
        message: "Le participant à été ajouté",
        // event: event,
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * Event controller to remove a user from record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async removeUser({ params: { id: _id, user: user } }, res, next) {
    try {
      const event = await datamapper.event.removeUser({ _id }, user);

      if (!event) {
        createError(403, "Event not found");
      }

      res.status(200).json({
        status: "Success",
        message: "Le participant à été retiré",
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * Event controller to remove a event by his id.
   * ExpressMiddleware signature
   * @param {express.Request.params} params Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async deleteEvent({ params: { id } }, res, next) {
    try {
      const event = await datamapper.event.deleteOne(id);

      if (!event) {
        createError(403, "Aucun event a supprimer");
      }

      res
        .status(200)
        .json({ status: "Success", message: "L'event a été supprimé" });
    } catch (error) {
      next(error);
    }
  },
  /**
   * Event controller get all event of the user.
   * ExpressMiddleware signature
   * @param {express.Request.params} params Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async findAllEventByUser({ params: { id } }, res, next) {
    try {
      const event = await datamapper.event.findAllEventByUser({ id });

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  async findAllEventCreatedByUser({ params: { id } }, res, next) {
    try {
      const event = await datamapper.event.findAllEventCreatedByUser({ id });

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
};
