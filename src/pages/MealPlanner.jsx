import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, X, Plus, ShoppingCart, Share2, Clock, 
  Search, Grid, Flame, RotateCcw, Check, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allRecipes } from '../data/recipesData';
import GroceryListModal from '../components/GroceryListModal';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Meal row labels ──────────────────────────────────────────
const ROWS = [
  { key: 'breakfast', label: 'Breakfast', icon: '☀️', bg: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/20' },
  { key: 'lunch',     label: 'Lunch',     icon: '⛅', bg: 'from-blue-500/20 to-sky-500/10',     border: 'border-blue-500/20' },
  { key: 'dinner',    label: 'Dinner',    icon: '🌙', bg: 'from-purple-500/20 to-indigo-500/10', border: 'border-purple-500/20' },
];

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

// ─── Default Sample Plan ──────────────────────────────
const INITIAL_PLAN = {
  mon: {
    breakfast: { id: 'pk-bf-paratha',      name: 'Aloo Paratha',              time: '30 min', image: '/images/cat_breakfast_3d.jpg' },
    lunch:     null,
    dinner:    { id: 'pk-pa-creamy-garlic', name: 'Creamy Garlic Pasta',       time: '20 min', image: '/images/cat_dinner_3d.jpg'    },
  },
  tue: {
    breakfast: null,
    lunch:     { id: 'pk-ln-daal-chawal',   name: 'Daal Chawal',               time: '45 min', image: '/images/cat_lunch_3d.jpg'     },
    dinner:    { id: 'pk-dn-beef-karahi',   name: 'Beef Karahi',               time: '90 min', image: '/images/cat_dinner_3d.jpg'    },
  },
  wed: {
    breakfast: { id: 'pk-bf-anda-paratha',  name: 'Anda Paratha',              time: '20 min', image: '/images/cat_breakfast_3d.jpg' },
    lunch:     null,
    dinner:    null,
  },
  thu: {
    breakfast: null,
    lunch:     null,
    dinner:    { id: 'pk-dn-korma',         name: 'Chicken / Mutton Korma',    time: '60 min', image: '/images/cat_dinner_3d.jpg'    },
  },
  fri: {
    breakfast: null,
    lunch:     { id: 'pk-ln-mutton-pulao',  name: 'Mutton Pulao',              time: '90 min', image: '/images/cat_lunch_3d.jpg'     },
    dinner:    { id: 'pk-dn-white-karahi',  name: 'Chicken White Karahi',      time: '40 min', image: '/images/cat_dinner_3d.jpg'    },
  },
  sat: {
    breakfast: null,
    lunch:     null,
    dinner:    { id: 'pk-ds-gulab-jamun',   name: 'Gulab Jamun',               time: '40 min', image: '/images/cat_desserts_3d.jpg'  },
  },
  sun: {
    breakfast: null,
    lunch:     null,
    dinner:    null,
  },
};

export default function MealPlanner() {
  const navigate = useNavigate();

  // Week navigation offset (0 = current week)
  const [weekOffset, setWeekOffset] = useState(0);

  const [plan, setPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('cooksmart_meal_plan');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PLAN;
  });

  // Modal states
  const [addModal, setAddModal] = useState(null); // { day, row }
  const [modalSearch, setModalSearch] = useState('');
  const [modalCategory, setModalCategory] = useState('All');
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  const savePlan = (updated) => {
    setPlan(updated);
    try {
      localStorage.setItem('cooksmart_meal_plan', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg, icon = '✓') => {
    setToastMessage({ text: msg, icon });
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Calculate dates for current week offset
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 is Sunday
    // Adjust to Monday as start of week
    const diffToMonday = (currentDayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday + weekOffset * 7);

    const keys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return keys.map((key, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const monthName = d.toLocaleString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const isToday = weekOffset === 0 && d.toDateString() === today.toDateString();
      return {
        key,
        label: DAY_NAMES[i],
        date: `${monthName} ${dayNum}`,
        fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isToday,
      };
    });
  }, [weekOffset]);

  const weekRangeLabel = useMemo(() => {
    if (!weekDays.length) return '';
    return `Week of ${weekDays[0].fullDate} – ${weekDays[6].fullDate}`;
  }, [weekDays]);

  const removeMeal = (day, row) => {
    const updated = {
      ...plan,
      [day]: { ...(plan[day] || {}), [row]: null },
    };
    savePlan(updated);
    showToast('Meal removed from plan', '🗑️');
  };

  const addMealFromModal = (recipe) => {
    if (!addModal) return;
    const { day, row } = addModal;
    const updated = {
      ...plan,
      [day]: {
        ...(plan[day] || {}),
        [row]: {
          id: recipe.id,
          name: recipe.name,
          time: recipe.time,
          image: recipe.image || '/images/cat_dinner_3d.jpg',
        },
      },
    };
    savePlan(updated);
    setAddModal(null);
    showToast(`Added ${recipe.name} to ${day.toUpperCase()} (${row})!`, '📅');
  };

  const clearWholeWeek = () => {
    const emptyPlan = {
      mon: { breakfast: null, lunch: null, dinner: null },
      tue: { breakfast: null, lunch: null, dinner: null },
      wed: { breakfast: null, lunch: null, dinner: null },
      thu: { breakfast: null, lunch: null, dinner: null },
      fri: { breakfast: null, lunch: null, dinner: null },
      sat: { breakfast: null, lunch: null, dinner: null },
      sun: { breakfast: null, lunch: null, dinner: null },
    };
    savePlan(emptyPlan);
    showToast('Week planner reset!', '🔄');
  };

  const generateGroceryFromPlan = () => {
    const plannedRecipeIds = [];
    Object.values(plan || {}).forEach(day => {
      Object.values(day || {}).forEach(meal => {
        if (meal?.id) plannedRecipeIds.push(meal.id);
      });
    });

    if (plannedRecipeIds.length === 0) {
      showToast('No meals scheduled in your planner yet!', '⚠️');
      return;
    }

    try {
      const saved = localStorage.getItem('cooksmart_grocery_list');
      const currentList = saved ? JSON.parse(saved) : [];
      
      const newItems = [];
      plannedRecipeIds.forEach(id => {
        const found = allRecipes.find(r => r.id === id);
        if (found?.ingredients) {
          found.ingredients.forEach(ing => {
            newItems.push({
              id: Date.now() + Math.random(),
              text: ing,
              recipeName: found.name,
              checked: false
            });
          });
        }
      });

      const combined = [...newItems, ...currentList];
      localStorage.setItem('cooksmart_grocery_list', JSON.stringify(combined));
      setIsGroceryModalOpen(true);
      showToast(`Generated grocery list with ${newItems.length} ingredients! 🛒`, '🛒');
    } catch (e) {
      console.error(e);
    }
  };

  const shareMealPlan = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Meal plan link copied to clipboard! 📋', '🔗');
  };

  // Filtered recipes for the Add Meal Modal
  const modalFilteredRecipes = useMemo(() => {
    let list = allRecipes;
    if (modalCategory !== 'All') {
      list = list.filter(r => r.category?.toLowerCase() === modalCategory.toLowerCase());
    }
    if (modalSearch.trim()) {
      const q = modalSearch.toLowerCase();
      list = list.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.category?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [modalCategory, modalSearch]);

  // Statistics calculation
  const stats = useMemo(() => {
    let count = 0, totalMins = 0;
    Object.values(plan || {}).forEach(day => {
      Object.values(day || {}).forEach(meal => {
        if (meal) {
          count++;
          const mins = parseInt(meal.time) || 0;
          totalMins += mins;
        }
      });
    });
    const avg = count > 0 ? Math.round(totalMins / count) : 0;
    const ingredients = count * 4;
    return { count, avg, ingredients };
  }, [plan]);

  // Open modal with pre-selected category matching row
  const openAddModal = (dayKey, rowKey) => {
    setAddModal({ day: dayKey, row: rowKey });
    setModalSearch('');
    // Auto-select tab matching row
    if (rowKey === 'breakfast') setModalCategory('Breakfast');
    else if (rowKey === 'lunch') setModalCategory('Lunch');
    else if (rowKey === 'dinner') setModalCategory('Dinner');
    else setModalCategory('All');
  };

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

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/6 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 pt-6">

        {/* ══ BREADCRUMB ══ */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-6 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <span className="text-orange-500 text-base leading-none">›</span>
          <span className="text-orange-500 font-semibold">Meal Planner</span>
        </nav>

        {/* ══ PAGE HEADER ══ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {/* Left info */}
          <div className="flex items-center gap-5">
            <div 
              className="text-6xl sm:text-7xl shrink-0 select-none animate-float"
              style={{ filter: 'drop-shadow(0 8px 24px rgba(249,115,22,0.45))' }}
            >
              📅
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white font-['Outfit'] leading-tight tracking-tight mb-2">
                Plan Your <span className="text-gradient-orange">Week</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base font-['Plus_Jakarta_Sans'] leading-relaxed max-w-md">
                Organize your meals ahead of time and never wonder what's for dinner again.
              </p>
            </div>
          </div>

          {/* Right: Week Navigator Controls */}
          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0 flex-wrap bg-[#141722]/90 border border-white/10 p-2 rounded-2xl shadow-xl">
            <button 
              onClick={() => setWeekOffset(prev => prev - 1)}
              title="Previous Week"
              className="w-10 h-10 rounded-xl bg-[#1A1D2B] border border-white/10 flex items-center justify-center text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="bg-[#10121A] border border-white/5 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl whitespace-nowrap">
              {weekRangeLabel}
            </div>

            <button 
              onClick={() => setWeekOffset(prev => prev + 1)}
              title="Next Week"
              className="w-10 h-10 rounded-xl bg-[#1A1D2B] border border-white/10 flex items-center justify-center text-white hover:bg-orange-500/20 hover:border-orange-500/40 transition-all"
            >
              <ChevronRight size={18} />
            </button>

            <button 
              onClick={() => setWeekOffset(0)}
              className={`text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all ${
                weekOffset === 0
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-[#1A1D2B] border border-white/10 text-orange-400 hover:bg-white/10'
              }`}
            >
              Today
            </button>

            <button
              onClick={clearWholeWeek}
              title="Clear all meals from this week"
              className="w-10 h-10 rounded-xl bg-[#1A1D2B] border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* ══ PLANNER GRID — DESKTOP (md+) ══ */}
        <div className="hidden md:block w-full overflow-x-auto pb-4 custom-scrollbar mb-8">
          <div className="min-w-[900px]">
            
            {/* ── Day Headers ── */}
            <div className="flex mb-3">
              <div className="w-[95px] shrink-0" />
              <div className="flex-1 grid grid-cols-7 gap-3">
                {weekDays.map(day => (
                  <div 
                    key={day.key} 
                    className={`text-center py-2.5 px-2 rounded-2xl border transition-all ${
                      day.isToday 
                        ? 'bg-orange-500/15 border-orange-500/40 shadow-lg shadow-orange-500/10' 
                        : 'bg-[#12141D] border-white/5'
                    }`}
                  >
                    <p className={`font-extrabold text-sm sm:text-base font-['Outfit'] ${day.isToday ? 'text-orange-400' : 'text-white'}`}>
                      {day.label}
                    </p>
                    <p className="text-gray-400 text-xs font-semibold mt-0.5">{day.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Meal Rows ── */}
            {ROWS.map(row => (
              <div key={row.key} className="flex gap-3 mb-3">
                <div className="w-[95px] shrink-0 flex flex-col items-center justify-start">
                  <div className={`w-full h-full min-h-[140px] rounded-3xl bg-gradient-to-b ${row.bg} border ${row.border} flex flex-col items-center justify-center py-4 gap-1.5 shadow-lg`}>
                    <span className="text-3xl">{row.icon}</span>
                    <span className="text-white text-xs font-bold tracking-wide">{row.label}</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-3">
                  {weekDays.map(day => {
                    const meal = plan[day.key]?.[row.key];
                    return (
                      <div key={day.key} className="min-h-[140px]">
                        <AnimatePresence mode="wait">
                          {meal ? (
                            <motion.div
                              key={meal.id + day.key + row.key}
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.88 }}
                              onClick={() => navigate(`/recipe/${meal.id}`)}
                              className="relative bg-[#141722] border border-white/10 hover:border-orange-500/40 rounded-3xl overflow-hidden group h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col"
                            >
                              <button
                                onClick={(e) => { e.stopPropagation(); removeMeal(day.key, row.key); }}
                                title="Remove meal"
                                className="absolute top-2.5 right-2.5 z-20 w-6 h-6 bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:border-red-500"
                              >
                                <X size={12} strokeWidth={3} />
                              </button>
                              <div className="w-full h-[85px] overflow-hidden bg-black relative flex-shrink-0">
                                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141722] via-transparent to-transparent" />
                              </div>
                              <div className="p-2.5 flex flex-col flex-1 justify-between">
                                <p className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors font-['Outfit']">{meal.name}</p>
                                <div className="flex items-center gap-1 text-gray-400 text-[10px] font-semibold mt-1">
                                  <Clock size={10} className="text-orange-400" />
                                  <span>{meal.time}</span>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => openAddModal(day.key, row.key)}
                              className="w-full h-full min-h-[140px] rounded-3xl border-2 border-dashed border-white/10 hover:border-orange-500/40 bg-[#10121A]/50 hover:bg-orange-500/5 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-orange-400 transition-all group"
                            >
                              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                                <Plus size={18} className="group-hover:scale-110 transition-transform" />
                              </div>
                              <span className="text-[11px] font-bold">Add Meal</span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PLANNER — MOBILE (< md): Vertical Day Cards ══ */}
        <div className="md:hidden space-y-3 mb-8">
          {weekDays.map(day => (
            <motion.div
              key={day.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border overflow-hidden ${
                day.isToday
                  ? 'border-orange-500/40 shadow-lg shadow-orange-500/10'
                  : 'border-white/8'
              }`}
            >
              {/* Day Header */}
              <div className={`flex items-center gap-3 px-4 py-3 ${
                day.isToday ? 'bg-orange-500/15' : 'bg-[#12141D]'
              }`}>
                <div className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center shrink-0 ${
                  day.isToday ? 'bg-orange-500 shadow-md shadow-orange-500/40' : 'bg-[#1A1D2B] border border-white/10'
                }`}>
                  <span className={`text-xs font-black leading-none ${day.isToday ? 'text-white' : 'text-gray-300'}`}>
                    {day.label}
                  </span>
                </div>
                <div>
                  <p className={`font-extrabold text-sm font-['Outfit'] ${day.isToday ? 'text-orange-400' : 'text-white'}`}>
                    {day.label}{day.isToday && ' — Today'}
                  </p>
                  <p className="text-gray-400 text-xs">{day.date}</p>
                </div>
                {/* Day total meals badge */}
                {(() => {
                  const dayMeals = ROWS.filter(r => plan[day.key]?.[r.key]).length;
                  return dayMeals > 0 ? (
                    <span className="ml-auto bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                      {dayMeals} meal{dayMeals > 1 ? 's' : ''}
                    </span>
                  ) : null;
                })()}
              </div>

              {/* Meal Rows for this Day */}
              <div className="bg-[#0D0F16] divide-y divide-white/5">
                {ROWS.map(row => {
                  const meal = plan[day.key]?.[row.key];
                  return (
                    <div key={row.key} className="flex items-center gap-3 px-4 py-3">
                      {/* Meal type icon */}
                      <div className={`w-9 h-9 rounded-xl shrink-0 bg-gradient-to-br ${row.bg} border ${row.border} flex items-center justify-center`}>
                        <span className="text-lg">{row.icon}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-400 w-[62px] shrink-0">{row.label}</span>

                      {/* Meal content or Add button */}
                      <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                          {meal ? (
                            <motion.div
                              key={meal.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              onClick={() => navigate(`/recipe/${meal.id}`)}
                              className="flex items-center gap-2.5 cursor-pointer group"
                            >
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                <img
                                  src={meal.image}
                                  alt={meal.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-bold leading-snug truncate group-hover:text-orange-400 transition-colors font-['Outfit']">
                                  {meal.name}
                                </p>
                                <div className="flex items-center gap-1 text-gray-500 text-[10px] mt-0.5">
                                  <Clock size={9} className="text-orange-400 shrink-0" />
                                  <span>{meal.time}</span>
                                </div>
                              </div>
                              <button
                                onClick={e => { e.stopPropagation(); removeMeal(day.key, row.key); }}
                                className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shrink-0"
                                title="Remove"
                              >
                                <X size={12} strokeWidth={3} />
                              </button>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => openAddModal(day.key, row.key)}
                              className="flex items-center gap-2 text-gray-500 hover:text-orange-400 transition-colors group w-full"
                            >
                              <div className="w-8 h-8 rounded-xl border border-dashed border-white/15 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 flex items-center justify-center transition-all">
                                <Plus size={14} />
                              </div>
                              <span className="text-xs font-semibold">Add {row.label}</span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ══ THIS WEEK AT A GLANCE ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-[#12100A] mb-12 shadow-[0_0_60px_-15px_rgba(249,115,22,0.2)]"
        >
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-7 sm:p-10">
            {/* Left stats */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-6">
                This Week at a Glance
              </h2>

              <div className="flex flex-wrap gap-8 sm:gap-12 mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/10">
                    🍽️
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl sm:text-3xl leading-none font-['Outfit']">{stats.count}</p>
                    <p className="text-gray-400 text-xs font-semibold mt-1">meals planned</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/10">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl sm:text-3xl leading-none font-['Outfit']">Avg</p>
                    <p className="text-gray-400 text-xs font-semibold mt-1">{stats.avg} min/meal</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/10">
                    <ShoppingCart size={22} />
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl sm:text-3xl leading-none font-['Outfit']">{stats.ingredients}</p>
                    <p className="text-gray-400 text-xs font-semibold mt-1">ingredients needed</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5">
                <button 
                  onClick={generateGroceryFromPlan}
                  className="flex items-center gap-2.5 btn-gradient-orange text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40"
                >
                  <ShoppingCart size={18} /> Generate Grocery List
                </button>
                <button 
                  onClick={shareMealPlan}
                  className="flex items-center gap-2 bg-[#1E1C18] border border-white/10 hover:border-white/20 text-white px-6 py-3.5 rounded-full font-bold text-sm transition-all"
                >
                  <Share2 size={18} /> Share Meal Plan
                </button>
              </div>
            </div>

            {/* Right: 3D Illustration */}
            <div className="relative w-48 h-44 sm:w-56 sm:h-52 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-[50px]" />
              <img
                src="/images/mini_bowl_3d.jpg"
                alt="3D Dish"
                className="w-full h-full object-contain mix-blend-screen scale-110"
                style={{ filter: 'drop-shadow(0 10px 30px rgba(249,115,22,0.35))' }}
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ══ ENHANCED ADD MEAL MODAL WITH SEARCH & CATEGORY FILTERS ══ */}
      <AnimatePresence>
        {addModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setAddModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93 }}
              className="relative bg-[#12141D] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                    Add Meal to <span className="text-orange-400 capitalize">{addModal.day} ({addModal.row})</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Select any recipe to schedule for this slot</p>
                </div>
                <button
                  onClick={() => setAddModal(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar & Category Filter Container */}
              <div className="flex flex-col gap-3 mb-4 relative z-10">
                <div className="relative w-full">
                  <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search recipes by name, ingredient, or tag..."
                    value={modalSearch}
                    onChange={e => setModalSearch(e.target.value)}
                    className="w-full bg-[#181B26] border border-white/10 focus:border-orange-500 rounded-2xl py-3.5 pl-11 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { key: 'All', label: 'All', icon: '✨' },
                    { key: 'Breakfast', label: 'Breakfast', icon: '🍳' },
                    { key: 'Lunch', label: 'Lunch', icon: '🥗' },
                    { key: 'Dinner', label: 'Dinner', icon: '🍖' },
                    { key: 'Snacks', label: 'Snacks', icon: '🍟' },
                    { key: 'Desserts', label: 'Desserts', icon: '🎂' },
                  ].map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setModalCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        modalCategory === cat.key
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                          : 'bg-[#181B26] text-gray-300 hover:text-white hover:bg-white/10 border border-white/8'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar relative z-10 my-2">
                {modalFilteredRecipes.length === 0 ? (
                  <div className="py-16 text-center text-gray-500">
                    <p className="text-white font-bold text-base mb-1 font-['Outfit']">No matching recipes</p>
                    <p className="text-xs text-gray-400">Try a different search term or category filter.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {modalFilteredRecipes.map(recipe => (
                      <button
                        key={recipe.id}
                        onClick={() => addMealFromModal(recipe)}
                        className="flex items-center gap-3.5 bg-[#181B26] border border-white/8 hover:border-orange-500/40 rounded-2xl p-3 text-left transition-all group hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                          onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-bold text-sm line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors font-['Outfit']">
                            {recipe.name}
                          </p>
                          <div className="flex items-center gap-2.5 text-gray-400 text-xs mt-1.5">
                            <span className="flex items-center gap-1 text-[11px]"><Clock size={11} className="text-orange-400" /> {recipe.time}</span>
                            <span className="text-[10px] font-bold uppercase text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-md">{recipe.category}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 relative z-10 mt-auto">
                <span>Showing {modalFilteredRecipes.length} recipes</span>
                <button
                  onClick={() => setAddModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grocery Modal */}
      <GroceryListModal
        isOpen={isGroceryModalOpen}
        onClose={() => setIsGroceryModalOpen(false)}
      />

    </div>
  );
}
