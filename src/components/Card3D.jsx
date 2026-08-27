import React, { useRef, useCallback } from 'react';

/**
 * Card3D — A mouse-tracking 3D tilt card component.
 * Wrap any content in this to get a real-time 3D tilt effect.
 *
 * Props:
 *  - className: additional classes for the outer wrapper
 *  - intensity: tilt strength (default 12)
 *  - children: any content
 */
export default function Card3D({ children, className = '', intensity = 12, glare = true }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to +1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to +1

    const rotX = -dy * intensity;
    const rotY = dx * intensity;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03) translateZ(10px)`;
    card.style.transition = 'transform 0.05s ease';

    if (glare && glareRef.current) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.18) 0%, transparent 70%)`;
    }
  }, [intensity, glare]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [glare]);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
      {/* Glare overlay */}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
