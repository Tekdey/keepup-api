const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");

// Defining the router param with its value
router.param("collection", param.collection);
// Dynamic controller
router.post("/create/:collection", dynamicController(controller));

module.exports = router;
