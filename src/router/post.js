const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const validator = require("../service/validation/validator");
const schema = require("../service/validation/schema");
const { confirmChangePassword } = require("../middleware");

// Defining the router param with its value
router.param("collection", param.collection);
// Dynamic controller
router.post(
  "/create/:collection",
  validator.create(schema.create),
  dynamicController(controller)
);

router.post(
  "/auth/login",
  validator.login(schema.login),
  controller.user.login
);

router.post("/auth/token", validator.body(schema.token), controller.user.token);

router.post(
  "/auth/password/:id/confirm",
  confirmChangePassword,
  controller.user.confirmPassword
);

router.post(
  "/events",
  validator.search(schema.search),
  controller.event.findEvents
);

module.exports = router;
