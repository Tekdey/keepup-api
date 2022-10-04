const router = require("express").Router();
const { message } = require("../controller");

router.delete("/message/:id/delete", message.deleteMessageById);

module.exports = router;
