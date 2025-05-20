const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

class AuthService {
  static async login(email, password) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await User.comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = await User.create(userData);
      return user;
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }
}

module.exports = AuthService; 