const router = require("express").Router();
const { user } = require("../controller");

router.get("/", user.register);
router.get("/user/:id/", user.getUser);

module.exports = router;
