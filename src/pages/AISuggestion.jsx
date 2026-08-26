import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, X, Sparkles, ArrowRight, Info, RefreshCw, 
  ChevronDown, ChevronRight, Clock, Flame, Heart, Users, Check, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allRecipes } from '../data/recipesData';

// Helper to determine match badge colors
const getMatchStyle = (pct) => {
  if (pct >= 80) return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30' };
  if (pct >= 50) return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
  return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/30' };
};

// Simple helper to check if a recipe is vegetarian
const isVegetarianRecipe = (recipe) => {
  const text = ((recipe.name || '') + ' ' + (recipe.description || '') + ' ' + (recipe.ingredients || []).join(' ')).toLowerCase();
  const nonVegKeywords = ['chicken', 'mutton', 'beef', 'meat', 'fish', 'prawn', 'shrimp', 'keema', 'gosht', 'lamb', 'tikka', 'boti', 'seekh', 'nihari', 'haleem', 'siri paye'];
  return !nonVegKeywords.some(keyword => text.includes(keyword));
};

// Popular quick add ingredients
const POPULAR_INGREDIENTS = [
  { name: 'Chicken', icon: '🍗' },
  { name: 'Potato', icon: '🥔' },
  { name: 'Tomato', icon: '🍅' },
  { name: 'Onion', icon: '🧅' },
  { name: 'Rice', icon: '🍚' },
  { name: 'Egg', icon: '🥚' },
  { name: 'Garlic', icon: '🧄' },
  { name: 'Cheese', icon: '🧀' },
  { name: 'Mutton', icon: '🥩' },
  { name: 'Yogurt', icon: '🥣' },
];

