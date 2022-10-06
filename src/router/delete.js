const router = require("express").Router();
const { message } = require("../controller");

/**
 * DELETE /api/v1/message/:id/delete"
 * @summary Route to delete a message
 * @tags Message
 * @return {object} 200 - success response - application/json
 * @return {string} 400 - Bad request
 */
router.delete("/message/:id/delete", message.deleteMessageById);

module.exports = router;
