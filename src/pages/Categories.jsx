import React, { useState, useMemo } from 'react';
import { ArrowRight, ChevronDown, Heart, Clock, Flame, Users, Sparkles, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allRecipes } from '../data/recipesData';
import Card3D from '../components/Card3D';

export default function Categories() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cooksmart_favorites') || '[]'); }
    catch { return []; }
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState('Dinner');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedMaxTime, setSelectedMaxTime] = useState('All');
  const [showDiffDropdown, setShowDiffDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const toggleFav = (e, id) => {
    e.stopPropagation();
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
  };

  // Dynamically calculate recipe counts
  const categoryCounts = useMemo(() => {
    const counts = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snacks: 0,
      desserts: 0,
    };
    allRecipes.forEach(r => {
      const cat = r.category?.toLowerCase();
      if (counts[cat] !== undefined) counts[cat]++;
    });
    return counts;
  }, []);

  const CATEGORIES = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      count: categoryCounts.breakfast || 12,
      description: 'Start your day right with energizing morning meals.',
      image: '/images/cat_breakfast_3d.jpg',
      icon: '🍳',
      iconBg: 'from-orange-500 to-amber-400',
      cardBg: 'from-[#1A1208] to-[#12100A]',
      glow: 'rgba(251,146,60,0.18)',
      border: 'border-orange-500/20',
    },
    {
      id: 'lunch',
      name: 'Lunch',
      count: categoryCounts.lunch || 12,
      description: 'Quick, satisfying meals to power through your day.',
      image: '/images/cat_lunch_3d.jpg',
      icon: '🥗',
      iconBg: 'from-green-500 to-emerald-400',
      cardBg: 'from-[#0E1A10] to-[#0A120B]',
      glow: 'rgba(34,197,94,0.16)',
      border: 'border-green-500/20',
    },
    {
      id: 'dinner',
      name: 'Dinner',
      count: categoryCounts.dinner || 15,
      description: 'Hearty, comforting dishes for the whole family.',
      image: '/images/cat_dinner_3d.jpg',
      icon: '🍖',
      iconBg: 'from-red-500 to-rose-500',
      cardBg: 'from-[#1A0C0C] to-[#120A0A]',
      glow: 'rgba(239,68,68,0.16)',
      border: 'border-red-500/20',
    },
    {
      id: 'snacks',
      name: 'Snacks',
      count: categoryCounts.snacks || 10,
      description: 'Tasty bites for whenever hunger strikes.',
      image: '/images/cat_snacks_3d.jpg',
      icon: '🍟',
      iconBg: 'from-yellow-400 to-amber-500',
      cardBg: 'from-[#1A1608] to-[#12100A]',
      glow: 'rgba(251,191,36,0.16)',
      border: 'border-yellow-500/20',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      count: categoryCounts.desserts || 10,
      description: 'Sweet treats to end any meal on a high note.',
      image: '/images/cat_desserts_3d.jpg',
      icon: '🎂',
      iconBg: 'from-pink-500 to-rose-400',
      cardBg: 'from-[#1A0A14] to-[#120A10]',
      glow: 'rgba(236,72,153,0.18)',
      border: 'border-pink-500/20',
      fullWidth: true,
    },
  ];

  const getCategoryBadgeColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'dinner': return 'bg-green-500 text-white';
      case 'lunch': return 'bg-orange-500 text-white';
      case 'breakfast': return 'bg-yellow-400 text-black';
      case 'snacks': return 'bg-purple-500 text-white';
      case 'desserts': return 'bg-pink-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Filtered recipes for the showcase section
  const showcaseRecipes = useMemo(() => {
    let list = allRecipes.filter(r => r.category?.toLowerCase() === activeCategoryTab.toLowerCase());
    
    if (selectedDifficulty !== 'All') {
      list = list.filter(r => r.difficulty === selectedDifficulty);
    }
    
    if (selectedMaxTime !== 'All') {
      const maxMins = parseInt(selectedMaxTime);
      list = list.filter(r => {
        const mins = parseInt(r.time) || 0;
        return mins <= maxMins;
      });
    }

    return list.slice(0, 4);
  }, [activeCategoryTab, selectedDifficulty, selectedMaxTime]);

  const totalTabRecipesCount = useMemo(() => {
    return allRecipes.filter(r => r.category?.toLowerCase() === activeCategoryTab.toLowerCase()).length;
  }, [activeCategoryTab]);

  return (
    <div 
      className="w-full min-h-screen bg-[#0A0B0E] pb-24"
      onClick={() => { setShowDiffDropdown(false); setShowTimeDropdown(false); }}
    >

      {/* ── Fixed ambient glows ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-[-8%] w-[500px] h-[500px] bg-orange-600/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-[-8%] w-[450px] h-[450px] bg-red-700/6 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 pt-6">

        {/* ══════════════════════ BREADCRUMB ══════════════════════ */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-7 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <span className="text-orange-500 text-base leading-none">›</span>
          <span className="text-orange-500">Categories</span>
        </nav>

        {/* ══════════════════════ PAGE HEADER ══════════════════════ */}
        <div className="relative flex items-start justify-between mb-12">
          {/* Left text block */}
          <div className="z-10 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white font-['Outfit'] leading-tight tracking-tight mb-4"
            >
              Browse by <span className="text-gradient-orange">Category</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed font-['Plus_Jakarta_Sans']"
            >
              Find exactly what you're craving — from quick breakfasts to authentic dinner feasts and sweet desserts.
            </motion.p>
          </div>

          {/* Right decorative 3D image */}
          <div className="hidden md:block absolute right-0 top-[-20px] w-[240px] h-[200px] pointer-events-none select-none">
            <div className="absolute inset-0 bg-orange-500/10 blur-[60px] rounded-full" />
            <img
              src="/images/mini_bowl_3d.jpg"
              alt=""
              className="w-full h-full object-contain mix-blend-screen opacity-85 scale-110"
            />
          </div>
        </div>

        {/* ══════════════════════ CATEGORY CARDS ══════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 perspective-container">
          {CATEGORIES.map((cat, i) => (
            <motion.article
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`${cat.fullWidth ? 'md:col-span-2' : ''} h-full`}
            >
              <Card3D intensity={6} className="h-full">
                <div
                  onClick={() => navigate(`/recipes?category=${cat.name}`)}
                  className={`
                    relative flex flex-row items-stretch h-full
                    rounded-3xl overflow-hidden cursor-pointer group
                    bg-gradient-to-r ${cat.cardBg}
                    border ${cat.border}
                    transition-all duration-300 shadow-xl hover:shadow-[0_8px_40px_rgba(255,107,0,0.2)]
                    min-h-[200px] sm:min-h-[215px]
                    ${cat.fullWidth ? 'md:min-h-[230px]' : ''}
                  `}
                  style={{ boxShadow: `0 8px 32px -6px ${cat.glow}` }}
                >
                  {/* ── Radial glow layer ── */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 35% 50%, ${cat.glow} 0%, transparent 65%)`,
                    }}
                  />

                  {/* ── LEFT: text content ── */}
                  <div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 py-6 w-[56%] sm:w-[52%] flex-shrink-0 transform translate-z-[20px]">
                    {/* Icon + title */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 bg-gradient-to-br ${cat.iconBg} shadow-lg`}
                      >
                        {cat.icon}
                      </div>
                      <h2 className="text-2xl sm:text-[26px] font-black text-white leading-none font-['Outfit'] group-hover:text-orange-400 transition-colors">
                        {cat.name}
                      </h2>
                    </div>

                    {/* Recipe count */}
                    <p className="text-orange-400 text-xs font-bold tracking-wide mb-3 pl-[52px]">
                      {cat.count} recipes
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed mb-5 line-clamp-2 font-['Plus_Jakarta_Sans']">
                      {cat.description}
                    </p>

                    {/* Explore button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/recipes?category=${cat.name}`);
                      }}
                      className="w-fit flex items-center gap-2 btn-gradient-orange btn-3d text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all group-hover:shadow-orange-500/40"
                    >
                      Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* ── RIGHT: 3D Image ── */}
                  <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-black/40 transform translate-z-[10px]">
                    {/* Right-side color glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 60% 50%, ${cat.glow} 0%, transparent 70%)`,
                      }}
                    />
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                      onError={(e) => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                    />
                    {/* Left-fade overlay so image smoothly blends into the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </Card3D>
            </motion.article>
          ))}
        </div>

        {/* ══════════════════════ INTERACTIVE CATEGORY SHOWCASE ══════════════════════ */}
        <section className="mb-16">

          {/* Header & Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {activeCategoryTab} Recipes{' '}
                <span className="text-orange-400">({totalTabRecipesCount})</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Explore top-rated picks from this category</p>
            </div>

            {/* Category Selector Tabs */}
            <div className="w-full lg:w-auto overflow-x-auto hide-scrollbar">
              <div className="flex items-center gap-1 p-1.5 bg-[#141722] border border-white/10 rounded-2xl w-max min-w-full lg:min-w-0">
                {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategoryTab(tab)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeCategoryTab === tab
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap" onClick={e => e.stopPropagation()}>
              {/* Max Time Filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowTimeDropdown(!showTimeDropdown); setShowDiffDropdown(false); }}
                  className={`flex items-center gap-1.5 bg-[#161922] border px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    selectedMaxTime !== 'All' ? 'border-orange-500 text-orange-400' : 'border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  <Clock size={12} className="text-orange-400" />
                  <span>{selectedMaxTime === 'All' ? 'Cook Time' : `≤ ${selectedMaxTime} min`}</span>
                  <ChevronDown size={11} className={`text-gray-400 ml-0.5 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showTimeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-full mt-1.5 left-0 min-w-[130px] bg-[#1a1d2a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-1"
                    >
                      {['All', '20', '30', '45', '60'].map(t => (
                        <button
                          key={t}
                          onClick={() => { setSelectedMaxTime(t); setShowTimeDropdown(false); }}
                          className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors hover:bg-orange-500/10 hover:text-orange-400 ${selectedMaxTime === t ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'}`}
                        >
                          {t === 'All' ? 'Any Time' : `Under ${t} mins`}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowDiffDropdown(!showDiffDropdown); setShowTimeDropdown(false); }}
                  className={`flex items-center gap-1.5 bg-[#161922] border px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    selectedDifficulty !== 'All' ? 'border-orange-500 text-orange-400' : 'border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  <Flame size={12} className="text-orange-400" />
                  <span>{selectedDifficulty === 'All' ? 'Difficulty' : selectedDifficulty}</span>
                  <ChevronDown size={11} className={`text-gray-400 ml-0.5 transition-transform ${showDiffDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showDiffDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-full mt-1.5 left-0 min-w-[130px] bg-[#1a1d2a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-1"
                    >
                      {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                        <button
                          key={d}
                          onClick={() => { setSelectedDifficulty(d); setShowDiffDropdown(false); }}
                          className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors hover:bg-orange-500/10 hover:text-orange-400 ${selectedDifficulty === d ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset filters */}
              {(selectedDifficulty !== 'All' || selectedMaxTime !== 'All') && (
                <button
                  onClick={() => { setSelectedDifficulty('All'); setSelectedMaxTime('All'); }}
                  className="text-xs text-orange-400 hover:text-orange-300 font-bold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* 4-column recipe cards */}
          {showcaseRecipes.length === 0 ? (
            <div className="py-16 text-center bg-[#12141D] rounded-3xl border border-white/5">
              <Utensils size={36} className="mx-auto mb-3 text-orange-400 opacity-40" />
              <p className="text-white font-bold text-base mb-1 font-['Outfit']">No recipes found</p>
              <p className="text-gray-400 text-xs">Try adjusting your filters above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-container">
              {showcaseRecipes.map((recipe, i) => {
                const isFav = favorites.includes(recipe.id);
                return (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="h-full"
                  >
                    <Card3D intensity={10} className="h-full">
                      <div
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                        className="bg-[#12141D] border border-white/5 h-full hover:border-orange-500/30 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col"
                      >
                        {/* Card image */}
                        <div className="relative h-44 overflow-hidden bg-black flex-shrink-0 transform translate-z-[15px]">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 pointer-events-none" />
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                          />
                          {/* Favorite */}
                          <button
                            onClick={(e) => toggleFav(e, recipe.id)}
                            className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full btn-3d flex items-center justify-center transition-all ${
                              isFav
                                ? 'bg-red-500 text-white shadow-md shadow-red-500/40 scale-105'
                                : 'bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-black/70'
                            }`}
                          >
                            <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                          </button>
                          {/* Category badge */}
                          <div className={`absolute bottom-3 left-3 z-20 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getCategoryBadgeColor(recipe.category)}`}>
                            {recipe.category}
                          </div>
                        </div>

                        {/* Card info */}
                        <div className="p-4 flex flex-col gap-2 flex-1 transform translate-z-[25px]">
                          <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors font-['Outfit']">
                            {recipe.name}
                          </h3>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 mt-0.5">
                            <span className="flex items-center gap-1"><Clock size={10} /> {recipe.time}</span>
                            <span className="flex items-center gap-1 text-orange-500"><Flame size={10} fill="currentColor" /> {recipe.difficulty}</span>
                            <span className="flex items-center gap-1"><Users size={10} /> {recipe.servings}</span>
                          </div>
                          <button className="mt-auto text-orange-400 text-[11px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all pt-1 border-t border-white/[0.04]">
                            View Recipe <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* View all link */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate(`/recipes?category=${activeCategoryTab}`)}
              className="flex items-center gap-2 btn-gradient-orange text-white px-6 py-3 rounded-full font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
            >
              View All {activeCategoryTab} Recipes <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* ══════════════════════ TRENDING BANNER ══════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-[#12100A]"
          style={{ boxShadow: '0 0 70px -15px rgba(249,115,22,0.25)' }}
        >
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-600/15 rounded-full blur-[90px]" />
            <div className="absolute bottom-0 left-1/3 w-52 h-52 bg-amber-500/10 rounded-full blur-[70px]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-0">
            {/* Left text */}
            <div className="flex-1 p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">
                  🔥
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-0.5">This Week</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-['Outfit'] leading-tight">
                    Trending This Week:{' '}
                    <span className="text-orange-400">Desserts</span>
                  </h2>
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-7 max-w-sm font-['Plus_Jakarta_Sans']">
                Everyone's craving Pakistani sweets again — check out our top-rated gulab jamun, kheer, and desserts.
              </p>

              <button
                onClick={() => navigate('/recipes?category=Desserts')}
                className="inline-flex items-center gap-2 btn-gradient-orange text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50"
              >
                Explore Desserts <ArrowRight size={15} />
              </button>
            </div>

            {/* Right 3D image */}
            <div className="relative w-full md:w-[45%] h-56 md:h-[250px] flex-shrink-0 flex items-center justify-center overflow-hidden bg-black/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#12100A] via-transparent to-transparent md:bg-gradient-to-l pointer-events-none z-10" />
              <img
                src="/images/cat_desserts_3d.jpg"
                alt="Trending Desserts"
                className="w-full h-full object-cover object-center scale-105"
                style={{ filter: 'drop-shadow(0 10px 30px rgba(249,115,22,0.3))' }}
                onError={(e) => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
              />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
