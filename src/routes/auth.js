const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authValidators } = require('../middleware/validators');
const validate = require('../middleware/validate');

router.post('/login', authValidators.login, validate, AuthController.login);
router.post('/register', authValidators.register, validate, AuthController.register);

module.exports = router; 