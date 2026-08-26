import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, X, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserPreferenceModal({ isOpen: externalIsOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [preferredCategory, setPreferredCategory] = useState('Dinner');
  const [savedUser, setSavedUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Load saved user
  useEffect(() => {
    try {
      const u = localStorage.getItem('cooksmart_user');
      if (u) setSavedUser(JSON.parse(u));
    } catch {}
  }, []);

  // Auto-open on first visit
  useEffect(() => {
    const u = localStorage.getItem('cooksmart_user');
    if (!u) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // React to external open trigger (profile button click)
  useEffect(() => {
    if (externalIsOpen) {
      const u = localStorage.getItem('cooksmart_user');
      if (u) {
        // Already has profile → show profile dropdown instead
        setSavedUser(JSON.parse(u));
        setShowProfileMenu(true);
      } else {
        setIsOpen(true);
      }
    }
  }, [externalIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setShowProfileMenu(false);
    onClose?.();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const userData = { name: name.trim(), preferredCategory };
    localStorage.setItem('cooksmart_user', JSON.stringify(userData));
    setSavedUser(userData);
    setIsOpen(false);
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.removeItem('cooksmart_user');
    setSavedUser(null);
    setShowProfileMenu(false);
    onClose?.();
  };

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    if (savedUser) setName(savedUser.name);
    setIsOpen(true);
  };

  return (
    <>
      {/* ── Profile Dropdown Menu (if user already set up) ── */}
      <AnimatePresence>
        {showProfileMenu && savedUser && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={handleClose} />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{ duration: 0.18 }}
              className="fixed top-[72px] right-6 z-50 w-64 bg-[#161822] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)' }}
            >
              {/* User info header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-orange-500/10 to-amber-500/5 border-b border-white/8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-base shadow-md shadow-orange-500/30 shrink-0">
                  {savedUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-black text-sm truncate font-['Outfit']">{savedUser.name}</p>
                  <p className="text-orange-400 text-xs font-semibold truncate">Fav: {savedUser.preferredCategory}</p>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <button
                  onClick={handleEditProfile}
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold text-left"
                >
                  <Settings size={16} className="text-orange-400" /> Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-sm font-semibold text-left"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Setup / Edit Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-md bg-[#161822] border border-orange-500/30 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                  <ChefHat size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white font-['Outfit']">
                    {savedUser ? 'Edit Profile' : 'Welcome to CookSmart!'}
                  </h2>
                  <p className="text-xs text-orange-400 font-semibold">Personalize your culinary experience</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    className="w-full bg-[#0E1017] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors font-['Plus_Jakarta_Sans']"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Preferred Recipe Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'].map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setPreferredCategory(cat)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          preferredCategory === cat
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/8'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gradient-orange text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-500/25"
                >
                  <Sparkles size={18} />
                  {savedUser ? 'Save Changes' : "Let's Start Cooking"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
