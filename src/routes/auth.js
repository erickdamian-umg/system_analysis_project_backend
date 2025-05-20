const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authValidators } = require('../middleware/validators');

router.post('/login', authValidators.login, AuthController.login);
router.post('/register', authValidators.register, AuthController.register);

module.exports = router; 