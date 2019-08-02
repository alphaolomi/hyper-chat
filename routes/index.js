var express = require("express");

var api = require("./api");
var web = require("./web");

var router = express.Router();
router.use(web["default"]);
router.use(api["default"]);


exports["default"] = router;
