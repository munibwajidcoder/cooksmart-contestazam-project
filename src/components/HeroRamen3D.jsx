import React from 'react';

export default function HeroRamen3D() {
  return (
    <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center select-none">
      {/* Background Warm Atmosphere Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-[70%] h-[70%] bg-orange-500/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Golden Glowing Orbital Rings encircling the bowl at dynamic angles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="goldOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA000" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFD54F" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#FF6D00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFAB00" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary tilted orbital ring */}
        <ellipse 
          cx="300" cy="300" rx="260" ry="110" 
          fill="none" 
          stroke="url(#goldOrbit)" 
          strokeWidth="2.5" 
          strokeDasharray="12 8 4 8"
          transform="rotate(-18 300 300)"
          filter="url(#glow)"
          className="opacity-80"
        />

        {/* Secondary subtle orbital ring */}
        <ellipse 
          cx="300" cy="300" rx="230" ry="90" 
          fill="none" 
          stroke="#FFB300" 
          strokeWidth="1.5" 
          strokeOpacity="0.5"
          transform="rotate(25 300 300)"
          strokeDasharray="6 6"
        />

        {/* Glowing orbit particles */}
        <circle cx="120" cy="220" r="3" fill="#FFE082" filter="url(#glow)" />
        <circle cx="480" cy="360" r="4" fill="#FFB74D" filter="url(#glow)" />
        <circle cx="340" cy="170" r="2.5" fill="#FFF" filter="url(#glow)" />
      </svg>

      {/* Floating 3D Ingredients around the bowl */}
      
      {/* 1. Floating Cherry Tomato (Top Center-Left) */}
      <div className="absolute top-[3%] left-[26%] z-30 animate-float" style={{ animationDuration: '4.5s' }}>
        <svg className="w-20 h-20 drop-shadow-[0_16px_24px_rgba(220,38,38,0.55)]" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="tomato3D" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="35%" stopColor="#EF4444" />
              <stop offset="70%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#450A0A" />
            </radialGradient>
            <radialGradient id="tomatoSpec" cx="30%" cy="25%" r="25%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="54" r="38" fill="url(#tomato3D)" />
          <ellipse cx="40" cy="40" rx="16" ry="10" fill="url(#tomatoSpec)" transform="rotate(-25 40 40)" />
          {/* Calyx & Stem */}
          <path d="M50 18 C 45 8, 38 6, 32 4" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 18 C 55 8, 64 6, 70 4" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 18 C 44 22, 32 24, 26 28" stroke="#15803D" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 18 C 56 22, 68 24, 74 28" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M50 18 L50 6" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Floating Red Chili Pepper (Top Right) */}
      <div className="absolute top-[12%] right-[1%] z-30 animate-float-reverse" style={{ animationDuration: '5s' }}>
        <svg className="w-24 h-24 drop-shadow-[0_18px_28px_rgba(239,68,68,0.6)] -rotate-45" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="chili3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="85%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
            <linearGradient id="chiliSpec" x1="20%" y1="20%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M28 28 C 55 18, 100 32, 104 78 C 106 95, 96 106, 88 106 C 78 106, 72 84, 56 64 C 42 46, 28 34, 28 28 Z" fill="url(#chili3D)" />
          <path d="M40 32 C 60 28, 88 40, 92 68" stroke="url(#chiliSpec)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M28 28 C 22 22, 16 18, 10 20" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M26 24 L32 30" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Floating Garlic Clove (Top Right below chili) */}
      <div className="absolute top-[28%] right-[8%] z-30 animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
        <svg className="w-14 h-14 drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] rotate-12" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="garlic3D" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F5ECE1" />
              <stop offset="85%" stopColor="#D5C1A5" />
              <stop offset="100%" stopColor="#8C7153" />
            </radialGradient>
          </defs>
          <path d="M50 15 C 68 35, 82 62, 76 80 C 70 94, 42 94, 32 86 C 22 75, 34 38, 50 15 Z" fill="url(#garlic3D)" />
          <path d="M50 15 L48 8" stroke="#8C7153" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 4. Floating Onion Slice / Shallot (Bottom Left) */}
      <div className="absolute bottom-[20%] left-[6%] z-30 animate-float-slow" style={{ animationDelay: '1.8s' }}>
        <svg className="w-16 h-16 drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)] -rotate-12" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="shallotGrad" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFF9EB" />
              <stop offset="60%" stopColor="#E9C28E" />
              <stop offset="90%" stopColor="#B47936" />
              <stop offset="100%" stopColor="#6C4113" />
            </radialGradient>
          </defs>
          <path d="M20 70 C 20 40, 45 20, 75 25 C 85 45, 75 75, 45 80 C 30 82, 20 78, 20 70 Z" fill="url(#shallotGrad)" />
          <path d="M28 64 C 32 46, 48 34, 68 36" stroke="#D4A367" strokeWidth="2.5" fill="none" opacity="0.7" />
        </svg>
      </div>

      {/* 5. Floating Fresh Green Herb Leaves */}
      <div className="absolute top-[42%] left-[4%] z-30 animate-float" style={{ animationDelay: '0.8s' }}>
        <svg className="w-12 h-12 drop-shadow-[0_10px_16px_rgba(34,197,94,0.4)] rotate-45" viewBox="0 0 80 80">
          <defs>
            <radialGradient id="basilGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#14532D" />
            </radialGradient>
          </defs>
          <path d="M15 65 C 15 35, 35 15, 65 10 C 55 40, 35 55, 15 65 Z" fill="url(#basilGrad)" />
          <path d="M15 65 Q 35 40 65 10" stroke="#86EFAC" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* 6. Floating 3D Golden & Green Flavor Cubes */}
      <div className="absolute top-[26%] left-[15%] w-4 h-4 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 rounded-sm shadow-[0_0_15px_#F59E0B] rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[18%] right-[18%] w-3.5 h-3.5 bg-gradient-to-tr from-orange-600 to-amber-300 rounded-sm shadow-[0_0_12px_#F59E0B] -rotate-45 animate-float-slow" style={{ animationDelay: '2.2s' }} />
      <div className="absolute bottom-[28%] right-[8%] w-4 h-4 bg-gradient-to-tr from-emerald-600 via-green-400 to-emerald-200 rounded-sm shadow-[0_0_12px_#10B981] rotate-45 animate-float" style={{ animationDelay: '1.4s' }} />
      <div className="absolute bottom-[36%] left-[12%] w-3 h-3 bg-gradient-to-tr from-amber-500 to-yellow-200 rounded-sm shadow-[0_0_10px_#F59E0B] rotate-30 animate-float-reverse" style={{ animationDelay: '2.8s' }} />

      {/* Rising Steam Wisps from the hot bowl */}
      <div className="absolute top-[16%] left-[44%] z-20 pointer-events-none">
        <div className="w-8 h-20 bg-gradient-to-t from-white/35 to-transparent rounded-full blur-md animate-steam-1" />
      </div>
      <div className="absolute top-[13%] left-[54%] z-20 pointer-events-none">
        <div className="w-10 h-24 bg-gradient-to-t from-amber-200/30 to-transparent rounded-full blur-md animate-steam-2" />
      </div>
      <div className="absolute top-[18%] left-[36%] z-20 pointer-events-none">
        <div className="w-7 h-16 bg-gradient-to-t from-white/25 to-transparent rounded-full blur-md animate-steam-3" />
      </div>

      {/* Center 3D Ramen Bowl on Pedestal */}
      <div className="relative z-20 w-[88%] max-w-[480px] flex flex-col items-center">
        
        {/* Main 3D Bowl Render with Rich Toppings (Chashu pork, egg halves, mushrooms, noodles, scallions, corn) */}
        <div className="relative w-full aspect-square flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]" viewBox="0 0 500 500">
            <defs>
              {/* Ceramic Bowl Outer Shading */}
              <radialGradient id="bowlOuter" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#2D323F" />
                <stop offset="40%" stopColor="#1E212B" />
                <stop offset="85%" stopColor="#111319" />
                <stop offset="100%" stopColor="#08090C" />
              </radialGradient>

              {/* Bowl Rim Golden Glow */}
              <linearGradient id="bowlRimGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD54F" />
                <stop offset="30%" stopColor="#FFA000" />
                <stop offset="70%" stopColor="#FF6D00" />
                <stop offset="100%" stopColor="#FF8F00" />
              </linearGradient>

              {/* Rich Golden Broth */}
              <radialGradient id="brothGrad" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="40%" stopColor="#D97706" />
                <stop offset="80%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </radialGradient>

              {/* Egg Yolk Rich Gradient */}
              <radialGradient id="eggYolk" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="25%" stopColor="#FBBF24" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="90%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </radialGradient>

              {/* Chashu Pork */}
              <radialGradient id="chashuGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="40%" stopColor="#B45309" />
                <stop offset="75%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </radialGradient>

              {/* Mushroom Shading */}
              <radialGradient id="mushroomGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#78716C" />
                <stop offset="60%" stopColor="#44403C" />
                <stop offset="100%" stopColor="#1C1917" />
              </radialGradient>
            </defs>

            {/* Dark Metallic Pedestal Base */}
            <ellipse cx="250" cy="430" rx="190" ry="38" fill="#0A0B0F" stroke="#333A48" strokeWidth="2" />
            <ellipse cx="250" cy="425" rx="175" ry="30" fill="#141722" stroke="url(#bowlRimGold)" strokeWidth="2" opacity="0.8" />
            <ellipse cx="250" cy="420" rx="160" ry="22" fill="#0D0F16" />

            {/* Bowl Body */}
            <path d="M 70 200 C 70 380, 430 380, 430 200 Z" fill="url(#bowlOuter)" stroke="url(#bowlRimGold)" strokeWidth="3" />
            
            {/* Bowl Rim Ellipse */}
            <ellipse cx="250" cy="200" rx="180" ry="80" fill="#1A1D27" stroke="url(#bowlRimGold)" strokeWidth="3.5" />
            <ellipse cx="250" cy="200" rx="172" ry="74" fill="url(#brothGrad)" />

            {/* Noodle Strands Swirling */}
            <g stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9">
              <path d="M 160 210 Q 200 240 240 215 Q 280 190 320 220" />
              <path d="M 140 225 Q 190 260 250 230 Q 300 205 350 235" />
              <path d="M 180 195 Q 220 225 270 205 Q 310 185 340 210" />
              <path d="M 210 240 Q 250 265 290 245 Q 330 225 360 250" />
            </g>

            {/* Chashu Pork Slices (Right & Center) */}
            <g transform="translate(240, 160) rotate(-15)">
              <ellipse cx="60" cy="50" rx="55" ry="32" fill="url(#chashuGrad)" stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 3" />
              <ellipse cx="60" cy="50" rx="42" ry="22" fill="#92400E" stroke="#FEF3C7" strokeWidth="1.5" />
              <ellipse cx="60" cy="50" rx="26" ry="14" fill="#78350F" />
            </g>

            <g transform="translate(180, 195) rotate(10)">
              <ellipse cx="50" cy="45" rx="48" ry="28" fill="url(#chashuGrad)" stroke="#FDE68A" strokeWidth="2" strokeDasharray="5 3" />
              <ellipse cx="50" cy="45" rx="36" ry="19" fill="#92400E" />
            </g>

            {/* Soft-Boiled Ajitsuke Tamago Egg Halves (Left) */}
            {/* Egg 1 */}
            <g transform="translate(130, 150) rotate(-10)">
              {/* White */}
              <ellipse cx="40" cy="40" rx="36" ry="46" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
              {/* Golden Yolk */}
              <ellipse cx="40" cy="44" rx="24" ry="28" fill="url(#eggYolk)" />
              {/* Specular Shine */}
              <ellipse cx="33" cy="36" rx="7" ry="4" fill="#FFF" opacity="0.8" transform="rotate(-20 33 36)" />
            </g>

            {/* Egg 2 */}
            <g transform="translate(195, 230) rotate(15)">
              <ellipse cx="32" cy="32" rx="28" ry="36" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
              <ellipse cx="32" cy="34" rx="18" ry="22" fill="url(#eggYolk)" />
              <ellipse cx="27" cy="28" rx="5" ry="3" fill="#FFF" opacity="0.8" />
            </g>

            {/* Shiitake Mushrooms (Top Center) */}
            <g transform="translate(260, 135)">
              <path d="M 10 35 C 10 15, 50 15, 50 35 Z" fill="url(#mushroomGrad)" />
              <path d="M 20 20 L 40 28 M 30 18 L 30 32 M 40 20 L 20 28" stroke="#A8A29E" strokeWidth="1.5" />
              <path d="M 45 42 C 45 25, 80 25, 80 42 Z" fill="url(#mushroomGrad)" />
            </g>

            {/* Sweet Corn Kernels */}
            <g fill="#FBBF24" stroke="#D97706" strokeWidth="1">
              <circle cx="340" cy="210" r="6" />
              <circle cx="352" cy="205" r="5.5" />
              <circle cx="360" cy="215" r="6" />
              <circle cx="348" cy="222" r="5.5" />
              <circle cx="338" cy="228" r="6" />
              <circle cx="358" cy="228" r="5" />
            </g>

            {/* Scallions / Green Onions */}
            <g fill="#22C55E" stroke="#15803D" strokeWidth="1">
              <ellipse cx="230" cy="210" rx="5" ry="3" />
              <ellipse cx="242" cy="204" rx="6" ry="3.5" />
              <ellipse cx="238" cy="218" rx="5" ry="3" />
              <ellipse cx="250" cy="212" rx="6" ry="3.5" />
              <ellipse cx="225" cy="225" rx="5" ry="3" />
              <ellipse cx="245" cy="226" rx="5.5" ry="3" />
            </g>

            {/* Nori Seaweed Sheets (Top Left Rim) */}
            <rect x="90" y="140" width="40" height="55" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" transform="rotate(-25 90 140)" />
            <rect x="115" y="130" width="38" height="52" rx="4" fill="#022C22" stroke="#064E3B" strokeWidth="1.5" transform="rotate(-15 115 130)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
