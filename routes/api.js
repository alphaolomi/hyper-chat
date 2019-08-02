var express = require("express");
var auth = require("../auth");

var authController = require("../controllers/api/auth");
var userController = require("../controllers/api/user");

var router = express.Router();
router.get('/', function (req, res) {
  var message = {
    name: 'Mongo Chat',
    license: 'MIT',
    keywords: ['express', "babel", 'boilerplate', 'scaffold', 'es6', "es2015", 'es2016', 'es2017', 'jest', 'eslint'],
    engines: {
      "node": "~6.9.1",
      'npm': ">=3.10.0"
    }
  };
  return res.status(200).json(message);
});


/**
 * POST /register Register a user
 */
router.post('/register', authController.register);
/**
 * POST /login Log in
 */
router.post('/login', authController.login);
/**
 * GET /user Get authenticated user
 */
router.get('/user', userController.getAuthUser);

export default router;