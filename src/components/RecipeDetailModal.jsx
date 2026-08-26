import React from 'react';
import { X, Clock, Flame, ChefHat, Heart, Calendar, Star, Check } from 'lucide-react';

export default function RecipeDetailModal({ recipe, isOpen, onClose, isFavorite, onToggleFavorite }) {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141722] border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col">
        {/* Header Hero Image */}
        <div className="relative h-64 w-full overflow-hidden bg-black shrink-0">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover opacity-90 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141722] via-[#141722]/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20 border border-white/10"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-md shadow-orange-500/30 mb-2 inline-block">
                {recipe.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                {recipe.name}
              </h2>
            </div>
            
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isFavorite 
                  ? 'bg-red-500 text-white shadow-red-500/40 scale-110' 
                  : 'bg-white/10 backdrop-blur-md text-white hover:text-red-400 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Heart size={22} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Quick Meta */}
          <div className="grid grid-cols-4 gap-3 bg-[#0D0F15] p-3.5 rounded-2xl border border-white/5 text-center">
            <div>
              <p className="text-[11px] text-gray-400">Prep & Cook</p>
              <p className="text-xs md:text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                <Clock size={13} className="text-orange-400" /> {recipe.time}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Difficulty</p>
              <p className="text-xs md:text-sm font-bold text-orange-400 flex items-center justify-center gap-1 mt-0.5">
                <Flame size={13} /> {recipe.difficulty}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Calories</p>
              <p className="text-xs md:text-sm font-bold text-white mt-0.5">{recipe.calories || '450 kcal'}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">Rating</p>
              <p className="text-xs md:text-sm font-bold text-yellow-400 flex items-center justify-center gap-1 mt-0.5">
                <Star size={13} fill="currentColor" /> {recipe.rating || 4.9}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{recipe.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
            <div>
              <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ChefHat size={16} /> Ingredients
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {recipe.ingredients?.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={16} /> Preparation Steps
              </h3>
              <ol className="space-y-2.5 text-xs text-gray-300">
                {recipe.steps?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {recipe.tips && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
              <ChefHat size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">Chef's Secret Tip:</strong>
                <span>{recipe.tips}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
