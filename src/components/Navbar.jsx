import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Menu, X, Home, BookOpen, Grid, Calendar, Heart, Info, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Recipes', path: '/recipes', icon: BookOpen },
  { name: 'Categories', path: '/categories', icon: Grid },
  { name: 'Meal Planner', path: '/meal-planner', icon: Calendar },
  { name: 'Favourites', path: '/favourites', icon: Heart },
  { name: 'About Us', path: '/about-us', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar({ onOpenAI, onOpenUserPreference }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0A0B0E]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
            <ChefHat size={20} className="sm:w-[22px] sm:h-[22px]" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit']">
            Cook<span className="text-orange-500">Smart</span>
          </span>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-[14.5px] font-medium text-gray-300">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`transition-all duration-200 relative py-1 ${
                  isActive ? 'text-orange-400 font-bold' : 'hover:text-orange-400 text-gray-300'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2.5px] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-[0_2px_10px_rgba(249,115,22,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Suggestion Button (Desktop & Tablet) */}
          <button 
            onClick={() => navigate('/ai-suggestion')}
            className="hidden sm:flex items-center gap-2 btn-gradient-orange text-white px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 shrink-0"
          >
            <Sparkles size={15} />
            <span>AI Suggestion</span>
          </button>

          {/* AI Suggestion Icon-Only on Mobile */}
          <button
            onClick={() => navigate('/ai-suggestion')}
            className="sm:hidden w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 shrink-0"
            title="AI Suggestion"
          >
            <Sparkles size={17} />
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenUserPreference}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181B26] hover:bg-orange-500/20 flex items-center justify-center text-white font-black text-sm shadow-md transition-all cursor-pointer border border-white/10 hover:border-orange-500/40 shrink-0"
            title="Preferences & Profile"
          >
            👤
          </button>

          {/* Mobile & Tablet Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-2xl bg-[#181B26] border border-white/10 hover:border-orange-500/40 flex items-center justify-center text-gray-300 hover:text-white transition-all ml-1 shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} className="text-orange-400" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE & TABLET SLIDE-DOWN DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-20 bg-black/80 backdrop-blur-md z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed top-20 left-0 right-0 max-h-[calc(100vh-5rem)] overflow-y-auto bg-[#0F111A] border-b border-white/10 shadow-2xl z-50 px-6 py-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-orange-400' : 'text-gray-400'} />
                      <span className="font-['Outfit']">{link.name}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                      )}
                    </Link>
                  );
                })}

                {/* Mobile CTA */}
                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/ai-suggestion');
                    }}
                    className="w-full btn-gradient-orange text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
                  >
                    <Sparkles size={16} />
                    Open AI Recipe Suggestion
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenUserPreference();
                    }}
                    className="w-full bg-[#181B26] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>👤</span> Manage Dietary Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
