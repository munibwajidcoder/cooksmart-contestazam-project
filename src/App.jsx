import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Categories from './pages/Categories';
import RecipeDetail from './pages/RecipeDetail';
import AISuggestion from './pages/AISuggestion';
import MealPlanner from './pages/MealPlanner';
import Favourites from './pages/Favourites';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import UserPreferenceModal from './components/UserPreferenceModal';
import AISuggestionModal from './components/AISuggestionModal';

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
          <Route 
            path="/recipes" 
            element={<Recipes />} 
          />
          <Route 
            path="/categories" 
            element={<Categories />} 
          />
          <Route 
            path="/recipe/:id" 
            element={<RecipeDetail />} 
          />
          <Route path="/ai-suggestion" element={<AISuggestion />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
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
