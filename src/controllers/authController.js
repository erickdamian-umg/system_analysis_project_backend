const AuthService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      logger.error('Login controller error:', error);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      logger.error('Registration controller error:', error);
      if (error.message === 'Email already registered') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = AuthController; 