const router = require("express").Router();
const { user } = require("../controller");

router.get("/", user.hello);

module.exports = router;
