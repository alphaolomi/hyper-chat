var express = require("express");

var registerController = require("../controllers/register");
var homeController = require("../controllers/home");

var router = express.Router();
router.get('/', homeController.index);
router.get('/home', homeController.show);
router.get('/welcome', homeController.welcome);
router.get('/register', registerController.showRegistrationForm);
router.post('/register', registerController.registerUser);

export default router;