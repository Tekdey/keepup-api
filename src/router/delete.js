const router = require("express").Router();
const { message, event } = require("../controller");

const { params } = require("../service/validation/validator");
const { update } = require("../service/validation/schema");

/**
 * DELETE /api/v1/message/:id/delete"
 * @summary Route to delete a message
 * @tags Message
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete("/message/:id/delete", message.deleteMessageById);

/**
 * DELETE /api/v1/event/:id/remove/participant/:user"
 * @summary Route to remove a participant to an event
 * @tags Event
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.put(
  "/event/:id/remove/participant/:user",
  params(update.participant, "params"),
  event.removeUser
);

module.exports = router;
