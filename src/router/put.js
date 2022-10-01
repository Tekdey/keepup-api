const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const { body: validator } = require("../service/validation/validator");
const { user } = require("../service/validation/schema");

router.param("id", param.id);
router.put("/user/:id/update", validator(user.update), controller.user.update);
router.put(
  "/user/:id/add/sport",
  //   validator(user.update),
  controller.user.addSport
);
router.put(
  "/event/:id/update",
  //   validator(event.update),
  controller.event.update
);
router.put(
  "/event/:id/add/participant/:user",
  //   validator(event.update),
  controller.event.addUser
);

module.exports = router;
