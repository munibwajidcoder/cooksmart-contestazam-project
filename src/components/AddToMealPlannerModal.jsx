import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DAYS = [
  { key: 'mon', label: 'Mon', full: 'Monday' },
  { key: 'tue', label: 'Tue', full: 'Tuesday' },
  { key: 'wed', label: 'Wed', full: 'Wednesday' },
  { key: 'thu', label: 'Thu', full: 'Thursday' },
  { key: 'fri', label: 'Fri', full: 'Friday' },
  { key: 'sat', label: 'Sat', full: 'Saturday' },
  { key: 'sun', label: 'Sun', full: 'Sunday' },
];

const MEAL_TYPES = [
  { key: 'breakfast', label: 'Breakfast', icon: '☀️' },
  { key: 'lunch',     label: 'Lunch',     icon: '⛅' },
  { key: 'dinner',    label: 'Dinner',    icon: '🌙' },
];

export default function AddToMealPlannerModal({ isOpen, onClose, recipe, onSuccess }) {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('mon');
  const [selectedMeal, setSelectedMeal] = useState('dinner');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (recipe && isOpen) {
      setIsSaved(false);
      // Auto-detect meal type from category
      const cat = recipe.category?.toLowerCase() || '';
      if (cat.includes('breakfast')) setSelectedMeal('breakfast');
      else if (cat.includes('lunch')) setSelectedMeal('lunch');
      else setSelectedMeal('dinner');
    }
  }, [recipe, isOpen]);

  if (!isOpen || !recipe) return null;

  const handleAddToPlan = async () => {
    try {
      const userId = localStorage.getItem('cooksmart_user_id');
      if (!userId) {
        alert('❌ Please create a profile (Sign In) first to add meals!');
        return;
      }

      const savedPlan = localStorage.getItem('cooksmart_meal_plan');
      let currentPlan = savedPlan ? JSON.parse(savedPlan) : {
        mon: { breakfast: null, lunch: null, dinner: null },
        tue: { breakfast: null, lunch: null, dinner: null },
        wed: { breakfast: null, lunch: null, dinner: null },
        thu: { breakfast: null, lunch: null, dinner: null },
        fri: { breakfast: null, lunch: null, dinner: null },
        sat: { breakfast: null, lunch: null, dinner: null },
        sun: { breakfast: null, lunch: null, dinner: null },
      };

      if (!currentPlan[selectedDay]) {
        currentPlan[selectedDay] = {};
      }

      currentPlan[selectedDay][selectedMeal] = {
        id: recipe.id,
        name: recipe.name,
        time: recipe.time,
        image: recipe.image || '/images/cat_dinner_3d.jpg',
      };

      // 1. Save Locally
      localStorage.setItem('cooksmart_meal_plan', JSON.stringify(currentPlan));
      setIsSaved(true);

      // 2. Save to Backend MongoDB
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log(`🚀 Sending meal plan to backend for user: ${userId}`);
      
      const res = await fetch(`${API_URL}/api/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, weekData: currentPlan }),
      });
      
      if (!res.ok) {
        console.error('❌ Failed to save meal plan, status:', res.status);
      } else {
        console.log('✅ Meal plan saved to MongoDB Atlas successfully!');
      }

      if (onSuccess) {
        onSuccess(selectedDay, selectedMeal);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative bg-[#12141D] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-orange-500/10 rounded-full blur-[70px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-['Outfit']">Add to Meal Planner</h3>
                <p className="text-xs text-gray-400">Schedule this recipe for your week</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Recipe preview chip */}
          <div className="flex items-center gap-3.5 bg-[#181B26] border border-white/8 p-3 rounded-2xl mb-6 relative z-10">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
              onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-bold text-sm leading-tight truncate font-['Outfit']">{recipe.name}</h4>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Clock size={11} className="text-orange-400" /> {recipe.time} • <span className="capitalize text-orange-400 font-semibold">{recipe.category}</span>
              </p>
            </div>
          </div>

          {isSaved ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 relative z-10"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-3">
                <Check size={28} strokeWidth={3} />
              </div>
              <h4 className="text-lg font-black text-white font-['Outfit'] mb-1">Added Successfully!</h4>
              <p className="text-sm text-gray-300 mb-6">
                Scheduled for <span className="text-orange-400 font-bold capitalize">{DAYS.find(d => d.key === selectedDay)?.full} ({selectedMeal})</span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => { onClose(); navigate('/meal-planner'); }}
                  className="flex-1 py-3 rounded-xl btn-gradient-orange text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
                >
                  View Planner <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-5 relative z-10">
              {/* Day selection */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                  Select Day
                </label>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS.map(day => (
                    <button
                      key={day.key}
                      onClick={() => setSelectedDay(day.key)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedDay === day.key
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                          : 'bg-[#181B26] text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Type selection */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                  Select Meal Type
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {MEAL_TYPES.map(meal => (
                    <button
                      key={meal.key}
                      onClick={() => setSelectedMeal(meal.key)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all ${
                        selectedMeal === meal.key
                          ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-md shadow-orange-500/10'
                          : 'bg-[#181B26] border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl">{meal.icon}</span>
                      <span className="text-xs font-bold text-white">{meal.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToPlan}
                className="w-full btn-gradient-orange text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 mt-6 transition-all hover:shadow-orange-500/40"
              >
                <Calendar size={18} /> Confirm &amp; Add to Planner
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
