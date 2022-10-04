const datamapper = require("../data/datamapper");
const express = require("express");
const { createError } = require("../helper/error/handler");
const jwt = require("../helper/jwt");
const User = require("../schema/User");

module.exports = {
  /**
   * User controller to create a record.
   * ExpressMiddleware signature
   * @param {express.Request.body} body Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async create({ body }, res, next) {
    try {
      const exists = await datamapper.user.findOne({ email: body.email });
      if (exists) {
        createError(401, "Email already taken");
      }
      const user = await datamapper.user.create(body);

      try {
        await user.save();
      } catch (error) {
        return next(error);
      }

      const access = jwt.sign({ access: { id: user._id } });
      const refresh = jwt.sign({ refresh: { id: user._id } });

      return res.status(200).json({ access, refresh });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Event controller to log a user.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async login(req, res, next) {
    let access = "";
    let refresh = "";
    const body = req.body;

    try {
      const user = await datamapper.user.findOne({ email: body.email });
      if (!user) {
        createError(401, "Email or password incorrect");
      }
      if (await user.validatePassword(body.password)) {
        access = jwt.sign({ access: { email: user._id } });
        refresh = jwt.sign({ refresh: { email: user._id } });
      } else {
        createError(401, "Email or password incorrect");
      }

      return res.status(200).json({ access, refresh });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to get a record.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async getOne(req, res, next) {
    try {
      const user = await datamapper.user.findOne({ _id: req.params.id });

      if (!user._id) {
        next(createError(403, "This user does not exist"));
      }

      return res.status(200).json({ user: user });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to get a custom record.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async getView(req, res, next) {
    try {
      const user = await datamapper.user.getUserView({ _id: req.params.id });

      if (!user._id) {
        next(createError(403, "This user does not exist"));
      }

      return res.status(200).json({ user: user });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to get a custom record.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async formSignup(req, res, next) {
    try {
      const sports = await datamapper.activity.findAll(
        {},
        { sport: 1, _id: 1 }
      );
      if (!sports) {
        createError(403, "No sports found");
      }

      const level = User.schema.path("sports.level").enumValues;
      const gender = User.schema.path("gender").enumValues;

      return res.status(200).json({ level, gender, sports });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to update a record.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async update({ body, params: { id: _id } }, res, next) {
    try {
      const { matchedCount } = await datamapper.user.updateOne(
        { _id },
        { ...body }
      );

      if (!matchedCount) {
        createError(403, "User not found");
      }

      res
        .status(200)
        .json({ status: "Success", message: "Votre profil a été modifié" });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller add a sport o get a record.
   * ExpressMiddleware signature
   * @param {express.request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async addSport({ body: sport, params: { id: _id } }, res, next) {
    try {
      const { matchedCount } = await datamapper.user.addSport(
        { _id },
        {
          sports: { $push: sport },
        }
      );

      if (!matchedCount) {
        createError(403, "User not found");
      }

      res
        .status(200)
        .json({ status: "Success", message: "Vos sports ont été modifié" });
    } catch (error) {
      next(error);
    }
  },
};

// 	"firstname":"Lorem",
// 	"lastname":"Ipsum",
// 	"handicap":true,
// 	"gender": "Homme",
// 	"email":"test@gmail.com",
// 	"password":"password123",
// 	"dob": "06/03/2000",
// 	"sports": [{
// 		"level": "Expert",
// 		"sport": "63315cc303beff9752dd8e45"
// 	}],
// 	"city": "Nimes",
// 	"zipcode":30000
// }
