import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Clock, ShieldCheck, PlayCircle } from 'lucide-react';

const tipsData = [
  {
    category: "Prep & Knife Skills",
    icon: <Flame size={22} />,
    color: "orange",
    items: [
      { title: "Stop the Tears", desc: "Chill your onions in the freezer for 15 minutes before chopping to reduce eye irritation." },
      { title: "Stable Cutting Board", desc: "Place a damp paper towel under your cutting board to prevent it from slipping while you chop." },
      { title: "Perfect Garlic Peeling", desc: "Smash a garlic clove gently with the flat side of your knife — the skin will slide right off." }
    ]
  },
  {
    category: "Flavor Secrets",
    icon: <Droplets size={22} />,
    color: "blue",
    items: [
      { title: "Bloom Your Spices", desc: "Toast whole spices in a dry pan for 1-2 minutes before grinding. It unlocks deep, hidden flavors." },
      { title: "Balance the Acidity", desc: "If a dish is too salty or sweet, a splash of lemon juice or vinegar can perfectly balance the flavor." },
      { title: "Save Starchy Water", desc: "Always save half a cup of pasta water. Its starch helps sauces stick perfectly to your noodles." }
    ]
  },
  {
    category: "Time & Storage Hacks",
    icon: <Clock size={22} />,
    color: "purple",
    items: [
      { title: "Fresh Herbs Longer", desc: "Store fresh herbs like cilantro and parsley in a glass of water in the fridge, just like a bouquet of flowers." },
      { title: "Room Temp Eggs", desc: "Forgot to take eggs out for baking? Place them in a bowl of warm water for 5 minutes." },
      { title: "Crispy Pizza Reheat", desc: "Reheat leftover pizza in a skillet on the stove, not the microwave. It keeps the crust crispy!" }
    ]
  }
];

const videosData = [
  {
    id: "f_Lk4KJPQE0",
    title: "Pakistani Breakfast Recipes — Quick & Easy",
    author: "Cooking with Asifa"
  },
  {
    id: "ZJy1ajvMU1k",
    title: "10 Essential Pakistani Cooking Techniques",
    author: "Zubaida Tariq Kitchen"
  }
];

const colorMap = {
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
    hover: "group-hover:bg-orange-500",
    border: "border-orange-500/20 group-hover:border-orange-500/40",
    dot: "bg-orange-500"
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    hover: "group-hover:bg-blue-500",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    dot: "bg-blue-500"
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    hover: "group-hover:bg-purple-500",
    border: "border-purple-500/20 group-hover:border-purple-500/40",
    dot: "bg-purple-500"
  }
};

export default function CookingTips() {
  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 min-h-screen bg-[#0A0B0E]">

      {/* ── Hero Section ── */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/8 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium text-xs sm:text-sm mb-5 sm:mb-6"
          >
            <ShieldCheck size={15} />
            Kitchen Mastery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-['Outfit'] tracking-tight mb-4 sm:mb-6 leading-tight"
          >
            Handy <span className="text-gradient-orange">Cooking Tips</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2"
          >
            Elevate your culinary skills with these essential kitchen hacks, flavor secrets, and pro video tutorials.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">

        {/* ── Tips Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-8 mb-14 sm:mb-20">
          {tipsData.map((category, idx) => {
            const c = colorMap[category.color];
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + (idx * 0.1) }}
                className="bg-[#12141D] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/5 hover:border-orange-500/20 transition-all group shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl sm:rounded-2xl ${c.bg} flex items-center justify-center ${c.icon} mb-5 ${c.hover} group-hover:text-white transition-all duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] mb-5">{category.category}</h3>

                <div className="space-y-5">
                  {category.items.map((item, i) => (
                    <div key={i} className={`relative pl-5 border-l-2 ${c.border} transition-colors`}>
                      <div className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full ${c.dot}`} />
                      <h4 className="text-white font-semibold text-base mb-0.5">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Video Tutorials Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <PlayCircle className="text-orange-500 shrink-0" size={24} />
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Featured Video Tutorials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {videosData.map((vid, idx) => (
              <div
                key={idx}
                className="bg-[#12141D] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 hover:border-orange-500/20 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Responsive iframe */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${vid.id}?rel=0&showinfo=0&modestbranding=1&loading=lazy`}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold text-white font-['Outfit'] mb-1">{vid.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">By {vid.author}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
