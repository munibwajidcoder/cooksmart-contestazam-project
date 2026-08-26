import React, { useState, useMemo } from 'react';
import { 
  Heart, ArrowRight, Trash2, Search, Grid, Clock, Flame, Users, 
  CalendarPlus, ChevronRight, Sparkles, Utensils 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allRecipes } from '../data/recipesData';
import AddToMealPlannerModal from '../components/AddToMealPlannerModal';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

const getCategoryBadgeColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case 'dinner':   return 'bg-green-600 text-white';
    case 'lunch':    return 'bg-orange-500 text-white';
    case 'breakfast':return 'bg-yellow-400 text-black';
    case 'snacks':   return 'bg-purple-600 text-white';
    case 'desserts': return 'bg-pink-500 text-white';
    default:         return 'bg-gray-600 text-white';
  }
};

export default function Favourites() {
  const navigate = useNavigate();

  // Load favourites from localStorage
  const [favIds, setFavIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cooksmart_favorites') || '[]');
      if (saved.length === 0) {
        // default starter favorites if empty
        const sampleIds = ['pk-dn-beef-karahi', 'pk-ln-mutton-pulao', 'pk-bf-paratha', 'pk-ds-gulab-jamun'];
        localStorage.setItem('cooksmart_favorites', JSON.stringify(sampleIds));
        return sampleIds;
      }
      return saved;
    } catch { 
      return []; 
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mealModalRecipe, setMealModalRecipe] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, icon = '✓') => {
    setToastMessage({ text: msg, icon });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeFav = (e, id) => {
    e.stopPropagation();
    const updated = favIds.filter(f => f !== id);
    setFavIds(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
    showToast('Removed from Favorites', '🗑️');
  };

  const clearAll = () => {
    setFavIds([]);
    localStorage.setItem('cooksmart_favorites', JSON.stringify([]));
    showToast('Cleared all favorites', '🧹');
  };

  // Get full recipe objects for favorite IDs
  const favRecipes = useMemo(() => {
    return favIds
      .map(id => allRecipes.find(r => r.id === id))
      .filter(Boolean);
  }, [favIds]);

  // Filter by search & category
  const filteredFavs = useMemo(() => {
    let list = favRecipes;
    if (selectedCategory !== 'All') {
      list = list.filter(r => r.category?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [favRecipes, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#0A0B0E] pb-24">

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#1A1C28] border border-orange-500/40 text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-3"
          >
            <span className="text-xl">{toastMessage.icon}</span>
            <span className="text-sm font-bold font-['Plus_Jakarta_Sans']">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] bg-red-700/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-[-5%] w-[450px] h-[450px] bg-orange-600/6 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-6">

        {/* ══ BREADCRUMB ══ */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-7 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight size={14} />
          <span className="text-white font-semibold">Favorites</span>
        </nav>

        {/* ══ PAGE HEADER ══ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative">
          <div className="relative z-10 md:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white font-['Outfit'] mb-3 tracking-tight leading-tight"
            >
              Your Favorite <span className="text-gradient-orange">Recipes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-base md:text-lg max-w-xl font-['Plus_Jakarta_Sans'] leading-relaxed"
            >
              All the dishes you've saved and loved — bookmarked right here for quick, effortless cooking.
            </motion.p>
          </div>

          {/* Stats Badge */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="bg-[#141722] border border-orange-500/30 text-white font-bold text-sm px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-orange-500/10">
              <Heart size={18} className="text-red-500" fill="currentColor" />
              <span>{favRecipes.length} Saved Recipes</span>
            </div>
          </div>
        </div>

        {/* ══ SEARCH & CATEGORY FILTER BAR ══ */}
        {favRecipes.length > 0 && (
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#13151E] border border-white/10 focus:border-orange-500 rounded-2xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Pills & Clear All */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              {/* Scrollable tab strip */}
              <div className="flex items-center gap-1 p-1 bg-[#13151E] border border-white/10 rounded-2xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-bold px-3 py-2 transition-colors shrink-0"
              >
                <Trash2 size={13} /> Clear All
              </button>
            </div>
          </div>
        )}

        {/* ══ RECIPES GRID ══ */}
        {filteredFavs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
            <AnimatePresence>
              {filteredFavs.map((recipe, i) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="bg-[#12141D] border border-white/6 hover:border-orange-500/30 rounded-3xl overflow-hidden group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-black flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 pointer-events-none" />
                    
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                    />

                    {/* Heart Remove Button */}
                    <button
                      onClick={(e) => removeFav(e, recipe.id)}
                      title="Remove from favorites"
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/40 hover:bg-red-600 transition-all hover:scale-110"
                    >
                      <Heart size={15} fill="currentColor" />
                    </button>

                    {/* Category Badge */}
                    <div className={`absolute bottom-3 left-3 z-20 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${getCategoryBadgeColor(recipe.category)}`}>
                      {recipe.category}
                    </div>

                    {/* Rating */}
                    {recipe.rating && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2 py-1 rounded-lg">
                        ⭐ {recipe.rating}
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-[15px] text-white leading-snug group-hover:text-orange-400 transition-colors font-['Outfit'] line-clamp-2 mb-2">
                      {recipe.name}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 mb-2.5">
                      <span className="flex items-center gap-1"><Clock size={11} /> {recipe.time}</span>
                      <span className="flex items-center gap-1 text-orange-500"><Flame size={11} fill="currentColor" /> {recipe.difficulty}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {recipe.servings}</span>
                    </div>

                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {recipe.description}
                    </p>

                    {/* Bottom Actions */}
                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <span className="text-orange-500 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Recipe <ArrowRight size={12} />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMealModalRecipe(recipe);
                        }}
                        title="Add to Meal Planner"
                        className="w-8 h-8 rounded-xl bg-[#181B26] hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all"
                      >
                        <CalendarPlus size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* ══ CLEAN EMPTY STATE ══ */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-[#12141D] p-12 sm:p-16 text-center max-w-xl mx-auto my-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="w-20 h-20 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-6 text-3xl text-orange-400">
              ❤️
            </div>

            <h3 className="text-2xl font-black text-white font-['Outfit'] mb-3">
              {searchQuery || selectedCategory !== 'All' ? 'No matching favorites found' : 'No favorites saved yet'}
            </h3>
            <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-8 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All' 
                ? 'Try clearing your search query or choosing another category filter.' 
                : 'Click the heart icon on any recipe across the website to save it here for instant access.'}
            </p>

            <button
              onClick={() => navigate('/recipes')}
              className="btn-gradient-orange text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 inline-flex items-center gap-2 transition-all"
            >
              Explore Recipes <ArrowRight size={15} />
            </button>
          </motion.div>
        )}

      </div>

      {/* Add To Meal Planner Modal */}
      <AddToMealPlannerModal
        isOpen={!!mealModalRecipe}
        onClose={() => setMealModalRecipe(null)}
        recipe={mealModalRecipe}
        onSuccess={(day, meal) => {
          showToast(`Added to ${day.toUpperCase()} (${meal})! 📅`, '📅');
        }}
      />

    </div>
  );
}
