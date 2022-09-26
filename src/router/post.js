const router = require("express").Router();
const { user } = require("../controller");

router.post("/create/", user.register);

router.post("/login/", user.login);

module.exports = router;
