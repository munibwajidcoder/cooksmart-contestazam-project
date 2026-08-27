import React from 'react';
import { motion } from 'framer-motion';

// High-quality realistic burger images (rotating for best pick)
const BURGER_URL = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=95&fit=crop&crop=center';

export default function AnimatedBurger3D() {
  return (
    <div
      className="relative w-full flex items-center justify-center select-none"
      style={{ minHeight: 360, overflow: 'visible' }}
    >
      {/* Deep ambient glow — layered for realism */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20% -15%',
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(251,146,60,0.28) 0%, rgba(249,115,22,0.15) 35%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '5% 10%',
          background:
            'radial-gradient(ellipse at 50% 65%, rgba(120,53,15,0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating + subtle tilt burger */}
      <motion.div
        animate={{
          y: [0, -22, 0],
          rotate: [0, 1.8, -1.5, 0],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Clip to circle to remove rectangular photo bg and show only burger */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(260px, 45vw, 480px)',
            aspectRatio: '1 / 1',
          }}
        >
          {/* Circular mask — crops tight around the burger */}
          <motion.img
            src={BURGER_URL}
            alt="3D Realistic Gourmet Burger"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%',
              borderRadius: '50%',
              filter:
                'drop-shadow(0 30px 60px rgba(0,0,0,0.75)) drop-shadow(0 0 40px rgba(251,146,60,0.3)) brightness(1.08) saturate(1.2) contrast(1.05)',
              display: 'block',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Inner vignette to blend edges into dark bg */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(10,11,14,0.85) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Rim light — warm orange ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-3px',
              borderRadius: '50%',
              background: 'transparent',
              boxShadow: '0 0 0 2px rgba(251,146,60,0.15), 0 0 50px 10px rgba(251,146,60,0.12)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Bottom shadow ellipse for ground depth */}
        <motion.div
          animate={{ scaleX: [1, 0.88, 1], opacity: [0.45, 0.3, 0.45] }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            marginTop: '-18px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '60%',
            height: 22,
            background:
              'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 80%)',
            filter: 'blur(8px)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* Orange sparkle particles */}
      {[
        { top: '8%',  left: '12%',  size: 7,  delay: 0    },
        { top: '18%', right: '10%', size: 9,  delay: 0.8  },
        { top: '55%', left: '5%',   size: 6,  delay: 1.5  },
        { bottom: '20%', right: '8%',  size: 8,  delay: 0.4  },
        { top: '3%',  left: '48%',  size: 5,  delay: 1.2  },
        { bottom: '10%', left: '20%', size: 6, delay: 2.0 },
      ].map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #fb923c 0%, #fbbf24 60%, transparent 100%)',
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
          }}
          animate={{ scale: [0, 1.6, 0], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: s.delay,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
}
