const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Helper to map short day (mon) to full day (Monday)
const getFullDay = (short) => {
  const map = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
  return map[short] || short;
};

// Helper to map full day (Monday) to short day (mon)
const getShortDay = (full) => {
  const map = { Monday: 'mon', Tuesday: 'tue', Wednesday: 'wed', Thursday: 'thu', Friday: 'fri', Saturday: 'sat', Sunday: 'sun' };
  return map[full] || full;
};

// POST /api/meals — Save or update a meal plan
router.post('/', async (req, res) => {
  try {
    const { userId, weekData } = req.body;
    if (!userId || !weekData) {
      return res.status(400).json({ message: 'userId and weekData are required.' });
    }

    // Transform frontend weekData object into a readable Flat Array for MongoDB
    const flatMeals = [];
    for (const [day, meals] of Object.entries(weekData)) {
      for (const [mealType, recipe] of Object.entries(meals)) {
        if (recipe && recipe.name) {
          flatMeals.push({
            day: getFullDay(day),
            mealType: mealType, // 'breakfast', 'lunch', 'dinner'
            recipeName: recipe.name,
            time: recipe.time || '',
            category: recipe.category || '',
            image: recipe.image || '',
            recipeId: recipe.id || ''
          });
        }
      }
    }

    // Find existing plan for this user and update it, or create a new one
    const updated = await MealPlan.findOneAndUpdate(
      { userId },
      { meals: flatMeals, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, mealPlan: updated });
  } catch (err) {
    console.error('❌ POST meals error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/meals/:userId — Fetch meal plan for a user
router.get('/:userId', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({ userId: req.params.userId });
    
    // Define an empty structure for the frontend
    const weekData = {
      mon: { breakfast: null, lunch: null, dinner: null },
      tue: { breakfast: null, lunch: null, dinner: null },
      wed: { breakfast: null, lunch: null, dinner: null },
      thu: { breakfast: null, lunch: null, dinner: null },
      fri: { breakfast: null, lunch: null, dinner: null },
      sat: { breakfast: null, lunch: null, dinner: null },
      sun: { breakfast: null, lunch: null, dinner: null },
    };

    if (mealPlan && mealPlan.meals) {
      // Transform MongoDB Flat Array back into frontend weekData object
      mealPlan.meals.forEach(meal => {
        const shortDay = getShortDay(meal.day);
        if (weekData[shortDay]) {
          weekData[shortDay][meal.mealType] = {
            id: meal.recipeId,
            name: meal.recipeName,
            time: meal.time,
            category: meal.category,
            image: meal.image
          };
        }
      });
    }

    res.json({ success: true, weekData });
  } catch (err) {
    console.error('❌ GET meals error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/meals/:userId/day/:day — Remove all meals for a specific day
router.delete('/:userId/day/:day', async (req, res) => {
  try {
    const { userId, day } = req.params;
    const mealPlan = await MealPlan.findOne({ userId });
    if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found.' });
    
    const fullDay = getFullDay(day);
    // Filter out meals for this specific day
    mealPlan.meals = mealPlan.meals.filter(m => m.day !== fullDay);
    mealPlan.updatedAt = Date.now();
    await mealPlan.save();
    
    res.json({ success: true, message: `${day} cleared.` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
