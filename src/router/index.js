const router = require("express").Router();
const error = require("../helper/error/handler");

router.use(require("./get"));
router.use(require("./post"));
router.use(require("./put"));
router.use(require("./delete"));

router.use(error.notFound);

router.use(error.manager);

module.exports = router;
