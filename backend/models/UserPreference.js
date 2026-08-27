const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  favoriteCategory: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
