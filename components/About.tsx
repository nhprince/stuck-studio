'use client';

import { motion } from 'motion/react';
import { Play, Code2, CircleCheckBig } from 'lucide-react';

const highlights = [
  'Creative media production that converts',
  'Full-stack web development expertise',
  'Data-driven YouTube growth strategy',
  'End-to-end brand storytelling',
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative bg-zinc-950 overflow-hidden" aria-label="About">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Brand Content (Clean Version) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-red-600" />
              <p className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em]">
                About Stuck Studio
              </p>
            </div>

            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95]">
              Building dominance <br />
              through <span className="text-red-700 italic font-medium">strategic content.</span>
            </h2>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light tracking-wide">
              <p>
                Stuck Studio is a digital growth powerhouse. We help creators, startups, and
                brands claim their space online through <span className="text-white font-medium">high-impact media</span> and <span className="text-white font-medium">elite engineering</span>.
              </p>
              <p className="text-zinc-500 text-base md:text-lg">
                By merging cinematic production with high-performance development, we build
                digital ecosystems that command attention and deliver revenue.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, t) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * t }}
                  className="flex items-center gap-3 text-zinc-400 text-[13px] font-medium"
                >
                  <div className="w-4 h-4 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20">
                    <CircleCheckBig className="w-2.5 h-2.5 text-red-500 shrink-0" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Technical Viewfinder Card (Reduced Size) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative lg:pl-10"
          >
            <div className="relative rounded-[32px] overflow-hidden bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-10 flex flex-col justify-between shadow-[0_32px_128px_-16px_rgba(0,0,0,1)]">
              {/* Camera Metadata Overlay */}
              <div className="absolute top-6 left-8 right-8 flex justify-between items-center text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span>[REC] 00:24:12</span>
                </div>
                <span>4K // 60FPS</span>
              </div>

              <div className="relative z-10 pt-6">
                <p className="text-red-600 text-[9px] font-bold uppercase tracking-[0.4em] mb-3">Strategic Oversight</p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tighter">Two Elite Units.</h3>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">Specialized expertise synchronized to generate maximum market impact.</p>
              </div>

              <div className="space-y-3 mt-8 relative z-10">
                {[
                  {
                    icon: Play,
                    title: 'YouTube & Strategy',
                    desc: 'Cinematic editing and data-driven growth architecture.',
                    badge: 'Div_01'
                  },
                  {
                    icon: Code2,
                    title: 'Web Engineering',
                    desc: 'High-performance platforms and custom digital ecosystems.',
                    badge: 'Div_02'
                  }
                ].map((division, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
                  >
                    {/* Refractive Flare Hover Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                      <motion.div
                        variants={{ hover: { x: ['100%', '-100%'] } }}
                        initial={false}
                        whileHover="hover"
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-red-600 transition-colors">
                        <division.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[7px] font-mono text-zinc-600 group-hover:text-red-500 transition-colors uppercase">
                        {division.badge}
                      </span>
                    </div>
                    <h4 className="text-white text-base font-bold mb-1">{division.title}</h4>
                    <p className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors leading-snug">
                      {division.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
