import React from 'react';

// --- Hero 3D Centerpiece Scene using exact extracted high-resolution 3D artwork ---
export function Hero3DBowl() {
  return (
    <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[440px] lg:max-w-[600px] aspect-square sm:aspect-[10/9] flex items-center justify-center select-none mx-auto">
      {/* Background Ambient Warm Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00]/25 via-[#FFA844]/15 to-transparent rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />
      
      {/* Exact 3D Photorealistic Signature Ramen Bowl with Steam, Floating Ingredients & Orbital Rings */}
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-float" style={{ animationDuration: '6s' }}>
        <img 
          src="/images/hero_3d_ramen_bowl_v2.jpg" 
          alt="CookSmart 3D Signature Ramen Bowl" 
          className="w-full h-full object-contain mix-blend-screen hover:scale-105 transition-transform duration-700 pointer-events-auto cursor-pointer rounded-[2rem]"
          onError={e => { e.target.src = '/images/cat_dinner_3d.jpg'; }}
        />
      </div>
    </div>
  );
}

// --- 3D Stats Icons using exact extracted images ---
export function IconRecipeBook() {
  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
      <img src="/images/stat_book_3d.jpg" alt="50+ Recipes" className="w-full h-full object-cover drop-shadow-md" />
    </div>
  );
}

export function IconPlateCategories() {
  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
      <img src="/images/stat_plate_3d.jpg" alt="5 Categories" className="w-full h-full object-cover drop-shadow-md" />
    </div>
  );
}

export function IconBrainAIPower() {
  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
      <img src="/images/stat_brain_3d.jpg" alt="AI Powered" className="w-full h-full object-cover drop-shadow-md" />
    </div>
  );
}

// --- 3D AI Robot Chef Scene using exact extracted artwork ---
export function AIRobotChefScene() {
  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[420px] lg:max-w-[540px] h-[200px] sm:h-[300px] lg:h-[380px] flex items-center justify-center lg:justify-end select-none mx-auto">
      {/* Magic Purple Glow that moves */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none animate-pulse-glow" />
      <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-[50px] pointer-events-none animate-float" style={{ animationDuration: '8s' }} />

      <img 
        src="/images/robot_chef_3d.jpg" 
        alt="AI Robot Chef" 
        className="w-full h-full object-contain relative z-10 mix-blend-screen hover:scale-105 transition-transform duration-500 rounded-[1.5rem]"
        onError={e => { e.target.src = '/images/cat_lunch_3d.jpg'; }}
      />
    </div>
  );
}
