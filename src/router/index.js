const router = require("express").Router();

router.use(require("./get"));
router.use(require("./post"));

module.exports = router;
