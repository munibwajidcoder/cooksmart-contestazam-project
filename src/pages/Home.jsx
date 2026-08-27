import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowRight, ChevronLeft, ChevronRight, Heart, 
  Timer, ChefHat, Flame, Sparkles, Sprout
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Hero3DBowl, IconRecipeBook, IconPlateCategories, IconBrainAIPower, AIRobotChefScene 
} from '../components/FoodVisuals';
import { categoriesData, popularRecipes, cookingTipsData } from '../data/recipesData';
import AISuggestionModal from '../components/AISuggestionModal';
import Card3D from '../components/Card3D';
import { useNavigate } from 'react-router-dom';

export default function Home({ onOpenAI, onOpenUserPreference }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const navigate = useNavigate();

  // Scroll animations for the hero burger
  const { scrollY } = useScroll();
  const burgerY = useTransform(scrollY, [0, 800], [0, 120]);
  const burgerRotate = useTransform(scrollY, [0, 800], [0, -12]);
  const burgerScale = useTransform(scrollY, [0, 800], [1, 0.95]);

  // Load favorites from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cooksmart_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (recipeId) => {
    let updated;
    if (favorites.includes(recipeId)) {
      updated = favorites.filter(id => id !== recipeId);
    } else {
      updated = [...favorites, recipeId];
    }
    setFavorites(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleAiBannerSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    navigate(`/ai-suggestion`);
  };

  return (
    <div className="w-full relative overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 min-h-[100vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Background Atmospheric Lighting */}
        <div className="absolute top-12 left-8 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-16 right-8 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />

        {/* Left Hero Content */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[74px] font-black leading-[1.08] sm:leading-[1.06] tracking-tight font-['Outfit']"
          >
            Cook Smarter,<br />
            <span className="text-gradient-orange">Not Harder</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mt-4 sm:mt-6 max-w-lg font-['Plus_Jakarta_Sans']"
          >
            Discover 50+ authentic recipes based on what's already in your kitchen. Let AI do the thinking — you just cook.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-8 w-full sm:w-auto perspective-container"
          >
            <button 
              onClick={() => navigate('/ai-suggestion')}
              className="btn-gradient-orange btn-3d text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-3 tracking-wide cursor-pointer shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
            >
              Find My Recipe <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('popular-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/recipes');
              }}
              className="bg-[#151722]/80 btn-3d hover:bg-[#1B1E2C] border border-white/15 hover:border-white/30 text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              Browse Recipes
            </button>
          </motion.div>

          {/* Search by Ingredient Input */}
          <motion.form 
            onSubmit={handleHeroSearch}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-xl relative text-left"
          >
            <div className="absolute inset-y-0 left-4 sm:left-5 flex items-center pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search by ingredient... e.g. chicken, potato, rice" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141D]/90 border border-white/15 focus:border-orange-500 rounded-full py-3.5 sm:py-4.5 pl-12 sm:pl-14 pr-14 sm:pr-16 text-white placeholder-gray-400 focus:outline-none transition-all shadow-[0_12px_35px_rgba(0,0,0,0.6)] text-xs sm:text-[15px]"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-10 sm:w-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full flex items-center justify-center transition-all shadow-md shadow-orange-500/30 cursor-pointer"
              title="Search"
            >
              <Search size={16} />
            </button>
          </motion.form>
        </div>
        
        {/* Right 3D Visual Centerpiece */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
          className="w-full lg:w-[50%] flex items-center justify-center relative py-12 lg:py-0"
        >
          {/* Subtle Orange Atmospheric Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <motion.img 
            src="/images/hero_burger.png" 
            alt="Premium Hero Burger" 
            style={{ y: burgerY, rotate: burgerRotate, scale: burgerScale }}
            className="w-[85%] sm:w-[75%] lg:w-[85%] max-w-[600px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
          />
        </motion.div>
      </section>

      {/* ================= METRICS / STATS BAR ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-16 sm:mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center justify-between shadow-2xl border border-white/[0.08]"
        >
          {/* Stat 1: Recipes */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center sm:justify-start">
            <IconRecipeBook />
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-orange-500 font-['Outfit'] leading-none mb-1">50+</h3>
              <p className="text-white font-bold text-sm sm:text-base">Authentic Dishes</p>
            </div>
          </div>
          
          {/* Stat 2: Categories */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center sm:justify-start sm:border-l sm:border-r border-white/10 sm:px-4">
            <IconPlateCategories />
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-orange-500 font-['Outfit'] leading-none mb-1">5</h3>
              <p className="text-white font-bold text-sm sm:text-base">Food Categories</p>
            </div>
          </div>

          {/* Stat 3: AI-Powered */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center sm:justify-start">
            <IconBrainAIPower />
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gradient-purple font-['Outfit'] leading-none mb-1">AI-Powered</h3>
              <p className="text-white font-bold text-sm sm:text-base">Smart Suggestions</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= EXPLORE BY CATEGORY ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-20 sm:mb-28 relative">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-['Outfit']">
              Explore by <span className="text-gradient-orange">Category</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] mt-1">
              Browse your favorite meal courses
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/categories')}
            className="text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 perspective-container">
          {categoriesData.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.06 }}
              className="h-full"
            >
              <Card3D intensity={15} className="h-full">
                <div
                  onClick={() => navigate(`/recipes?category=${cat.name}`)}
                  className="glass-panel glass-panel-hover h-full rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer group select-none text-center relative overflow-hidden transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                >
                  {/* Category 3D Exact Image */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 mb-3 sm:mb-4 relative flex items-center justify-center transform translate-z-[20px] transition-transform duration-300">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-contain mix-blend-screen rounded-2xl group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_18px_rgba(0,0,0,0.8)]"
                      onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                    />
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors font-['Outfit'] transform translate-z-[10px]">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-orange-400 font-semibold flex items-center gap-1 transform translate-z-[5px]">
                    <span>★</span> {cat.badge || '10+ recipes'}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= POPULAR THIS WEEK ================= */}
      <section id="popular-section" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-20 sm:mb-28 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-['Outfit']">
              Popular <span className="text-gradient-orange">This Week</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] mt-1">
              Top-rated home-cooked dishes loved by thousands
            </p>
          </div>
          <button 
            onClick={() => navigate(`/recipes`)}
            className="text-xs sm:text-sm font-bold border border-white/15 bg-white/[0.04] rounded-full px-5 py-2.5 hover:bg-white/10 hover:border-white/30 flex items-center gap-2 transition-all w-fit cursor-pointer self-start sm:self-auto"
          >
            View All Recipes <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Recipe Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 perspective-container">
          {popularRecipes.map((recipe, i) => {
            const isFav = favorites.includes(recipe.id);
            return (
              <motion.div 
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
                className="h-full"
              >
                <Card3D intensity={10} className="h-full">
                  <div
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="glass-panel glass-panel-hover h-full rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                  >
                    {/* Recipe Card Image */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/60 flex items-center justify-center transform translate-z-[15px]">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
                        onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-transparent to-transparent pointer-events-none" />
                      
                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-orange-500 text-white shadow-md">
                        {recipe.category}
                      </div>

                      {/* Heart Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        className={`absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center btn-3d transition-all ${
                          isFav 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110' 
                            : 'bg-black/50 backdrop-blur-md text-white hover:text-red-400 hover:bg-black/70 border border-white/10'
                        }`}
                        title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                      >
                        <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Card Info */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between transform translate-z-[25px]">
                      <h3 className="font-bold text-base sm:text-lg text-white mb-3 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors font-['Outfit']">
                        {recipe.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Timer size={13} className="text-gray-400" /> {recipe.time}
                        </div>
                        <div className="flex items-center gap-1 text-orange-400">
                          <Flame size={13} /> {recipe.difficulty}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold">
                          ⭐ {recipe.rating || '4.9'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= AI RECIPE SUGGESTION BANNER ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-20 sm:mb-28 relative">
        <motion.div 
          initial={{ opacity: 0, y: 25 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-[#141624] via-[#1C1832] to-[#2B1B3C] rounded-3xl p-6 sm:p-10 md:p-12 lg:p-14 overflow-hidden border border-purple-500/30 shadow-[0_0_60px_-15px_rgba(168,85,247,0.3)] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Neon Purple glow aura */}
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-purple-600/25 blur-[120px] rounded-full pointer-events-none" />

          {/* Left Text & Input */}
          <div className="relative z-10 w-full md:w-[58%] lg:w-[52%] text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Sparkles size={13} /> Smart Pantry Matching
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight font-['Outfit']">
              Not sure what to cook?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md mx-auto md:mx-0 font-['Plus_Jakarta_Sans'] leading-relaxed">
              Type your available pantry ingredients and let our AI suggest the ideal recipe in seconds.
            </p>
            
            <form 
              onSubmit={handleAiBannerSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#0D0F15]/90 backdrop-blur-md border border-white/15 rounded-2xl sm:rounded-full p-2 shadow-inner gap-2"
            >
              <div className="hidden sm:flex items-center pl-4 pr-1 text-emerald-400 shrink-0">
                <Sprout size={20} />
              </div>
              <input 
                type="text" 
                placeholder="e.g. chicken, spinach, potato..." 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 px-3 py-2.5 sm:py-3 focus:outline-none text-xs sm:text-sm font-['Plus_Jakarta_Sans']"
              />
              <button 
                type="submit"
                className="btn-gradient-orange text-white px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 tracking-wide cursor-pointer shadow-md shadow-orange-500/30"
              >
                Suggest a Recipe <ArrowRight size={15} />
              </button>
            </form>
          </div>
          
          {/* Right 3D Robot Chef Illustration */}
          <div className="relative z-10 w-full md:w-[42%] lg:w-[48%] flex items-center justify-center md:justify-end">
            <AIRobotChefScene />
          </div>
        </motion.div>
      </section>

      {/* ================= HANDY COOKING TIPS ================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mb-20 sm:mb-24 relative">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-['Outfit']">
            Handy <span className="text-gradient-orange">Cooking Tips</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] mt-1">
            Pro kitchen secrets from executive chefs
          </p>
        </div>

        {/* 3 Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 perspective-container">
          {cookingTipsData.map((tip, i) => (
            <motion.div 
              key={tip.id}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.08 }}
              className="h-full"
            >
              <Card3D intensity={12} className="h-full">
                <div
                  onClick={() => navigate('/recipes')}
                  className="glass-panel glass-panel-hover h-full rounded-3xl p-5 sm:p-6 flex items-center gap-4 sm:gap-5 group cursor-pointer transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                >
                  {/* Tip 3D Illustration Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-black/60 flex items-center justify-center overflow-hidden border border-white/5 p-1 transform translate-z-[15px]">
                    <img 
                      src={tip.image} 
                      alt={tip.title} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                    />
                  </div>

                  {/* Tip Title & Action */}
                  <div className="flex-1 min-w-0 transform translate-z-[25px]">
                    <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-md mb-1.5 inline-block">
                      {tip.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors font-['Outfit'] line-clamp-2">
                      {tip.title}
                    </h3>
                    <div className="text-orange-400 text-xs font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MODALS ================= */}
      <AISuggestionModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        initialQuery={aiInput || searchQuery} 
      />
    </div>
  );
}
