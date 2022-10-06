const router = require("express").Router();
const { message, event, user } = require("../controller");

const { params } = require("../service/validation/validator");
const { update } = require("../service/validation/schema");
const { authenticate } = require("../middleware");
/**
 * DELETE /api/v1/message/:id/delete"
 * @summary Route to delete a message
 * @tags Message
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete("/message/:id/delete", authenticate, message.deleteMessageById);

/**
 * DELETE /api/v1/event/:id/remove/participant/:user"
 * @summary Route to remove a participant to an event
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete(
  "/event/:id/remove/participant/:user",
  [authenticate, params(update.participant, "params")],
  event.removeUser
);

/**
 * DELETE /api/v1/event/:id/delete"
 * @summary Route to delete an event by id
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete("/event/:id/delete", authenticate, event.deleteEvent);

/**
 * DELETE /api/v1/user/:id/delete"
 * @summary Route to delete an user by id
 * @tags User
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete("/user/:id/delete", authenticate, user.deleteUser);

module.exports = router;
