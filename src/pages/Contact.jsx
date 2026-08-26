import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, MapPin, Mail, Phone, Clock,
  Star, Send, Lock, Plus,
} from 'lucide-react';

// ── Inline social icons (lucide-react doesn't include social brands) ──────────
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/>
  </svg>
);


// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How do I save a recipe?',
    a: 'Simply click the heart ❤️ icon on any recipe card or detail page. It will be saved to your Favourites, accessible from the navigation bar.',
  },
  {
    q: 'Can I use CookSmart offline?',
    a: 'Recipes you have already viewed are partially cached in your browser. However, full offline support requires an internet connection for loading images and AI features.',
  },
  {
    q: 'How does the AI suggestion work?',
    a: 'Our AI analyses the ingredients you enter and cross-references them against our recipe database to recommend the best matching dishes, ranked by relevance and user ratings.',
  },
];

// ─── Social Icons ────────────────────────────────────────────────────────────
const SOCIALS = [
  { icon: <IconInstagram />, bg: 'bg-gradient-to-br from-pink-500 to-orange-400', label: 'Instagram' },
  { icon: <IconFacebook  />, bg: 'bg-[#1877f2]', label: 'Facebook'  },
  { icon: <IconTwitter   />, bg: 'bg-[#0f1419]', label: 'Twitter'   },
  { icon: <IconYoutube   />, bg: 'bg-[#ff0000]', label: 'YouTube'   },
];

