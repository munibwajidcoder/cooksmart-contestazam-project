import React from 'react';
import { ArrowRight, ChevronRight, Code2, Layers, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card3D from '../components/Card3D';

// ── Team data ─────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'Mohammad Mohib',
    role: 'Senior Frontend Developer',
    roleSub: 'UI/UX Designer',
    roleColor: 'from-orange-500 to-amber-500',
    borderColor: 'border-orange-500/30',
    glowColor: 'bg-orange-500/15',
    icon: <Code2 size={16} />,
    avatarIndex: 0,
    bio: 'Crafts pixel-perfect interfaces and designs user experiences that feel intuitive and premium.',
    socials: [
      { label: 'in',  href: '#', bg: 'bg-blue-700' },
      { label: 'gh',  href: '#', bg: 'bg-gray-700' },
      { label: '𝕏',   href: '#', bg: 'bg-neutral-800' },
    ],
  },
  {
    name: 'Burhan',
    role: 'Frontend Developer',
    roleSub: '',
    roleColor: 'from-sky-500 to-blue-500',
    borderColor: 'border-sky-500/30',
    glowColor: 'bg-sky-500/15',
    icon: <Layers size={16} />,
    avatarIndex: 1,
    bio: 'Builds responsive, high-performance React components and ensures smooth cross-device experiences.',
    socials: [
      { label: 'gh',  href: '#', bg: 'bg-gray-700' },
      { label: 'in',  href: '#', bg: 'bg-blue-700' },
      { label: '𝕏',   href: '#', bg: 'bg-neutral-800' },
    ],
  },
  {
    name: 'Mohammad Muneeb',
    role: 'Senior Backend Developer',
    roleSub: '',
    roleColor: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/30',
    glowColor: 'bg-green-500/15',
    icon: <Database size={16} />,
    avatarIndex: 2,
    bio: 'Architects scalable server-side systems and APIs that power CookSmart\'s core data engine.',
    socials: [
      { label: 'gh',  href: '#', bg: 'bg-gray-700' },
      { label: 'in',  href: '#', bg: 'bg-blue-700' },
      { label: '𝕏',   href: '#', bg: 'bg-neutral-800' },
    ],
  },
  {
    name: 'Abdullah',
    role: 'Junior Backend Developer',
    roleSub: '',
    roleColor: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/30',
    glowColor: 'bg-purple-500/15',
    icon: <Cpu size={16} />,
    avatarIndex: 3,
    bio: 'Develops and maintains backend services, database queries, and integration workflows.',
    socials: [
      { label: 'gh',  href: '#', bg: 'bg-gray-700' },
      { label: 'in',  href: '#', bg: 'bg-blue-700' },
      { label: '𝕏',   href: '#', bg: 'bg-neutral-800' },
    ],
  },
];

// Each team member has their own avatar crop position from the 2x2 grid image
const AVATAR_CLIPS = [
  { objectPosition: '0% 0%' },    // top-left  → Mohib
  { objectPosition: '100% 0%' },  // top-right → Burhan
  { objectPosition: '0% 100%' },  // bottom-left → Muneeb
  { objectPosition: '100% 100%' }, // bottom-right → Abdullah
];

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num: '01',
    icon: '🔍',
    bg: 'bg-orange-500/12 border-orange-500/25',
    title: 'Smart Ingredient Search',
    desc: 'Find recipes based on what\'s already in your kitchen — no extra shopping needed.',
  },
  {
    num: '02',
    icon: '🧠',
    bg: 'bg-purple-500/12 border-purple-500/25',
    title: 'AI Recipe Suggestions',
    desc: 'Let our AI chef recommend the perfect dish tailored to your taste in seconds.',
  },
  {
    num: '03',
    icon: '📅',
    bg: 'bg-green-500/12 border-green-500/25',
    title: 'Weekly Meal Planning',
    desc: 'Plan your entire week ahead and auto-generate a grocery list with one tap.',
  },
];

