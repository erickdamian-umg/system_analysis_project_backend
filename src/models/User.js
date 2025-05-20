const { db } = require('../config/database');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

class User {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
          logger.error('Error finding user by email:', err);
          reject(err);
        }
        resolve(user);
      });
    });
  }

  static async create(userData) {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        function(err) {
          if (err) {
            logger.error('Error creating user:', err);
            reject(err);
          }
          resolve({ id: this.lastID, email });
        }
      );
    });
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User; 