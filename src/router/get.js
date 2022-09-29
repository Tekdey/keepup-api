const router = require("express").Router();
const { user, activity } = require("../controller");
const controller = require("../controller");

// router.get("/", user.register);
router.get("/signup", user.formSignup);
router.get("/user/:id", user.getOne);

router.get("/sports/", activity.getSports);

module.exports = router;