// ─── Contact Info ─────────────────────────────────────────────────────────────
const INFO = [
  {
    icon: '📍',
    iconBg: 'bg-red-500/20',
    label: 'Address',
    value: '123 Culinary Street,\nKarachi, Pakistan',
  },
  {
    icon: '✉️',
    iconBg: 'bg-orange-500/20',
    label: 'Email',
    value: 'support@cooksmart.app',
  },
  {
    icon: '📞',
    iconBg: 'bg-green-500/20',
    label: 'Phone',
    value: '+92 300 1234567',
  },
  {
    icon: '🕐',
    iconBg: 'bg-blue-500/20',
    label: 'Support Hours',
    value: 'Mon–Sat, 9 AM – 6 PM',
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={`transition-colors ${
              n <= (hovered || value)
                ? 'text-orange-400 fill-orange-400'
                : 'text-gray-600 fill-gray-700'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden bg-[#141622]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
            <span className="text-orange-400 text-xs font-black">?</span>
          </div>
          <span className="text-white font-bold text-sm font-['Outfit']">{faq.q}</span>
        </div>
        <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${open ? 'rotate-45 border-orange-500/40 bg-orange-500/10' : ''}`}>
          <Plus size={14} className={open ? 'text-orange-400' : 'text-gray-400'} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-0 text-gray-400 text-sm leading-relaxed font-['Plus_Jakarta_Sans'] border-t border-white/6">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', subject: 'General Feedback', message: '', rating: 4,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0B0E] pb-24 relative overflow-x-hidden">

      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-orange-700/6 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-amber-600/4 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-6">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-8 text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
          <ChevronRight size={14} />
          <span className="text-white font-semibold">Contact</span>
        </nav>

        {/* ══════════════════════════════════════════
            HERO — LEFT TEXT + RIGHT ENVELOPE
        ══════════════════════════════════════════ */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">

          {/* Left: Heading */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-black text-white font-['Outfit'] leading-[1.1] tracking-tight mb-4"
            >
              We'd Love to<br />
              <span className="text-gradient-orange">Hear</span>{' '}
              <span className="text-white">From You</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-base md:text-lg max-w-md font-['Plus_Jakarta_Sans'] leading-relaxed"
            >
              Questions, suggestions, or just want to say hi?<br />
              Drop us a message below.
            </motion.p>
          </div>

          {/* Right: Envelope 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            className="lg:w-[44%] w-full flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-[70px] pointer-events-none" />
              <img
                src="/images/contact_envelope_3d.jpg"
                alt="Contact us"
                className="w-full max-w-[400px] h-[280px] sm:h-[320px] object-cover rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] relative z-10"
                style={{ mixBlendMode: 'lighten' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            TWO-COLUMN — GET IN TOUCH + FORM
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 mb-5">

          {/* ── LEFT: Get in Touch card ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#12141D] border border-white/8 rounded-3xl p-6 flex flex-col gap-6"
          >
            <div>
              <h2 className="text-xl font-black text-white font-['Outfit'] mb-5">
                Get in <span className="text-orange-400">Touch</span>
              </h2>

              {/* Info rows */}
              <div className="space-y-4">
                {INFO.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center text-xl shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm font-['Outfit'] leading-tight">{item.label}</p>
                      <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-line font-['Plus_Jakarta_Sans']">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <p className="text-white font-bold text-sm font-['Outfit'] mb-3">Follow Us</p>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center text-white shadow-md hover:scale-110 hover:opacity-90 transition-all`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative utensils image */}
            <div className="mt-auto -mx-6 -mb-6 h-[110px] overflow-hidden rounded-b-3xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-[#12141D]/30 to-transparent z-10" />
              <img
                src="/images/contact_chef_hat_3d.jpg"
                alt="Kitchen utensils"
                className="w-full h-full object-cover object-top opacity-60"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#12141D] border border-white/8 rounded-3xl p-6 sm:p-8"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-5">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-4xl shadow-lg shadow-green-500/10">
                  ✅
                </div>
                <h3 className="text-2xl font-black text-white font-['Outfit']">Message Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs font-['Plus_Jakarta_Sans'] leading-relaxed">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-white font-['Outfit'] mb-6">
                  Send Us a <span className="text-orange-400">Message</span>
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-xs font-bold uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="bg-[#181B26] border border-white/8 focus:border-orange-500 rounded-2xl py-3 px-4 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-xs font-bold uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="bg-[#181B26] border border-white/8 focus:border-orange-500 rounded-2xl py-3 px-4 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wide">What's this about?</label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full appearance-none bg-[#181B26] border border-white/8 focus:border-orange-500 rounded-2xl py-3 px-4 pr-10 text-white text-sm focus:outline-none transition-colors cursor-pointer"
                      >
                        <option>General Feedback</option>
                        <option>Bug Report</option>
                        <option>Recipe Suggestion</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                      <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wide">How would you rate CookSmart?</label>
                    <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wide">Your Message</label>
                    <textarea
                      name="message"
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-[#181B26] border border-white/8 focus:border-orange-500 rounded-2xl py-3 px-4 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gradient-orange text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2.5 transition-all disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-gray-500 text-xs flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                      <Lock size={11} className="text-gray-600" />
                      We'll never share your information with anyone else.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            FIND US HERE — MAP SECTION
        ══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 rounded-3xl overflow-hidden border border-white/8 bg-[#12141D] flex flex-col sm:flex-row items-stretch min-h-[200px]"
        >
          {/* Left: text */}
          <div className="p-7 sm:p-8 flex flex-col justify-center sm:w-[280px] shrink-0 border-b sm:border-b-0 sm:border-r border-white/6">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mb-2">
              Find Us <span className="text-orange-400">Here</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
              Visit our kitchen HQ or drop us a message anytime!
            </p>
            <div className="flex items-center gap-2 mt-4 text-orange-400 text-xs font-bold">
              <MapPin size={14} />
              <span>123 Culinary Street, Karachi</span>
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex-1 relative min-h-[200px] overflow-hidden">
            <img
              src="/images/contact_map_3d.jpg"
              alt="CookSmart HQ location map"
              className="w-full h-full object-cover object-center"
              onError={e => {
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full min-h-[200px] bg-[#1A1C27] flex items-center justify-center text-gray-600 text-sm">
                    🗺️ Map Unavailable
                  </div>`;
              }}
            />
            {/* Pin label overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-black px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-xl">
                <MapPin size={13} className="text-red-500" />
                CookSmart HQ
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════
            QUICK ANSWERS — FAQ
        ══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/8 bg-[#12141D] flex flex-col sm:flex-row items-stretch"
        >
          {/* Left: label + image */}
          <div className="sm:w-[280px] shrink-0 border-b sm:border-b-0 sm:border-r border-white/6 flex flex-col">
            <div className="p-7 sm:p-8 flex flex-col justify-start flex-1">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mb-2">
                Quick <span className="text-orange-400">Answers</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
                Here are some common questions our users ask.
              </p>
            </div>

            {/* Chef hat image at bottom */}
            <div className="relative h-[140px] overflow-hidden sm:rounded-bl-3xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-transparent to-transparent z-10" />
              <img
                src="/images/contact_chef_hat_3d.jpg"
                alt="Chef"
                className="w-full h-full object-cover object-top"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col gap-3 justify-center">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