// ── Journey timeline ──────────────────────────────────────────────────────────
const JOURNEY = [
  { label: 'Class Project',    sub: 'Started as a university class project with big dreams.', icon: '💡', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  { label: 'Core Idea',        sub: 'Inspired by everyday home cooks struggling with "what to make?"', icon: '🏠', color: 'text-orange-400', dot: 'bg-orange-400' },
  { label: 'Built & Tested',   sub: 'Recipes, AI features, and premium design came together.', icon: '⚙️', color: 'text-blue-400', dot: 'bg-blue-400' },
  { label: 'CookSmart Today',  sub: 'A full-featured recipe discovery portal loved by home cooks.', icon: '🚀', color: 'text-green-400', dot: 'bg-green-400' },
];

const STATS = [
  { icon: '📖', value: '500+',       label: 'Recipes',        bg: 'from-orange-600/20 to-amber-600/10',   border: 'border-orange-500/25' },
  { icon: '🤖', value: 'AI-Powered', label: 'Smart Features', bg: 'from-purple-600/20 to-indigo-600/10',  border: 'border-purple-500/25' },
  { icon: '🏠', value: 'Built for',  label: 'Home Cooks',     bg: 'from-green-600/20 to-emerald-600/10',  border: 'border-green-500/25' },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#0A0B0E] pb-24 relative overflow-x-hidden">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-orange-700/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-purple-700/4 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-6">

        {/* ══ BREADCRUMB ══ */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-8 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight size={14} />
          <span className="text-white font-semibold">About Us</span>
        </nav>

        {/* ══════════════════════════════════════════
            HERO — LEFT TEXT + RIGHT PHOTO
        ══════════════════════════════════════════ */}
        <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-20">

          {/* Left: Text */}
          <div className="flex-1 z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-black text-white font-['Outfit'] leading-[1.08] tracking-tight mb-5"
            >
              Cooking Made<br />
              <span className="text-gradient-orange">Simple, Smart &amp; Fun</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg font-['Plus_Jakarta_Sans']"
            >
              CookSmart was built to solve a problem every home cook knows too well — staring into the fridge, wondering what to make with what you already have.
            </motion.p>

            {/* Stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 bg-gradient-to-r ${s.bg} border ${s.border} px-4 py-2.5 rounded-2xl`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-white font-black text-sm leading-none font-['Outfit']">{s.value}</p>
                    <p className="text-gray-400 text-xs font-semibold mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/recipes')}
              className="btn-3d btn-gradient-orange text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 inline-flex items-center gap-2 transition-all"
            >
              Explore Recipes <ArrowRight size={15} />
            </motion.button>
          </div>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
            className="lg:w-[48%] w-full flex-shrink-0 relative"
          >
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[2.5rem] blur-[60px] pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-white/8 shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
              <img
                src="/images/about_hero.jpg"
                alt="CookSmart – Premium cooking experience"
                className="w-full h-[340px] sm:h-[400px] object-cover"
                onError={e => { e.target.src = '/images/hero_3d_ramen_bowl_v2.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            OUR MISSION
        ══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/15 bg-[#111018] text-center px-6 py-12 sm:px-12 sm:py-14 mb-16"
          style={{ boxShadow: '0 0 80px -20px rgba(249,115,22,0.12)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg shadow-orange-500/10">
              🧭
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] mb-5">
              Our <span className="text-gradient-orange">Mission</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-['Plus_Jakarta_Sans']">
              We believe great meals shouldn't start with a trip to the store. CookSmart helps you discover recipes based on what you already have — organized by category, cooking time, and difficulty, with a touch of AI to make every decision easier.
            </p>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════
            WHAT MAKES COOKSMART DIFFERENT
        ══════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-orange-500/30" />
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] text-center">
              What Makes CookSmart <span className="text-gradient-orange">Different</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-orange-500/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 perspective-container">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Card3D intensity={10} className="h-full">
                  <div className="bg-[#12141D] h-full border border-white/6 hover:border-orange-500/20 rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-5 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center gap-4 w-full transform translate-z-[15px]">
                      <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30 font-['Outfit']">
                        {f.num}
                      </div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border ${f.bg} shrink-0`}>
                        {f.icon}
                      </div>
                    </div>
                    <div className="transform translate-z-[25px]">
                      <h3 className="text-lg font-black text-white mb-2 font-['Outfit']">{f.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-['Plus_Jakarta_Sans']">{f.desc}</p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW COOKSMART CAME TO BE
        ══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-[#111018] border border-white/8 rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">

            {/* Left: Timeline */}
            <div className="lg:w-[55%] p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/6">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mb-8">
                How <span className="text-gradient-orange">CookSmart</span> Came to Be
              </h2>

              <div className="relative pl-6">
                <div className="absolute left-[9px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-orange-500/20" />
                <div className="space-y-7">
                  {JOURNEY.map((j, i) => (
                    <div key={i} className="relative flex items-start gap-5">
                      <div className={`absolute -left-6 top-2 w-3 h-3 rounded-full ${j.dot} shadow-md ring-2 ring-black`} />
                      <div className="w-12 h-12 rounded-2xl bg-[#1A1C27] border border-white/8 flex items-center justify-center text-2xl shrink-0">
                        {j.icon}
                      </div>
                      <div>
                        <p className={`font-black text-sm ${j.color} mb-1 font-['Outfit']`}>{j.label}</p>
                        <p className="text-gray-400 text-xs leading-relaxed font-['Plus_Jakarta_Sans']">{j.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Story */}
            <div className="lg:w-[45%] p-7 sm:p-10 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/10">
                🍲
              </div>
              <h3 className="text-xl font-black text-white font-['Outfit'] mb-4">
                The Story Behind the App
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-[1.9] font-['Plus_Jakarta_Sans']">
                CookSmart started as a simple idea from a small team who loved cooking but hated the daily "what's for dinner?" dilemma. What began as a university class project grew into a full recipe discovery portal — combining clean design, authentic Pakistani & fusion cuisine knowledge, and smart AI technology into one easy-to-use platform.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════
            MEET THE TEAM
        ══════════════════════════════════════════ */}
        <section className="mb-14">
          <div className="text-center mb-10">
            <div className="flex items-center gap-4 justify-center mb-3">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-orange-500/40" />
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Meet the <span className="text-gradient-orange">Team</span>
              </h2>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-orange-500/40" />
            </div>
            <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">The passionate developers behind CookSmart</p>
          </div>

          {/* 4-column team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-container">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="h-full"
              >
                <Card3D intensity={15} className="h-full">
                  <div className={`relative bg-[#12141D] h-full border ${member.borderColor} hover:border-opacity-60 rounded-3xl p-6 flex flex-col items-center text-center transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden group`}>
                    {/* Top glow */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 ${member.glowColor} rounded-full blur-2xl pointer-events-none`} />

                    {/* Avatar */}
                    <div className="relative mb-4 z-10 transform translate-z-[15px]">
                      <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${member.borderColor} shadow-xl`}>
                        <img
                          src="/images/team_avatars.jpg"
                          alt={member.name}
                          className="w-[200%] h-[200%] object-cover"
                          style={{
                            objectFit: 'cover',
                            transform: `translate(${member.avatarIndex % 2 === 1 ? '-50%' : '0%'}, ${member.avatarIndex >= 2 ? '-50%' : '0%'})`
                          }}
                          onError={e => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl bg-[#1a1c27]">👨‍💻</div>`;
                          }}
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-[#12141D] shadow-md" />
                    </div>

                    <div className="transform translate-z-[25px] flex flex-col items-center flex-1">
                      {/* Name */}
                      <h3 className="text-white font-black text-base mb-1 font-['Outfit'] z-10 relative">{member.name}</h3>

                      {/* Primary Role badge */}
                      <span className={`bg-gradient-to-r ${member.roleColor} text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 shadow-md z-10 relative flex items-center gap-1`}>
                        {member.icon}
                        {member.role}
                      </span>

                      {/* Sub role */}
                      {member.roleSub && (
                        <span className="text-gray-500 text-[10px] font-semibold mb-3 z-10 relative">{member.roleSub}</span>
                      )}

                      {/* Bio */}
                      <p className="text-gray-400 text-xs leading-relaxed mb-5 mt-2 font-['Plus_Jakarta_Sans'] z-10 relative">
                        {member.bio}
                      </p>

                      {/* Social icons */}
                      <div className="flex items-center gap-2 mt-auto z-10 relative">
                        {member.socials.map((s, si) => (
                          <a
                            key={si}
                            href={s.href}
                            className={`w-8 h-8 rounded-full btn-3d ${s.bg} flex items-center justify-center text-white text-xs font-black hover:opacity-80 transition-all`}
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ BOTTOM CTA BANNER ══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-[#111018] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-4 shadow-[0_0_60px_-15px_rgba(249,115,22,0.18)]"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mb-1">
              Ready to Cook Something <span className="text-gradient-orange">Amazing?</span>
            </h3>
            <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">
              Browse 500+ authentic recipes and start your culinary journey today.
            </p>
          </div>

          <button
            onClick={() => navigate('/recipes')}
            className="relative z-10 btn-3d btn-gradient-orange text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 inline-flex items-center gap-2 transition-all whitespace-nowrap"
          >
            Browse Recipes <ArrowRight size={15} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
