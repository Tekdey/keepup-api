const express = require("express");
const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");
const { User } = require("../schema");

module.exports = {
  /**
   * Activity controller to get all records.
   * ExpressMiddleware signature
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
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
