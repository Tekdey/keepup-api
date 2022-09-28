const router = require("express").Router();
const controller = require("../controller");
const { user: param, dynamicController } = require("../middleware/parameter");
const { body: validator } = require("../helper/validation/validator");
const { user } = require("../helper/validation/schema");

router.param(":id", param.id);
router.put("/user/:id/update", validator(user.update), controller.user.update);

module.exports = router;
