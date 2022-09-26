const router = require("express").Router();
const { user } = require("../controller");
const { user: param } = require("../middleware/parameter");

// Defining the router param with its value
router.param("collection", param.collection);
router.post("/create/user", user.create);

module.exports = router;
