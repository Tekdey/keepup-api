const router = require("express").Router();
const { user } = require("../controller");

router.post("/", user.hello);

module.exports = router;
