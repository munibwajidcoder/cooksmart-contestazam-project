const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  // We use a clean array of objects so the database is highly readable
  // e.g. [{ day: 'Monday', mealType: 'Breakfast', recipeName: 'Aloo Paratha' }]
  meals: [
    {
      day: { type: String },          // Monday, Tuesday, etc.
      mealType: { type: String },     // breakfast, lunch, dinner
      recipeName: { type: String },   // Aloo Paratha
      time: { type: String },         // 30 min
      category: { type: String },     // Breakfast
      image: { type: String },
      recipeId: { type: String }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
