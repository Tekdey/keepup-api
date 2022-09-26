const router = require("express").Router();
const { user } = require("../controller");

router.get("/", user.register);

module.exports = router;
