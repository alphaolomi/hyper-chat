const express = require("express");

const authController = require("../controllers/api/auth");
const userController = require("../controllers/api/user");

const router = express.Router();

router.get('/', function (req, res) {
    const message = {
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


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', userController.getAuthUser);

module.exports = router;
