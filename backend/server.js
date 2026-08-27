require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  const bodyLog = (req.body && typeof req.body === 'object' && Object.keys(req.body).length) 
    ? req.body 
    : '';
  console.log(`📡 ${new Date().toISOString()} | ${req.method} ${req.url}`, bodyLog);
  next();
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);

app.get('/', (req, res) => res.send('CookSmart API is running!'));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState
  });
});

// Connect MongoDB FIRST, then start server
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 20000,
  connectTimeoutMS: 20000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  retryWrites: true,
})
.then(() => {
  console.log('✅ MongoDB Connected!');
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB Error:', err.message);
  process.exit(1);
});

// Keep connection alive
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected! Reconnecting...');
});
mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected!');
});
