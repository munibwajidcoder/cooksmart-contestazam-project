import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBurger3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none" style={{ minHeight: 340 }}>
      
      {/* Soft orange glow behind burger */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 380, height: 380,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(251,146,60,0.22) 0%, rgba(251,146,60,0.10) 45%, transparent 72%)',
          filter: 'blur(20px)',
          borderRadius: '50%',
        }} />
      </div>

      {/* The Burger — floating + slow spin */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{ position: 'relative', zIndex: 10, filter: 'drop-shadow(0 40px 40px rgba(0,0,0,0.55))' }}
      >
        <svg
          width="420"
          height="320"
          viewBox="0 0 420 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible', maxWidth: '100%' }}
        >
          {/* ── Top Bun ── */}
          <ellipse cx="210" cy="100" rx="160" ry="85" fill="url(#bunTopGrad)" />
          {/* Bun highlight */}
          <ellipse cx="175" cy="70" rx="65" ry="28" fill="rgba(255,255,255,0.13)" />
          {/* Sesame seeds */}
          <ellipse cx="190" cy="62" rx="8" ry="4.5" fill="#c4822b" opacity="0.85" transform="rotate(-15 190 62)" />
          <ellipse cx="225" cy="55" rx="8" ry="4.5" fill="#c4822b" opacity="0.85" transform="rotate(10 225 55)" />
          <ellipse cx="258" cy="67" rx="8" ry="4.5" fill="#c4822b" opacity="0.85" transform="rotate(-8 258 67)" />
          <ellipse cx="160" cy="78" rx="7" ry="4" fill="#c4822b" opacity="0.75" transform="rotate(20 160 78)" />
          <ellipse cx="242" cy="82" rx="7" ry="4" fill="#c4822b" opacity="0.75" transform="rotate(-5 242 82)" />
          <ellipse cx="208" cy="50" rx="7" ry="4" fill="#c4822b" opacity="0.8" transform="rotate(5 208 50)" />

          {/* ── Lettuce ── */}
          <ellipse cx="210" cy="172" rx="168" ry="22" fill="#4ade80" />
          {/* Lettuce ruffles */}
          {[50,80,110,140,165,190,215,240,265,290,315,340,365].map((x, i) => (
            <ellipse key={i} cx={x} cy={i % 2 === 0 ? 165 : 172} rx="16" ry="12" fill={i%2===0 ? "#22c55e" : "#4ade80"} opacity="0.9" />
          ))}

          {/* ── Tomato ── */}
          <ellipse cx="210" cy="192" rx="155" ry="16" fill="#ef4444" opacity="0.95" />
          <ellipse cx="210" cy="192" rx="155" ry="10" fill="rgba(255,150,150,0.18)" />

          {/* ── Cheese ── */}
          <rect x="44" y="196" width="332" height="24" rx="6" fill="url(#cheeseGrad)" />
          {/* Cheese drips */}
          <path d="M80 220 Q78 236 82 232 Q86 228 84 220Z" fill="#f59e0b" />
          <path d="M150 220 Q147 240 152 236 Q157 232 154 220Z" fill="#f59e0b" />
          <path d="M300 220 Q297 238 302 234 Q307 230 304 220Z" fill="#f59e0b" />
          <path d="M360 220 Q357 234 362 230 Q367 226 364 220Z" fill="#f59e0b" />

          {/* ── Beef Patty ── */}
          <ellipse cx="210" cy="232" rx="162" ry="26" fill="url(#pattyGrad)" />
          {/* Grill marks */}
          <path d="M110 225 Q150 222 190 225" stroke="#3d1a06" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <path d="M115 235 Q155 232 195 235" stroke="#3d1a06" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <path d="M220 224 Q255 221 290 224" stroke="#3d1a06" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <path d="M225 234 Q260 231 295 234" stroke="#3d1a06" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          {/* Patty highlight */}
          <ellipse cx="210" cy="222" rx="100" ry="10" fill="rgba(255,180,100,0.12)" />

          {/* ── Bottom Bun ── */}
          <ellipse cx="210" cy="272" rx="165" ry="30" fill="url(#bunBottomGrad)" />
          <ellipse cx="210" cy="285" rx="165" ry="16" fill="#8B4513" opacity="0.5" />
          {/* Bottom bun bottom rim */}
          <ellipse cx="210" cy="290" rx="158" ry="12" fill="#6b3411" opacity="0.65" />

          {/* ── Shadow on ground ── */}
          <ellipse cx="210" cy="308" rx="130" ry="10" fill="rgba(0,0,0,0.22)" />

          {/* ── Gradients ── */}
          <defs>
            <radialGradient id="bunTopGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f5c97a" />
              <stop offset="55%" stopColor="#e8a945" />
              <stop offset="100%" stopColor="#b5711f" />
            </radialGradient>
            <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <radialGradient id="pattyGrad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a0522d" />
              <stop offset="55%" stopColor="#7a3b1e" />
              <stop offset="100%" stopColor="#4a200a" />
            </radialGradient>
            <linearGradient id="bunBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8a945" />
              <stop offset="100%" stopColor="#b5711f" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Sparkle particles */}
      {[
        { top: '12%', left: '10%', delay: 0 },
        { top: '22%', right: '8%', delay: 0.7 },
        { top: '60%', left: '6%', delay: 1.4 },
        { bottom: '18%', right: '12%', delay: 0.4 },
        { top: '5%', left: '40%', delay: 1.1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 8, height: 8,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fb923c 0%, #fbbf24 60%, transparent 100%)',
            ...pos,
          }}
          animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: pos.delay, repeatType: 'loop' }}
        />
      ))}
    </div>
  );
}
