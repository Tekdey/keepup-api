const router = require("express").Router();
const controller = require("../controller");
const { user: param } = require("../middleware/parameter");

const { body: validator, params } = require("../service/validation/validator");
const { update } = require("../service/validation/schema");

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

module.exports = router;
