const express = require('express');
const router = express.Router();
const UserPreference = require('../models/UserPreference');

// POST /api/users — Save new user preference
router.post('/', async (req, res) => {
  console.log('📥 1. POST /api/users request received:', req.body);
  try {
    const { name, favoriteCategory } = req.body;
    if (!name || !favoriteCategory) {
      console.log('❌ 2. Missing data error');
      return res.status(400).json({ message: 'Name and favoriteCategory are required.' });
    }
    const newUser = new UserPreference({ name, favoriteCategory });
    const saved = await newUser.save();
    console.log('✅ 3. Data saved to MongoDB:', saved);
    res.status(201).json({ success: true, user: saved });
  } catch (err) {
    console.error('❌ Error saving data:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/users/:id — Fetch user preference by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await UserPreference.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
