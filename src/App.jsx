import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserPreferenceModal from './components/UserPreferenceModal';
import AISuggestionModal from './components/AISuggestionModal';

// ── Lazy load all pages (Code Splitting for faster mobile load) ──
const Home        = lazy(() => import('./pages/Home'));
const Recipes     = lazy(() => import('./pages/Recipes'));
const Categories  = lazy(() => import('./pages/Categories'));
const RecipeDetail= lazy(() => import('./pages/RecipeDetail'));
const AISuggestion= lazy(() => import('./pages/AISuggestion'));
const MealPlanner = lazy(() => import('./pages/MealPlanner'));
const Favourites  = lazy(() => import('./pages/Favourites'));
const AboutUs     = lazy(() => import('./pages/AboutUs'));
const Contact     = lazy(() => import('./pages/Contact'));
const CookingTips = lazy(() => import('./pages/CookingTips'));

// ── Page Loading Skeleton ──
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0A0B0E]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
      <p className="text-gray-400 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white font-['Plus_Jakarta_Sans'] selection:bg-[#FF6B00] selection:text-white antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar 
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenUserPreference={() => setIsPreferenceModalOpen(true)}
      />
      
      {/* Main Content Area */}
      <main className="w-full pt-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenAI={() => setIsAIModalOpen(true)}
                  onOpenUserPreference={() => setIsPreferenceModalOpen(true)}
                />
              } 
            />
            <Route path="/recipes"      element={<Recipes />} />
            <Route path="/categories"   element={<Categories />} />
            <Route path="/recipe/:id"   element={<RecipeDetail />} />
            <Route path="/ai-suggestion" element={<AISuggestion />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/cooking-tips" element={<CookingTips />} />
            <Route path="/favourites"   element={<Favourites />} />
            <Route path="/favorites"    element={<Favourites />} />
            <Route path="/about-us"     element={<AboutUs />} />
            <Route path="/about"        element={<AboutUs />} />
            <Route path="/contact"      element={<Contact />} />
            {/* Wildcard Fallback */}
            <Route 
              path="*" 
              element={
                <Home 
                  onOpenAI={() => setIsAIModalOpen(true)}
                  onOpenUserPreference={() => setIsPreferenceModalOpen(true)}
                />
              } 
            />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer onOpenAI={() => setIsAIModalOpen(true)} />

      {/* Interactive Global Modals */}
      <UserPreferenceModal 
        isOpen={isPreferenceModalOpen}
        onClose={() => setIsPreferenceModalOpen(false)}
      />
      <AISuggestionModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
    </div>
  );
}

export default App;

