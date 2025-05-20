const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com' 
    : 'http://localhost:3000',
  credentials: true
}));

// ... rest of the existing code ... 