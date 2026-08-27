import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Heart, Flame, Users, ChevronDown, ChevronRight, ChevronLeft,
  X, Grid, Clock, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allRecipes } from '../data/recipesData';
import Card3D from '../components/Card3D';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const RECIPES_PER_PAGE = 8;
const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function Recipes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showCategoryDD, setShowCategoryDD] = useState(false);
  const [showDiffDD, setShowDiffDD] = useState(false);

  useEffect(() => {
    const catParam = searchParams.get('category') || location.state?.category;
    if (catParam) {
      const matched = CATEGORIES.find(c => c.toLowerCase() === catParam.toLowerCase());
      if (matched) {
        setSelectedCategory(matched);
      }
    }
  }, [searchParams, location.state]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cooksmart_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('cooksmart_favorites', JSON.stringify(updated));
  };

  const filteredRecipes = useMemo(() => {
    let r = allRecipes;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(x => x.name?.toLowerCase().includes(q) || x.category?.toLowerCase().includes(q) || x.description?.toLowerCase().includes(q));
    }
    if (selectedCategory !== 'All') r = r.filter(x => x.category === selectedCategory);
    if (selectedDifficulty !== 'All') r = r.filter(x => x.difficulty === selectedDifficulty);
    return r;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);

  const pageRecipes = useMemo(() => {
    const start = (currentPage - 1) * RECIPES_PER_PAGE;
    return filteredRecipes.slice(start, start + RECIPES_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  const goToPage = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (currentPage > 3) pages.push('…');
    const lo = Math.max(2, currentPage - 1);
    const hi = Math.min(totalPages - 1, currentPage + 1);
    for (let i = lo; i <= hi; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
    return pages;
  };

  const catColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'breakfast': return 'bg-yellow-500 text-black';
      case 'lunch':     return 'bg-orange-500 text-white';
      case 'dinner':    return 'bg-green-600 text-white';
      case 'snacks':    return 'bg-purple-600 text-white';
      case 'desserts':  return 'bg-pink-500 text-white';
      default:          return 'bg-gray-600 text-white';
    }
  };

  const closeDropdowns = () => { setShowCategoryDD(false); setShowDiffDD(false); };

  return (
    <div className="min-h-screen bg-[#0A0B0E] pb-24" onClick={closeDropdowns}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
          <span
            className="hover:text-white cursor-pointer transition-colors"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <ChevronRight size={13} />
          <span className="text-white font-semibold">Recipes</span>
        </nav>

        {/* ── HEADER ── */}
        <div className="relative mb-10">
          {/* Glow behind image */}
          <div className="absolute right-0 top-0 w-56 h-56 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none hidden md:block" />
          {/* Decorative bowl */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none hidden lg:block">
            <img
              src="/images/mini_bowl_3d.jpg"
              alt=""
              className="w-full h-full object-contain opacity-80 mix-blend-screen"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white font-['Outfit'] leading-tight tracking-tight mb-3">
              Explore{' '}
              <span className="text-gradient-orange">All Recipes</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg font-['Plus_Jakarta_Sans'] leading-relaxed">
              Browse <span className="text-orange-400 font-bold">{allRecipes.length}+</span> hand-picked Pakistani &amp; fusion recipes — from sehri to midnight cravings.
            </p>
          </motion.div>
        </div>

        {/* ── SEARCH + FILTERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative z-30 mb-4"
          onClick={e => e.stopPropagation()}
        >
          {/* Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                id="recipe-search"
                type="text"
                placeholder="Search recipes by name or category..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#13151e] border border-white/10 focus:border-orange-500 rounded-2xl py-3.5 pl-11 pr-4 text-white text-sm font-medium placeholder-gray-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Dropdowns row */}
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">

              {/* Category */}
              <div className="relative">
                <button
                  onClick={() => { setShowCategoryDD(!showCategoryDD); setShowDiffDD(false); }}
                  className={`flex items-center gap-2 bg-[#13151e] border rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap ${showCategoryDD || selectedCategory !== 'All' ? 'border-orange-500 text-orange-400' : 'border-white/10 text-white hover:border-white/20'}`}
                >
                  <Grid size={15} />
                  <span>{selectedCategory === 'All' ? 'Category' : selectedCategory}</span>
                  <ChevronDown size={14} className={`transition-transform ${showCategoryDD ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showCategoryDD && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+6px)] left-0 min-w-[160px] bg-[#181b28] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                    >
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setSelectedCategory(cat); setShowCategoryDD(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-orange-500/10 hover:text-orange-400 ${selectedCategory === cat ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Difficulty */}
              <div className="relative">
                <button
                  onClick={() => { setShowDiffDD(!showDiffDD); setShowCategoryDD(false); }}
                  className={`flex items-center gap-2 bg-[#13151e] border rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap ${showDiffDD || selectedDifficulty !== 'All' ? 'border-orange-500 text-orange-400' : 'border-white/10 text-white hover:border-white/20'}`}
                >
                  <Flame size={15} />
                  <span>{selectedDifficulty === 'All' ? 'Difficulty' : selectedDifficulty}</span>
                  <ChevronDown size={14} className={`transition-transform ${showDiffDD ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showDiffDD && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+6px)] left-0 min-w-[150px] bg-[#181b28] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                    >
                      {DIFFICULTIES.map(d => (
                        <button
                          key={d}
                          onClick={() => { setSelectedDifficulty(d); setShowDiffDD(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-orange-500/10 hover:text-orange-400 ${selectedDifficulty === d ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear */}
              {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
                  className="flex items-center gap-1.5 text-orange-500 hover:text-orange-400 text-sm font-bold px-1 py-2 transition-colors whitespace-nowrap"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Active filter pills */}
          {(selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-white transition-colors"><X size={11} strokeWidth={3} /></button>
                </span>
              )}
              {selectedDifficulty !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty('All')} className="hover:text-white transition-colors"><X size={11} strokeWidth={3} /></button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* ── RESULTS COUNT ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm font-medium">
            {pageRecipes.length === 0 ? 'No results' : (
              <>
                Showing{' '}
                <span className="text-white font-bold">
                  {(currentPage - 1) * RECIPES_PER_PAGE + 1}–{Math.min(currentPage * RECIPES_PER_PAGE, filteredRecipes.length)}
                </span>
                {' '}of{' '}
                <span className="text-orange-400 font-bold">{filteredRecipes.length}</span>
                {' '}recipes
              </>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-gray-600 text-xs font-medium">Page {currentPage} / {totalPages}</p>
          )}
        </div>

        {/* ── RECIPES GRID ── */}
        {pageRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-7xl mb-5">🍽️</span>
            <h3 className="text-2xl font-bold text-white mb-2 font-['Outfit']">No recipes found</h3>
            <p className="text-gray-500 text-sm max-w-xs">Try a different search term or remove your filters.</p>
          </div>
        ) : (
            <motion.div
            key={`page-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 perspective-container"
          >
            {pageRecipes.map((recipe) => {
              const isFav = favorites.includes(recipe.id);
              return (
                <Card3D key={recipe.id} intensity={10} className="h-full">
                  <div
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="group bg-[#12141D] h-full border border-white/[0.06] hover:border-orange-500/25 rounded-3xl overflow-hidden cursor-pointer flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300"
                  >
                    {/* ── Image ── */}
                    <div className="relative w-full h-48 overflow-hidden bg-[#0d0f15] flex-shrink-0 transform translate-z-[15px]">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                      {/* Heart */}
                      <button
                        onClick={e => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center btn-3d transition-all duration-200 ${
                          isFav
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110'
                            : 'bg-black/50 backdrop-blur-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <Heart size={14} fill={isFav ? 'currentColor' : 'none'} />
                      </button>

                      {/* Rating */}
                      {recipe.rating && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2 py-1 rounded-lg">
                          ⭐ {recipe.rating}
                        </div>
                      )}

                      {/* Category badge */}
                      <div className={`absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase ${catColor(recipe.category)}`}>
                        {recipe.category}
                      </div>
                    </div>

                    {/* ── Info ── */}
                    <div className="flex flex-col flex-1 p-4 transform translate-z-[25px]">
                      <h3 className="font-bold text-[15px] text-white leading-snug group-hover:text-orange-400 transition-colors font-['Outfit'] line-clamp-2 mb-2">
                        {recipe.name}
                      </h3>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 mb-2.5">
                        <span className="flex items-center gap-1"><Clock size={11} /> {recipe.time}</span>
                        <span className="flex items-center gap-1 text-orange-500"><Flame size={11} fill="currentColor" /> {recipe.difficulty}</span>
                        <span className="flex items-center gap-1"><Users size={11} /> {recipe.servings}</span>
                      </div>

                      <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
                        {recipe.description}
                      </p>

                      <div className="flex items-center gap-1 text-orange-500 text-[12px] font-bold group-hover:gap-2 transition-all duration-200 mt-auto pt-1 border-t border-white/[0.04]">
                        View Recipe <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Card3D>
              );
            })}
          </motion.div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 pb-4">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#13151e] border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNums().map((p, idx) =>
                p === '…' ? (
                  <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-600 text-sm select-none">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                      currentPage === p
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                        : 'text-gray-500 hover:text-white hover:bg-white/8 bg-transparent'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#13151e] border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
