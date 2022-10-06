const router = require("express").Router();
const { message, event } = require("../controller");

const { params } = require("../service/validation/validator");
const { update } = require("../service/validation/schema");

router.delete("/message/:id/delete", message.deleteMessageById);
router.delete(
  "/event/:id/remove/participant/:user",
  params(update.participant, "params"),
  event.removeUser
);
module.exports = router;
