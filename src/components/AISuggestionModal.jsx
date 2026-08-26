import React, { useState } from 'react';
import { Sparkles, ChefHat, ArrowRight, X, Loader2, CheckCircle2, Clock, Flame } from 'lucide-react';

export default function AISuggestionModal({ isOpen, onClose, initialQuery = '' }) {
  const [ingredients, setIngredients] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setGeneratedRecipe(null);

    // AI simulation based on ingredients
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedRecipe({
        name: `AI Chef's Special: ${ingredients.split(',')[0]} Sauté Supreme`,
        time: '20 min',
        difficulty: 'Easy',
        calories: '420 kcal',
        description: `Custom AI-engineered recipe crafted specifically around your available pantry items: ${ingredients}.`,
        ingredients: [
          ...ingredients.split(',').map(item => `Fresh ${item.trim()}`),
          '2 tbsp Virgin Olive Oil',
          '2 cloves Fresh Garlic (minced)',
          'Sea Salt & Freshly Cracked Pepper',
          'Pinch of Oregano & Chili Flakes'
        ],
        steps: [
          'Wash and prep all ingredients into bite-sized uniform cuts.',
          'Heat olive oil in a wide skillet over medium-high heat until shimmering.',
          'Toss in minced garlic and sauté for 45 seconds until fragrant.',
          `Add ${ingredients} and cook for 6-8 minutes, stirring frequently.`,
          'Season with sea salt, black pepper, and herbs before serving hot.'
        ],
        aiTip: 'Pair with a squeeze of fresh lemon juice at the end to elevate natural flavors!'
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#141620] border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_70px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Recipe Creator</h2>
            <p className="text-xs text-purple-400 font-medium">Powered by CookSmart Smart Cooking Intelligence</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="mb-6">
          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
            Enter the ingredients you have at home:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="e.g. chicken, garlic, rice, tomatoes..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1 bg-[#0D0F15] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none transition-colors text-sm"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Thinking...
                </>
              ) : (
                <>
                  Generate Recipe <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI Output Card */}
        {generatedRecipe && (
          <div className="bg-[#1B1E2B] border border-purple-500/30 rounded-2xl p-6 space-y-5 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                  <Sparkles size={12} /> AI Recommended
                </span>
                <h3 className="text-xl font-bold text-white">{generatedRecipe.name}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="flex items-center gap-1"><Clock size={14} className="text-orange-400" /> {generatedRecipe.time}</span>
                <span className="flex items-center gap-1"><Flame size={14} className="text-red-400" /> {generatedRecipe.difficulty}</span>
              </div>
            </div>

            <p className="text-sm text-gray-300">{generatedRecipe.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2.5">Required Ingredients</h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {generatedRecipe.ingredients.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2.5">Cooking Steps</h4>
                <ol className="space-y-2 text-xs text-gray-300 list-decimal list-inside">
                  {generatedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="text-white">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 flex items-center gap-2">
              <ChefHat size={18} className="text-orange-400 shrink-0" />
              <span><strong>AI Chef's Tip:</strong> {generatedRecipe.aiTip}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
