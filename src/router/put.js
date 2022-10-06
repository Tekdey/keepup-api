const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const { body: validator, params } = require("../service/validation/validator");
const { update } = require("../service/validation/schema");

router.param("id", param.id);

/**
 * PUT /api/v1/user/:id/update"
 * @summary Route to update user'data
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.put("/user/:id/update", validator(update.user), controller.user.update);
//? - la route du haut peut aussi update le sport
router.put(
  "/user/:id/add/sport",
  //   validator(user.update),
  controller.user.addSport
);

/**
 * PUT /api/v1/event/:id/update"
 * @summary Route to update an event's data
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.put(
  "/event/:id/update",
  validator(update.event),
  controller.event.update
);

/**
 * PUT /api/v1/event/:id/add/participant/:user"
 * @summary Route to add a participant to an event
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.put(
  "/event/:id/add/participant/:user",
  params(update.participant, "params"),
  controller.event.addUser
);

/**
 * PUT /api/v1/event/:id/remove/participant/:user"
 * @summary Route to remove a participant to an event
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.put(
  "/event/:id/remove/participant/:user",
  params(update.participant, "params"),
  controller.event.removeUser
);

module.exports = router;
