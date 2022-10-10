const datamapper = require("../data/datamapper");
const express = require("express");
const { createError } = require("../helper/error/handler");
const jwt = require("../helper/jwt");
const User = require("../schema/User");
const { sendResetPassword } = require("../service/nodemailer");

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

      const access = jwt.sign({
        access: { _id: user._id, firstname: user.firstname },
      });
      const refresh = jwt.sign({
        refresh: { _id: user._id, firstname: user.firstname },
      });

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
  async login({ body }, res, next) {
    let access;
    let refresh;

    try {
      const user = await datamapper.user.findOne({ email: body.email });
      if (!user) {
        createError(401, "Email or password incorrect");
      }
      if (await user.validatePassword(body.password)) {
        access = jwt.sign({
          access: { _id: user._id, firstname: user.firstname },
        });
        refresh = jwt.sign({
          refresh: { _id: user._id, firstname: user.firstname },
        });
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
      const user = await datamapper.user.updateOne({ _id }, { ...body });
      console.log("pass");
      // if (!matchedCount) {
      //   createError(403, "User not found");
      // }
      console.log(user);
      res.status(200).json({ status: "Success", user });
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

  /**
   * User controller to verify a token.
   * ExpressMiddleware signature
   * @param {express.request.body.token} token Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  token({ body: { token } }, res, next) {
    try {
      let access;
      const refresh = jwt.verify({ refresh: token }, (err, user) => {
        if (err) {
          console.log(err.message);
          createError("JWT_REFRESH", err.message);
        }

        return user;
      });

      if (refresh) {
        access = jwt.sign({ access: { id: refresh.id } });
      }

      res.status(200).json({ access });
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to reset a password.
   * ExpressMiddleware signature
   * @param {express.request.params.email} email Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async forgetPassword({ params: { email } }, res, next) {
    try {
      const user = await datamapper.user.findOne({ email });

      if (!user) {
        createError(403, "Veuillez réessayer ulterieurement");
      } else {
        const token = jwt.sign({ token: { email } });
        sendResetPassword({ receiver: user.email, id: user._id, token });
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },

  /**
   * User controller to confirm password.
   * ExpressMiddleware signature
   * @param {express.request.body} password Express request object
   * @param {express.request.email} req Express request object
   * @param {express.request.params.id} email Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async confirmPassword({ body, email: req, params: { id: _id } }, res, next) {
    try {
      const user = await datamapper.user.findOne({ _id });

      if (user.email !== req.email) {
        createError(401, "Email ou mot de passe incorrect");
      }
      try {
        if (body.password !== body.confirm) {
          createError(401, "Les mot de passe ne sont pas identiques");
        }

        await user.setPassword(body.password);

        await user.save();
      } catch (error) {
        throw error;
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
  /**
   * User controller to remove a user by his id.
   * ExpressMiddleware signature
   * @param {express.Request.params} params Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next function
   * @returns Route API JSON response
   */
  async deleteUser({ params: { id } }, res, next) {
    try {
      const event = await datamapper.user.deleteOne(id);

      if (!event) {
        createError(403, "Aucun utilisateur a supprimer");
      }

      res
        .status(200)
        .json({ status: "Success", message: "L'utilisateur a été supprimé" });
    } catch (error) {
      next(error);
    }
  },
};
