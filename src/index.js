require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { setupDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
setupDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }); 