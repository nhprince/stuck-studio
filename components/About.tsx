'use client';

import { motion } from 'motion/react';
import { CheckCircle, Play, Code2, Globe } from 'lucide-react';

const highlights = [
  'Creative media production that converts',
  'Full-stack web development expertise',
  'Data-driven YouTube growth strategy',
  'End-to-end brand storytelling',
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative bg-zinc-950 overflow-hidden" aria-label="About">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Brand Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em] mb-4"
            >
              Our Vision
            </motion.p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[0.95]">
              Building dominance through <br />
              <span className="text-red-600">strategic content.</span>
            </h2>

            <div className="space-y-4 text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light tracking-wide italic">
              <p>
                Stuck Studio is a digital growth powerhouse. We help creators, high-growth startups, and
                personal brands claim their space online through high-impact media and elite engineering.
              </p>
              <p>
                By merging high-end cinematic production with high-performance development, we build
                digital ecosystems that command attention and deliver measurable revenue.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 text-zinc-400 text-[13px] font-medium"
                >
                  <div className="w-4 h-4 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20">
                    <CheckCircle className="w-2.5 h-2.5 text-red-500 shrink-0" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Glassmorphism 2.0 Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Visual Box Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600/10 via-transparent to-transparent blur-3xl opacity-50" />

            <div className="relative rounded-[32px] overflow-hidden bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-5 md:p-8 min-h-[400px] flex flex-col justify-between shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-red-600 mb-3 animate-pulse">
                  <Globe size={14} />
                  <span className="text-[9px] font-display font-bold uppercase tracking-[0.4em]">Global Presence</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Two Elite Divisions</h3>
              </div>

              <div className="space-y-4 relative z-10">
                {/* Division Sub-Cards */}
                {[
                  {
                    icon: Play,
                    title: 'YouTube & Strategy',
                    desc: 'Cinematic editing, high-conversion thumbnails, and data-driven SEO strategy.',
                    badge: 'Creative'
                  },
                  {
                    icon: Code2,
                    title: 'Web Engineering',
                    desc: 'High-performance landing pages, custom platforms, and advanced Web3 integration.',
                    badge: 'DevOps'
                  }
                ].map((division, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-red-600/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-red-600 group-hover:scale-110 transition-all duration-500 shadow-lg">
                        <division.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-display font-bold uppercase tracking-widest text-zinc-600 bg-white/5 px-2.5 py-1 rounded-full group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                        {division.badge}
                      </span>
                    </div>
                    <h4 className="text-white text-sm font-bold mb-1 group-hover:text-white transition-colors">{division.title}</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                      {division.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Status Pill */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Always Innovating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
