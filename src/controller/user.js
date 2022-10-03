const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");
const jwt = require("../helper/jwt");
const User = require("../schema/User");
const { sendResetPassword } = require("../service/nodemailer");

module.exports = {
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
  token({ body: { token } }, res, next) {
    // const refresh = jwt.sign({ refresh });
    // console.log(refresh);
    try {
      let access;

      const refresh = jwt.verify({ refresh: token }, (err, user) => {
        if (err) {
          createError(401, "Refresh token n'est pas valide");
        }
        return user;
      });

      if (refresh) {
        console.log(refresh);
        access = jwt.sign({ access: { id: refresh.id } });
      }

      res.status(200).json({ access });
    } catch (error) {
      next(error);
    }
  },
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
  async confirmPassword(
    { body: password, email: req, params: { id: _id } },
    res,
    next
  ) {
    try {
      const user = await datamapper.user.findOne({ _id });

      if (user.email !== req.email) {
        createError(401, "Email ou mot de passe incorrect");
      }
      try {
        const isValid = await user.validatePassword(password.older);

        if (!isValid) {
          createError(401, "Email ou mot de passe incorrect");
        }

        await user.setPassword(password.new);

        await user.save();
      } catch (error) {
        throw error;
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
  test(req, res, next) {
    console.log("pass");
    res.json({
      msg: "Cors work well ???",
    });
  },
};
