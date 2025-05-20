const jwt = require('jsonwebtoken');
const { db } = require('../config/database');
const logger = require('../utils/logger');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    db.get('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, user) => {
      if (err) {
        logger.error('Database error during authentication:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth; 