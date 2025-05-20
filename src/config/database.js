const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/crm.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        logger.error('Error connecting to database:', err);
        process.exit(1);
    }
    logger.info('Connected to SQLite database');
});

const setupDatabase = async () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create users table
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Create clients table
            db.run(`
                CREATE TABLE IF NOT EXISTS clients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE,
                    phone TEXT,
                    company TEXT,
                    status TEXT DEFAULT 'active',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Insert default user if not exists
            const defaultEmail = 'admin@example.com';
            const defaultPassword = 'admin123';

            db.get('SELECT * FROM users WHERE email = ?', [defaultEmail], async (err, row) => {
                if (err) {
                    logger.error('Error checking default user:', err);
                    reject(err);
                    return;
                }

                if (!row) {
                    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                    db.run(
                        'INSERT INTO users (email, password) VALUES (?, ?)',
                        [defaultEmail, hashedPassword],
                        (err) => {
                            if (err) {
                                logger.error('Error creating default user:', err);
                                reject(err);
                                return;
                            }
                            logger.info('Default user created successfully');
                            resolve();
                        }
                    );
                } else {
                    resolve();
                }
            });
        });
    });
};

module.exports = {
    db,
    setupDatabase
}; 