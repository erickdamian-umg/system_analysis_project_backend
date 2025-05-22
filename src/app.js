const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://35.87.197.249', 'http://ec2-35-87-197-249.us-west-2.compute.amazonaws.com']
    : 'http://localhost:3000',
  credentials: true
}));

// ... rest of the existing code ... 