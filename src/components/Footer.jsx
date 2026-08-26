import React from 'react';
import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenAI }) {
  return (
    <footer className="bg-[#0C0E14] border-t border-white/[0.06] pt-16 pb-12 mt-24 relative overflow-hidden">
      {/* Subtle bottom atmospheric glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14 relative z-10">
        
        {/* Col 1: Brand & Mini Bowl Illustration */}
        <div className="sm:col-span-2 lg:col-span-4 flex items-start gap-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <ChefHat size={22} />
              </div>
              <span className="text-2xl font-black text-white font-['Outfit']">
                Cook<span className="text-orange-500">Smart</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Smart Cooking & Recipe Discovery Portal
            </p>
          </div>

          {/* Mini 3D bowl illustration with ingredients */}
          <div className="relative w-20 h-20 shrink-0 hidden sm:block">
            <img 
              src="/images/mini_bowl_3d.jpg" 
              alt="CookSmart Portal" 
              className="w-full h-full object-cover rounded-full drop-shadow-lg"
            />
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-3">
          <h3 className="text-white font-bold text-base mb-4 font-['Outfit']">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-orange-400 transition-colors flex items-center gap-2">• Home</Link></li>
            <li><Link to="/recipes" className="hover:text-orange-400 transition-colors flex items-center gap-2">• Recipes</Link></li>
            <li><Link to="/categories" className="hover:text-orange-400 transition-colors flex items-center gap-2">• Categories</Link></li>
            <li><button onClick={onOpenAI} className="hover:text-orange-400 transition-colors flex items-center gap-2 text-left">• AI Suggestion</button></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-bold text-base mb-4 font-['Outfit']">Support</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors flex items-center gap-2">• Contact</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors flex items-center gap-2">• Feedback</Link></li>
            <li><Link to="/about-us" className="hover:text-orange-400 transition-colors flex items-center gap-2">• About Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Follow Us with Exact Colored Social Icons */}
        <div className="sm:col-span-2 lg:col-span-3">
          <h3 className="text-white font-bold text-base mb-4 font-['Outfit']">Follow Us</h3>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a 
              href="https://facebook.com" target="_blank" rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 shadow-md shadow-blue-500/20 transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" target="_blank" rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] flex items-center justify-center text-white hover:scale-110 shadow-md shadow-pink-500/20 transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" target="_blank" rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 shadow-md shadow-red-500/20 transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a 
              href="https://twitter.com" target="_blank" rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 shadow-md shadow-cyan-500/20 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright & 3D Cooking Pot */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 border-t border-white/[0.06] flex items-center justify-between">
        <p className="text-xs md:text-sm text-gray-500">
          © 2026 CookSmart. Built for TechWiz 7.
        </p>

        {/* Small 3D Cooking Pot icon */}
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
          <svg className="w-5 h-5 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20"/>
            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/>
            <path d="M12 4v4"/>
            <path d="M4 8h16"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}
