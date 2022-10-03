const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const { body: validator, params } = require("../helper/validation/validator");
const { update } = require("../helper/validation/schema");

router.param("id", param.id);
router.put("/user/:id/update", validator(update.user), controller.user.update);
//? - la route du haut peut aussi update le sport
router.put(
  "/user/:id/add/sport",
  //   validator(user.update),
  controller.user.addSport
);
router.put(
  "/event/:id/update",
  validator(update.event),
  controller.event.update
);
router.put(
  "/event/:id/add/participant/:user",
  params(update.participant, "params"),
  controller.event.addUser
);
router.put(
  "",
  params(update.participant, "params"),
  controller.event.removeUser
);

module.exports = router;
