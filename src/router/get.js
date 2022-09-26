const router = require("express").Router();
const { user } = require("../controller");
const { authenticate } = require("../middleware");

router.get("/hello", authenticate, user.hello);

module.exports = router;
