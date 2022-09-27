const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const validator = require("../helper/validation/validator");
const schema = require("../helper/validation/schema");

// Defining the router param with its value
router.param("collection", param.collection);
// Dynamic controller
router.post(
  "/create/:collection",
  validator.create(schema.create),
  dynamicController(controller)
);

router.post("/auth/login", controller.user.login);

module.exports = router;
