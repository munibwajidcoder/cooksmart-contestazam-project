import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Heart, Calendar, Share2, Plus, Minus, 
  ShoppingCart, Flame, Lightbulb, Clock, Users,
  ChefHat, Activity, Wheat, Droplet, Check, CheckCircle2,
  Copy, Sparkles, ArrowRight, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allRecipes } from '../data/recipesData';
import GroceryListModal from '../components/GroceryListModal';
import AddToMealPlannerModal from '../components/AddToMealPlannerModal';
import Card3D from '../components/Card3D';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(2);
  const [favorites, setFavorites] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  
  // Modals & Feedback
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [addedToGrocery, setAddedToGrocery] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [similarOffset, setSimilarOffset] = useState(0);

  useEffect(() => {
    // Find recipe
    const found = allRecipes.find(r => r.id === id) || allRecipes[0];
    setRecipe(found);
    setServings(found?.servings || 2);
    setCheckedIngredients({});
    setCompletedSteps({});
    setSimilarOffset(0);
    
    // Load favorites
    try {
      const saved = localStorage.getItem('cooksmart_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  const showToast = (msg, icon = '✓') => {
    setToastMessage({ text: msg, icon });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleFavorite = () => {
    if (!recipe) return;
    let updated;
    if (favorites.includes(recipe.id)) {
      updated = favorites.filter(fid => fid !== recipe.id);
      showToast(`Removed from Favorites`, '💔');
    } else {
      updated = [...favorites, recipe.id];
      showToast(`Added to Favorites!`, '❤️');
    }
    setFavorites(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Recipe link copied to clipboard! 📋', '🔗');
  };

  const handleAddAllToGrocery = () => {
    if (!recipe?.ingredients?.length) return;
    
    try {
      const saved = localStorage.getItem('cooksmart_grocery_list');
      const currentList = saved ? JSON.parse(saved) : [];
      
      const newItems = recipe.ingredients.map((ing, idx) => ({
        id: Date.now() + idx + Math.random(),
        text: ing,
        recipeName: recipe.name,
        checked: false
      }));
      
      const combined = [...newItems, ...currentList];
      localStorage.setItem('cooksmart_grocery_list', JSON.stringify(combined));
      
      setAddedToGrocery(true);
      showToast(`Added ${recipe.ingredients.length} ingredients to Grocery List! 🛒`, '🛒');
      setTimeout(() => setAddedToGrocery(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const isFav = recipe ? favorites.includes(recipe.id) : false;

  // 3 similar recipes for 'You Might Also Like'
  const similarRecipes = useMemo(() => {
    if (!recipe) return [];
    const sameCat = allRecipes.filter(r => r.id !== recipe.id && r.category === recipe.category);
    const others = allRecipes.filter(r => r.id !== recipe.id && r.category !== recipe.category);
    const pool = [...sameCat, ...others];
    return pool;
  }, [recipe]);

  const visibleSimilar = useMemo(() => {
    if (!similarRecipes.length) return [];
    const start = similarOffset % similarRecipes.length;
    const items = [];
    for (let i = 0; i < Math.min(3, similarRecipes.length); i++) {
      items.push(similarRecipes[(start + i) % similarRecipes.length]);
    }
    return items;
  }, [similarRecipes, similarOffset]);

  const handlePrevSimilar = () => {
    setSimilarOffset(prev => (prev - 1 + similarRecipes.length) % similarRecipes.length);
  };

  const handleNextSimilar = () => {
    setSimilarOffset(prev => (prev + 1) % similarRecipes.length);
  };

  if (!recipe) return <div className="min-h-screen pt-20 text-center text-white font-['Outfit'] text-xl">Loading recipe...</div>;

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'dinner': return 'bg-green-500 text-white';
      case 'lunch': return 'bg-orange-500 text-white';
      case 'breakfast': return 'bg-yellow-500 text-black';
      case 'snacks': return 'bg-purple-500 text-white';
      case 'desserts': return 'bg-pink-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryTextColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'dinner': return 'text-green-500';
      case 'lunch': return 'text-orange-500';
      case 'breakfast': return 'text-yellow-500';
      case 'snacks': return 'text-purple-500';
      case 'desserts': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const totalStepsCount = recipe.steps?.length || 0;

  // Split recipe name for formatting: First word white, rest gradient orange
  const nameParts = recipe?.name ? recipe.name.split(' ') : [];
  const firstWord = nameParts[0] || '';
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div className="w-full relative min-h-screen pb-24 bg-[#0A0B0E]">
      
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

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-6">
        
        {/* ================= BREADCRUMB ================= */}
        <div className="text-gray-400 text-xs sm:text-sm font-semibold mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button> 
          <ChevronRight size={14} /> 
          <button onClick={() => navigate('/recipes')} className="hover:text-white transition-colors">Recipes</button> 
          <ChevronRight size={14} />
          <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/recipes')}>{recipe.category}</span>
          <ChevronRight size={14} />
          <span className="text-orange-500">{recipe.name}</span>
        </div>

        {/* ================= MAIN LAYOUT (TWO COLUMNS) ================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-16 relative">
          
          {/* LEFT COLUMN: Info & Ingredients */}
          <div className="lg:w-[45%] flex flex-col z-10 relative">
            
            {/* Title & Category */}
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex w-fit mb-4 ${getCategoryColor(recipe.category)}`}>
              {recipe.category}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-black font-['Outfit'] mb-6 leading-tight tracking-tight"
            >
              <span className="text-white">{firstWord}</span>
              {restWords && (
                <>
                  {' '}
                  <span className="text-gradient-orange">{restWords}</span>
                </>
              )}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-['Plus_Jakarta_Sans']"
            >
              {recipe.description}
            </motion.p>

            {/* Meta Box (Time, Difficulty, Servings, Category) */}
            <div className="flex items-center flex-wrap gap-4 md:gap-8 mb-8 bg-[#161922]/80 border border-white/5 p-4 rounded-[1.5rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cook Time</div>
                  <div className="text-white font-bold text-sm">{recipe.time}</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Flame size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Difficulty</div>
                  <div className="text-white font-bold text-sm">{recipe.difficulty}</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Users size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Servings</div>
                  <div className="text-white font-bold text-sm">{servings}</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <ChefHat size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Category</div>
                  <div className={`font-bold text-sm ${getCategoryTextColor(recipe.category)}`}>{recipe.category}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full perspective-container">
              <button 
                onClick={toggleFavorite}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                className={`w-14 h-14 shrink-0 rounded-full btn-3d flex items-center justify-center transition-all ${
                  isFav 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-105' 
                    : 'bg-[#161922] border border-white/10 text-orange-500 hover:bg-white/5'
                }`}
              >
                <Heart size={24} fill={isFav ? 'currentColor' : 'none'} />
              </button>

              <button 
                onClick={() => setIsMealModalOpen(true)}
                className="flex-1 min-w-[200px] min-h-[56px] py-2 px-4 btn-3d bg-[#161922] hover:bg-[#1f232f] hover:border-orange-500/40 border border-white/10 rounded-full flex items-center justify-center gap-3 text-white font-bold transition-all text-sm sm:text-base shadow-md group leading-snug"
              >
                <Calendar size={20} className="text-orange-400 shrink-0 group-hover:scale-110 transition-transform" /> 
                <span className="text-center">Add to Meal Planner</span>
              </button>

              <button 
                onClick={handleShare}
                title="Share Recipe link"
                className="w-14 h-14 shrink-0 rounded-full btn-3d bg-[#161922] hover:bg-[#1f232f] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:border-orange-500/30"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Ingredients Box */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] flex items-center gap-3">
                  <ShoppingCart size={24} className="text-orange-500" /> Ingredients
                </h3>
                
                <div className="flex items-center gap-3 bg-[#0D0F15]/80 p-1.5 rounded-full border border-white/5">
                  <span className="text-xs text-gray-400 font-bold ml-2">Servings:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-orange-500 flex items-center justify-center text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-bold w-4 text-center text-sm">{servings}</span>
                    <button 
                      onClick={() => setServings(servings + 1)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-orange-500 flex items-center justify-center text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 mb-8 relative z-10">
                {recipe.ingredients?.map((ing, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                      checkedIngredients[idx] 
                        ? 'bg-white/[0.02] border-white/5' 
                        : 'bg-[#151824] border-white/5 hover:border-orange-500/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      checkedIngredients[idx] 
                        ? 'bg-orange-500 border-orange-500 text-white' 
                        : 'border-white/20'
                    }`}>
                      {checkedIngredients[idx] && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[15px] font-medium transition-all ${checkedIngredients[idx] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {ing}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                <button 
                  onClick={handleAddAllToGrocery}
                  className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg text-sm ${
                    addedToGrocery
                      ? 'bg-green-600 text-white shadow-green-600/30'
                      : 'btn-gradient-orange text-white shadow-orange-500/25 hover:shadow-orange-500/40'
                  }`}
                >
                  {addedToGrocery ? <Check size={18} strokeWidth={3} /> : <ShoppingCart size={18} />}
                  {addedToGrocery ? 'Added to Grocery List!' : 'Add All to Grocery List'}
                </button>

                <button 
                  onClick={() => setIsGroceryModalOpen(true)}
                  className="px-5 py-4 rounded-2xl bg-[#1A1D2B] hover:bg-[#222636] border border-white/10 text-gray-200 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} className="text-orange-400" /> View List
                </button>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: 3D Image & Steps */}
          <div className="lg:w-[55%] flex flex-col items-center">
            
            {/* Massive Floating 3D Image Container with Flip Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="w-full max-w-[560px] aspect-square relative mb-8 flex items-center justify-center flip-card group cursor-pointer"
            >
              {/* Pedestal glow */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-orange-600/40 rounded-[100%] blur-[40px] pointer-events-none transition-all duration-500 group-hover:bg-purple-600/40 group-hover:blur-[60px]" />
              
              <div className="flip-card-inner">
                {/* FRONT FACE: 3D Image */}
                <div className="flip-card-front flex items-center justify-center pointer-events-none">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)] z-10 animate-float"
                    style={{ animationDuration: '6s' }} 
                    onError={(e) => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                  />
                  {/* Hint indicator overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-[3rem] opacity-100 group-hover:opacity-0 transition-opacity">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/90 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.6)] mb-3">
                      <PlayCircle size={40} className="ml-1" />
                    </div>
                    <div className="bg-black/70 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg">
                      Tap / Hover to Watch Video
                    </div>
                  </div>
                </div>

                {/* BACK FACE: Video Container */}
                <div className="flip-card-back flex items-center justify-center pointer-events-auto z-20">
                  <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-[#0A0B0E] relative shadow-[0_20px_50px_rgba(255,107,0,0.3)]">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${
                        recipe?.category?.toLowerCase() === 'breakfast' ? 'f_Lk4KJPQE0' :
                        recipe?.category?.toLowerCase() === 'lunch'     ? 'ZJy1ajvMU1k' :
                        recipe?.category?.toLowerCase() === 'snacks'    ? 'tNDN1WETCZA' :
                        recipe?.category?.toLowerCase() === 'desserts'  ? 'cFAa15TKACE' :
                        'ySL0kPOkHG8'  // default: dinner / Pakistani cooking
                      }?rel=0&showinfo=0&modestbranding=1`}
                      title={`${recipe?.name} - Cooking Video Tutorial`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full object-cover"
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Hint text below the image */}
            <div className="text-center mb-8 -mt-2">
              <p className="text-gray-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] font-medium flex items-center justify-center gap-1.5 opacity-80">
                <PlayCircle size={15} className="text-orange-500" /> Click or Tap the image to watch the recipe video
              </p>
            </div>

            {/* Preparation Steps Box */}
            <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] flex items-center gap-3">
                  <ChefHat size={24} className="text-orange-500" /> Preparation Steps
                </h3>
                {totalStepsCount > 0 && (
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400">
                    {completedStepsCount} of {totalStepsCount} Done
                  </span>
                )}
              </div>

              <div className="space-y-0 relative">
                {/* Vertical Dotted Line for Steps */}
                <div className="absolute left-[17px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-white/10 z-0" />

                {recipe.steps?.map((step, idx) => {
                  const isDone = completedSteps[idx];
                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleStep(idx)}
                      className={`flex gap-5 relative z-10 py-5 px-3 rounded-2xl transition-all cursor-pointer group ${
                        isDone ? 'bg-white/[0.02] opacity-75' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Step Number Circle */}
                      <div className={`w-9 h-9 rounded-full text-white font-black text-sm flex items-center justify-center shrink-0 mt-1 shadow-lg transition-all ${
                        isDone 
                          ? 'bg-green-600 shadow-green-600/30 scale-105' 
                          : 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/20 group-hover:scale-105'
                      }`}>
                        {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
                      </div>

                      {/* Step Content */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
                        <div className="flex-1">
                          <h4 className={`text-base font-bold mb-1.5 font-['Outfit'] transition-colors ${
                            isDone ? 'text-green-400 line-through' : 'text-white group-hover:text-orange-400'
                          }`}>
                            {step.title}:
                          </h4>
                          <p className={`text-sm leading-relaxed font-['Plus_Jakarta_Sans'] ${
                            isDone ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chef's Tip Box */}
              {recipe.tips && (
                <div className="mt-8 bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-5 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none" />
                  
                  <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Lightbulb size={24} className="text-orange-400" fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-orange-400 font-['Outfit'] mb-1">Chef's Tip</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{recipe.tips}</p>
                  </div>
                </div>
              )}
            </div>



          </div>
        </div>

        {/* ================= NUTRITIONAL INFO BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-[#161922]/80 border border-white/5 p-6 sm:p-8 rounded-[2rem] mb-20 shadow-2xl">
          
          <div className="flex items-center gap-4 min-w-[140px]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-500/10">
              <Flame size={24} className="text-orange-500" fill="currentColor" />
            </div>
            <div>
              <div className="text-white font-black text-lg sm:text-xl font-['Outfit'] leading-none mb-1">{recipe.calories}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Per Serving</div>
            </div>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block" />

          <div className="flex items-center gap-4 min-w-[120px]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-700/20">
              <Activity size={24} className="text-amber-500" />
            </div>
            <div>
              <div className="text-white font-black text-lg sm:text-xl font-['Outfit'] leading-none mb-1">{recipe.protein || '18g'}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Protein</div>
            </div>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block" />

          <div className="flex items-center gap-4 min-w-[120px]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-600/20">
              <Wheat size={24} className="text-yellow-500" />
            </div>
            <div>
              <div className="text-white font-black text-lg sm:text-xl font-['Outfit'] leading-none mb-1">{recipe.carbs || '55g'}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Carbs</div>
            </div>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block" />

          <div className="flex items-center gap-4 min-w-[120px]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-400/20">
              <Droplet size={24} className="text-yellow-300" fill="currentColor" />
            </div>
            <div>
              <div className="text-white font-black text-lg sm:text-xl font-['Outfit'] leading-none mb-1">{recipe.fat || '24g'}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fat</div>
            </div>
          </div>

        </div>

        {/* ================= YOU MIGHT ALSO LIKE ================= */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">You Might Also Like</h2>
            <div className="h-px bg-white/10 flex-grow" />
            <div className="flex gap-2">
              <button 
                onClick={handlePrevSimilar}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button 
                onClick={handleNextSimilar}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {visibleSimilar.map((simRecipe) => (
              <Card3D key={simRecipe.id} intensity={12} className="h-full">
                <div 
                  onClick={() => navigate(`/recipe/${simRecipe.id}`)}
                  className="bg-[#12141D]/90 h-full border border-white/5 hover:border-orange-500/30 rounded-3xl overflow-hidden group cursor-pointer flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-black flex items-center justify-center rounded-t-3xl transform translate-z-[15px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none" />
                    <img 
                      src={simRecipe.image} 
                      alt={simRecipe.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: 'center' }}
                      onError={(e) => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                    />
                    <div className={`absolute bottom-3 left-4 z-20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${getCategoryColor(simRecipe.category)} shadow-md`}>
                      {simRecipe.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 transform translate-z-[25px]">
                    <h3 className="font-extrabold text-lg text-white mb-3 line-clamp-1 group-hover:text-orange-400 transition-colors font-['Outfit']">
                      {simRecipe.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-400" /> {simRecipe.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <Flame size={13} fill="currentColor" /> {simRecipe.difficulty}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-gray-400" /> {simRecipe.servings}
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      <AddToMealPlannerModal
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        recipe={recipe}
        onSuccess={(day, meal) => {
          showToast(`Scheduled for ${day.toUpperCase()} (${meal})! 📅`, '📅');
        }}
      />

      <GroceryListModal
        isOpen={isGroceryModalOpen}
        onClose={() => setIsGroceryModalOpen(false)}
      />

    </div>
  );
}
