const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");
const jwt = require("../helper/jwt");

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
      console.log(user);
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

  async getUser(req, res, next) {
    try {
      const user = await datamapper.user.findOne({ _id: req.params.id });

      if (!user) {
        createError(401, "this user doesn not exist");
      }

      return res.status(200).json({ user: user });
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