export default function AISuggestion() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState(['Chicken', 'Tomato', 'Garlic']);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTriggerCount, setSearchTriggerCount] = useState(1);

  // Filter States
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedTime, setSelectedTime] = useState('Any Time');
  const [selectedDiet, setSelectedDiet] = useState('Any Diet');
  
  // Dropdown UI States
  const [showCuisineMenu, setShowCuisineMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showDietMenu, setShowDietMenu] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cooksmart_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);
  const showToastMessage = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addIngredient = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (inputValue.trim()) {
      const val = inputValue.trim();
      const formattedVal = val.charAt(0).toUpperCase() + val.slice(1);
      if (!ingredients.some(i => i.toLowerCase() === formattedVal.toLowerCase())) {
        setIngredients(prev => [...prev, formattedVal]);
      }
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const quickAdd = (name) => {
    if (!ingredients.some(i => i.toLowerCase() === name.toLowerCase())) {
      setIngredients(prev => [...prev, name]);
      showToastMessage(`Added ${name}`);
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(prev => prev.filter(i => i !== ing));
  };

  const handleSuggest = () => {
    let current = [...ingredients];
    if (inputValue.trim()) {
      const formatted = inputValue.trim().charAt(0).toUpperCase() + inputValue.trim().slice(1);
      if (!current.some(i => i.toLowerCase() === formatted.toLowerCase())) {
        current.push(formatted);
        setIngredients(current);
      }
      setInputValue('');
    }

    if (current.length === 0) {
      showToastMessage('Please add at least 1 ingredient first!');
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchTriggerCount(c => c + 1);
      // Smoothly scroll to results
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 600);
  };

  const toggleFav = (e, id) => {
    e.stopPropagation();
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
    showToastMessage(favorites.includes(id) ? 'Removed from Favorites' : 'Added to Favorites');
  };

  const handleReset = () => {
    setIngredients([]);
    setInputValue('');
    setIsLoading(false);
    inputRef.current?.focus();
    showToastMessage('Cleared all ingredients');
  };

  // ─── Real Dynamic Matching Algorithm ───
  const suggestions = useMemo(() => {
    if (ingredients.length === 0) {
      // If no ingredients, show top popular recipes as recommendations
      return allRecipes.slice(0, 8).map(r => ({
        ...r,
        match: 90,
        matchedCount: 0,
        missingCount: 0,
        matchLabel: 'Chef Recommended Special',
      }));
    }

    let matchedList = [];

    allRecipes.forEach(recipe => {
      let matchedCount = 0;
      const allRecipeText = ((recipe.name || '') + ' ' + (recipe.description || '') + ' ' + (recipe.ingredients || []).join(' ')).toLowerCase();

      // Check each ingredient the user entered
      ingredients.forEach(userIng => {
        const u = userIng.toLowerCase().trim();
        // Common multilingual alias mappings
        let aliases = [u];
        if (u === 'aloo' || u === 'potato' || u === 'potatoes') aliases = ['potato', 'aloo'];
        if (u === 'gosht' || u === 'meat' || u === 'mutton' || u === 'beef') aliases = ['mutton', 'beef', 'gosht', 'meat'];
        if (u === 'chicken' || u === 'murgh') aliases = ['chicken', 'murgh'];
        if (u === 'dahi' || u === 'yogurt' || u === 'curd') aliases = ['yogurt', 'dahi'];
        if (u === 'chawal' || u === 'rice') aliases = ['rice', 'chawal', 'basmati'];
        if (u === 'paneer' || u === 'cheese') aliases = ['cheese', 'paneer'];
        if (u === 'anda' || u === 'egg' || u === 'eggs') aliases = ['egg', 'anda', 'omelette'];
        if (u === 'pyaz' || u === 'onion' || u === 'onions') aliases = ['onion', 'pyaz'];
        if (u === 'tamatar' || u === 'tomato' || u === 'tomatoes') aliases = ['tomato', 'tamatar'];
        if (u === 'lasun' || u === 'garlic') aliases = ['garlic', 'lasun'];

        const matched = aliases.some(alias => allRecipeText.includes(alias));
        if (matched) {
          matchedCount++;
        }
      });

      if (matchedCount > 0) {
        // Calculate match percentage
        const matchPercentage = Math.min(100, Math.round((matchedCount / ingredients.length) * 100));
        
        matchedList.push({
          ...recipe,
          match: matchPercentage,
          matchedCount,
          missingCount: Math.max(0, ingredients.length - matchedCount),
          matchLabel: matchedCount === ingredients.length 
            ? `Uses all ${ingredients.length} ingredients` 
            : `Uses ${matchedCount} of ${ingredients.length} ingredients`,
        });
      }
    });

    // If no exact match found, return top recommended recipes so the user is never stuck with an empty page
    if (matchedList.length === 0) {
      matchedList = allRecipes.slice(0, 8).map(r => ({
        ...r,
        match: 75,
        matchedCount: 0,
        missingCount: ingredients.length,
        matchLabel: 'Chef Recommended Recipe',
      }));
    }

    // Apply Filters
    // 1. Diet Filter
    if (selectedDiet === 'Vegetarian') {
      matchedList = matchedList.filter(r => isVegetarianRecipe(r));
    } else if (selectedDiet === 'Non-Vegetarian') {
      matchedList = matchedList.filter(r => !isVegetarianRecipe(r));
    }

    // 2. Time Filter
    if (selectedTime === 'Under 30 Min') {
      matchedList = matchedList.filter(r => {
        const min = parseInt(r.time) || 30;
        return min <= 30;
      });
    } else if (selectedTime === 'Under 15 Min') {
      matchedList = matchedList.filter(r => {
        const min = parseInt(r.time) || 15;
        return min <= 15;
      });
    }

    // 3. Cuisine Filter
    if (selectedCuisine !== 'All') {
      matchedList = matchedList.filter(r => 
        r.category?.toLowerCase() === selectedCuisine.toLowerCase() ||
        (r.cuisine && r.cuisine.toLowerCase() === selectedCuisine.toLowerCase())
      );
    }

    // Sort by highest match percentage first, then by rating
    return matchedList.sort((a, b) => {
      if (b.match !== a.match) {
        return b.match - a.match;
      }
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [ingredients, selectedCuisine, selectedTime, selectedDiet, searchTriggerCount]);

  return (
    <div className="w-full min-h-screen bg-[#0A0B0E] pb-28 relative overflow-x-hidden">

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#141622] border border-orange-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs"
          >
            <span>✨</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-700/6 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-[-10%] w-[450px] h-[450px] bg-orange-700/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-6">

        {/* ══ BREADCRUMB ══ */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-8 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight size={14} />
          <span className="text-white font-semibold">AI Suggestion</span>
        </nav>

        {/* ══ HERO SECTION ══ */}
        <div className="relative text-center mb-12 max-w-3xl mx-auto">
          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-[56px] font-black text-white font-['Outfit'] mb-3 tracking-tight leading-tight"
          >
            What's in Your{' '}
            <span className="text-gradient-orange">Kitchen?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-gray-300 text-base md:text-lg font-['Plus_Jakarta_Sans'] mb-6 leading-relaxed"
          >
            Tell us what ingredients you have, and our AI will find the perfect matching recipes from our culinary collection.
          </motion.p>

          {/* AI Robot Icon — Prominent and centered below Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1A1828] to-[#12101E] border-2 border-purple-500/40 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(139,92,246,0.35)] relative z-10 hover:scale-105 transition-transform">
                🤖
              </div>
            </div>
          </motion.div>

          {/* ── Input Box Container ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative w-full mb-4 text-left"
          >
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500/30 via-orange-500/20 to-purple-500/30 blur-[3px] pointer-events-none" />

            <div className="relative bg-[#12141D] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl">
              {/* Search input line */}
              <form onSubmit={addIngredient} className="flex items-center gap-3 pb-3 border-b border-white/8 mb-4">
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type an ingredient (e.g. Potato, Chicken, Onion, Rice)..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none font-['Plus_Jakarta_Sans'] font-medium"
                />
                <button 
                  type="button"
                  onClick={addIngredient} 
                  className="bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-1"
                >
                  <Plus size={13} /> Add
                </button>
              </form>

              {/* Active Ingredient Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[36px]">
                <AnimatePresence>
                  {ingredients.length === 0 ? (
                    <span className="text-gray-500 text-xs italic py-1">No ingredients selected yet. Add one above or tap the suggestions below!</span>
                  ) : (
                    ingredients.map(ing => (
                      <motion.span
                        key={ing}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 bg-[#1E192D] border border-purple-500/40 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md group hover:border-orange-500/50 transition-all"
                      >
                        <span className="text-sm">🍳</span>
                        {ing}
                        <button
                          type="button"
                          onClick={() => removeIngredient(ing)}
                          className="text-gray-400 hover:text-red-400 ml-1 transition-colors"
                          title="Remove"
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </motion.span>
                    ))
                  )}
                </AnimatePresence>

                {ingredients.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-300 text-[11px] font-bold px-2 py-1 ml-auto transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Quick Add Pills */}
              <div className="pt-3 border-t border-white/6">
                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Quick Add Common Ingredients:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_INGREDIENTS.map(item => {
                    const isAdded = ingredients.some(i => i.toLowerCase() === item.name.toLowerCase());
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => quickAdd(item.name)}
                        className={`text-xs px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-semibold ${
                          isAdded 
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                        {isAdded ? <Check size={11} className="text-orange-400" /> : <Plus size={11} className="text-gray-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Big Suggest Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full mb-6"
          >
            <button
              onClick={handleSuggest}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-black text-white text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-2xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              style={{
                background: 'linear-gradient(90deg, #FF6B00, #C026D3)',
                boxShadow: '0 0 35px rgba(192,38,211,0.3), 0 8px 25px rgba(255,107,0,0.2)',
              }}
            >
              <Sparkles size={22} className={isLoading ? 'animate-spin' : ''} />
              {isLoading ? 'Scanning Kitchen Database...' : 'Suggest Matching Recipes'}
            </button>
          </motion.div>

          {/* Alternative Link */}
          <p className="text-gray-500 text-xs sm:text-sm font-['Plus_Jakarta_Sans']">
            Looking for something specific?{' '}
            <button
              onClick={() => navigate('/recipes')}
              className="text-orange-400 font-bold hover:text-orange-300 transition-colors"
            >
              Browse all recipes with filters →
            </button>
          </p>
        </div>

        {/* ══ HOW IT WORKS BANNER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111018] border border-white/8 rounded-3xl p-6 sm:p-8 mb-10 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="shrink-0 text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] leading-tight mb-2">
                How AI Suggestion<br className="hidden lg:block" /> Works
              </h3>
              <div className="w-10 h-1 rounded-full bg-gradient-to-r from-orange-500 to-purple-500" />
            </div>

            <div className="hidden lg:block w-px h-16 bg-white/8 mx-4" />

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-4 flex-1 w-full">
              {[
                { emoji: '🍲', step: '1. Enter Ingredients', desc: 'Add items you already have at home.' },
                { emoji: '🧠', step: '2. AI Matches Pantry', desc: 'AI scans 50+ dishes for maximum match.' },
                { emoji: '✨', step: '3. Cook Delicious Meals', desc: 'Step-by-step instructions ready for you.' },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-lg bg-white/5 border border-white/8">
                      {s.emoji}
                    </div>
                    <p className="text-white font-bold text-sm mb-1 font-['Outfit']">{s.step}</p>
                    <p className="text-gray-400 text-xs leading-snug">{s.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="text-gray-600 text-xl font-bold rotate-90 sm:rotate-0 shrink-0">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══ LOADING SPINNER OVERLAY ══ */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0E0C1E] p-8 sm:p-10 mb-8 text-center shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)]"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-purple-600/40 rounded-full blur-2xl animate-pulse" />
                  <div className="text-5xl animate-bounce" style={{ animationDuration: '1s' }}>🪄</div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white font-['Outfit'] mb-1">
                    AI is finding the best recipes for you...
                  </h3>
                  <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">
                    Analyzing ingredients against Pakistani and international recipe collections.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ RESULTS CONTAINER ══ */}
        <div ref={resultsRef} className="scroll-mt-24">
          {/* Result Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
                  <Sparkles size={11} /> AI Suggested Matches
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-1">
                {ingredients.length > 0 ? (
                  <>Matching Recipes for <span className="text-gradient-orange">{ingredients.join(', ')}</span></>
                ) : (
                  <>Popular <span className="text-gradient-orange">Chef Recommendations</span></>
                )}
              </h2>
              <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">
                Found {suggestions.length} dishes tailored to your available pantry items.
              </p>
            </div>

            {/* ── INTERACTIVE DROPDOWN FILTERS ── */}
            <div className="flex items-center gap-2.5 flex-wrap z-30">
              
              {/* Diet Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowDietMenu(!showDietMenu);
                    setShowCuisineMenu(false);
                    setShowTimeMenu(false);
                  }}
                  className="flex items-center gap-2 bg-[#12141D] border border-white/8 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Diet: <span className="text-orange-400">{selectedDiet}</span> 
                  <ChevronDown size={13} className={`text-gray-500 transition-transform ${showDietMenu ? 'rotate-180' : ''}`} />
                </button>
                {showDietMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#141622] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-40 p-1">
                    {['Any Diet', 'Vegetarian', 'Non-Vegetarian'].map(diet => (
                      <button
                        key={diet}
                        onClick={() => {
                          setSelectedDiet(diet);
                          setShowDietMenu(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-orange-500/15 flex items-center justify-between transition-colors"
                      >
                        <span>{diet}</span>
                        {selectedDiet === diet && <Check size={12} className="text-orange-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTimeMenu(!showTimeMenu);
                    setShowCuisineMenu(false);
                    setShowDietMenu(false);
                  }}
                  className="flex items-center gap-2 bg-[#12141D] border border-white/8 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Time: <span className="text-orange-400">{selectedTime}</span>
                  <ChevronDown size={13} className={`text-gray-500 transition-transform ${showTimeMenu ? 'rotate-180' : ''}`} />
                </button>
                {showTimeMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#141622] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-40 p-1">
                    {['Any Time', 'Under 30 Min', 'Under 15 Min'].map(time => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setShowTimeMenu(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-orange-500/15 flex items-center justify-between transition-colors"
                      >
                        <span>{time}</span>
                        {selectedTime === time && <Check size={12} className="text-orange-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCuisineMenu(!showCuisineMenu);
                    setShowTimeMenu(false);
                    setShowDietMenu(false);
                  }}
                  className="flex items-center gap-2 bg-[#12141D] border border-white/8 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Category: <span className="text-orange-400">{selectedCuisine}</span>
                  <ChevronDown size={13} className={`text-gray-500 transition-transform ${showCuisineMenu ? 'rotate-180' : ''}`} />
                </button>
                {showCuisineMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#141622] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-40 p-1">
                    {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'].map(cuis => (
                      <button
                        key={cuis}
                        onClick={() => {
                          setSelectedCuisine(cuis);
                          setShowCuisineMenu(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-orange-500/15 flex items-center justify-between transition-colors"
                      >
                        <span>{cuis}</span>
                        {selectedCuisine === cuis && <Check size={12} className="text-orange-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ── RESULTS GRID ── */}
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {suggestions.map((recipe, i) => {
                const isFav = favorites.includes(recipe.id);
                const matchStyle = getMatchStyle(recipe.match);
                const isVeg = isVegetarianRecipe(recipe);

                return (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="bg-[#12141D] border border-white/6 hover:border-orange-500/30 rounded-3xl overflow-hidden cursor-pointer group flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                  >
                    {/* Card Image */}
                    <div className="relative h-44 overflow-hidden bg-black flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                      />

                      {/* Heart Icon */}
                      <button
                        onClick={(e) => toggleFav(e, recipe.id)}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isFav ? 'bg-red-500 text-white shadow-lg shadow-red-500/40' : 'bg-black/60 text-white border border-white/10 hover:bg-red-500'
                        }`}
                      >
                        <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                      </button>

                      {/* Match Badge */}
                      <div className={`absolute bottom-3 left-3 z-20 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${matchStyle.bg} text-white shadow-md`}>
                        {recipe.match}% Match
                      </div>

                      {/* Veg/Non-Veg indicator */}
                      <div className={`absolute top-3 left-3 z-20 px-2 py-0.5 rounded-md text-[9px] font-bold ${isVeg ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {isVeg ? 'VEG' : 'MEAT'}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-extrabold text-[15px] text-white line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors font-['Outfit'] mb-1.5">
                          {recipe.name}
                        </h3>

                        <p className="text-gray-400 text-xs font-semibold mb-2">
                          {recipe.matchLabel}
                        </p>

                        {/* Missing info */}
                        {recipe.missingCount > 0 ? (
                          <p className="text-gray-500 text-[11px] mb-3">
                            Missing: <span className="text-orange-400 font-semibold">{recipe.missingCount} item{recipe.missingCount > 1 ? 's' : ''}</span>
                          </p>
                        ) : (
                          <p className="text-green-400 text-[11px] font-semibold mb-3 flex items-center gap-1">
                            ✓ Uses all pantry items
                          </p>
                        )}
                      </div>

                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 mb-3.5 pt-2 border-t border-white/[0.04]">
                          <span className="flex items-center gap-1"><Clock size={11} /> {recipe.time}</span>
                          <span className="flex items-center gap-1 text-orange-500"><Flame size={11} fill="currentColor" /> {recipe.difficulty}</span>
                          {recipe.servings && <span className="flex items-center gap-1"><Users size={11} /> {recipe.servings}</span>}
                        </div>

                        <button className="text-orange-400 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Full Recipe <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Empty Results State */
            <div className="rounded-3xl border border-white/8 bg-[#12141D] p-12 text-center max-w-xl mx-auto my-12 shadow-xl">
              <p className="text-4xl mb-4">🍽️</p>
              <h3 className="text-xl font-black text-white font-['Outfit'] mb-2">No Recipes Match Your Exact Filters</h3>
              <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                Try resetting your diet or time filters to see all delicious suggestions.
              </p>
              <button
                onClick={() => {
                  setSelectedDiet('Any Diet');
                  setSelectedTime('Any Time');
                  setSelectedCuisine('All');
                }}
                className="btn-gradient-orange text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md"
              >
                Reset All Active Filters
              </button>
            </div>
          )}

          {/* Disclaimer Banner */}
          <div className="flex items-start gap-3.5 bg-blue-950/30 border border-blue-500/25 rounded-2xl p-5 mb-8">
            <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
              AI suggestions match key ingredients in your kitchen against our verified recipes. Always substitute appropriately for allergies or dietary restrictions.
            </p>
          </div>

          {/* Bottom Actions Card */}
          <div className="bg-[#111018] border border-white/8 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-black text-white font-['Outfit'] mb-1">
                  Want to try different ingredients?
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans']">
                  Clear your current query list and select other kitchen staples.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 bg-[#1E1C2C] border border-white/10 hover:border-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer"
              >
                <RefreshCw size={14} /> Clear All &amp; Start Over
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
