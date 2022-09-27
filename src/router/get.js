const router = require("express").Router();
const { user } = require("../controller");
const { activity } = require("../controller");

router.get("/", user.register);
router.get("/user/:id/", user.getUser);
router.get("/sports/", activity.getSports);

module.exports = router;
