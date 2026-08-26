const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cooksmart')
.then(() => console.log('MongoDB connection established successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('CookSmart Backend is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
