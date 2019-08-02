const express = require("express");

const api = require("./api");
const web = require("./web");

const router = express.Router();

router.use(web);
router.use(api);


module.exports = router;
