const router = require("express").Router();
const { user, activity, event } = require("../controller");
const controller = require("../controller");

// router.get("/", user.register);
router.get("/signup", user.formSignup);
router.get("/user/:id", user.getOne);
router.get("/user/:id/view", user.getView);

router.get("/event/:id", event.getOne);

router.get("/sports/", activity.getSports);

router.get("/test", user.test);

module.exports = router;
