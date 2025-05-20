const { db } = require('../config/database');
const logger = require('../utils/logger');

class Client {
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM clients', (err, clients) => {
        if (err) {
          logger.error('Error finding all clients:', err);
          reject(err);
        }
        resolve(clients);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM clients WHERE id = ?', [id], (err, client) => {
        if (err) {
          logger.error('Error finding client by id:', err);
          reject(err);
        }
        resolve(client);
      });
    });
  }

  static async create(clientData) {
    const { name, email, phone, address, company } = clientData;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO clients (name, email, phone, address, company) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, address, company],
        function(err) {
          if (err) {
            logger.error('Error creating client:', err);
            reject(err);
          }
          resolve({ id: this.lastID, ...clientData });
        }
      );
    });
  }

  static async update(id, clientData) {
    const { name, email, phone, address, company } = clientData;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE clients SET name = ?, email = ?, phone = ?, address = ?, company = ? WHERE id = ?',
        [name, email, phone, address, company, id],
        function(err) {
          if (err) {
            logger.error('Error updating client:', err);
            reject(err);
          }
          resolve({ id, ...clientData });
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM clients WHERE id = ?', [id], function(err) {
        if (err) {
          logger.error('Error deleting client:', err);
          reject(err);
        }
        resolve({ id });
      });
    });
  }

  static async search(query) {
    const searchQuery = `%${query}%`;
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM clients WHERE name LIKE ? OR email LIKE ? OR company LIKE ?',
        [searchQuery, searchQuery, searchQuery],
        (err, clients) => {
          if (err) {
            logger.error('Error searching clients:', err);
            reject(err);
          }
          resolve(clients);
        }
      );
    });
  }
}

module.exports = Client; 