const router = require("express").Router();
const { user } = require("../controller");

router.post("/create/", user.register);

module.exports = router;
