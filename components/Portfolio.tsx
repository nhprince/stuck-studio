'use client';

import { motion } from 'motion/react';
import { ExternalLink, Play, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const portfolio = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    type: 'web',
    bg: 'from-blue-900/40 to-zinc-900',
  },
  {
    title: 'Brand Channel Launch',
    category: 'YouTube Growth',
    description: 'Took a startup YouTube channel from 0 to 10K subscribers in 3 months with strategic content planning.',
    tags: ['Video Editing', 'YouTube SEO', 'Thumbnails'],
    type: 'video',
    bg: 'from-red-900/40 to-zinc-900',
  },
  {
    title: 'SaaS Landing Page',
    category: 'Web Development',
    description: 'High-converting SaaS landing page with animated sections, feature comparisons, and pricing tables.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    type: 'web',
    bg: 'from-purple-900/40 to-zinc-900',
  },
  {
    title: 'Cinematic Brand Film',
    category: 'Video Editing',
    description: 'Cinematic brand story video with color grading, motion graphics, and custom soundtrack editing.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci'],
    type: 'video',
    bg: 'from-orange-900/40 to-zinc-900',
  },
  {
    title: 'Personal Portfolio Site',
    category: 'Web Development',
    description: 'Minimalist developer portfolio with dark theme, smooth animations, and CMS-powered blog.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    type: 'web',
    bg: 'from-emerald-900/40 to-zinc-900',
  },
  {
    title: 'Social Media Growth Sprint',
    category: 'Social Media',
    description: '30-day content sprint delivering 30 Reels and 60 short-form clips for a fitness brand.',
    tags: ['CapCut', 'Final Cut Pro', 'Strategy'],
    type: 'video',
    bg: 'from-pink-900/40 to-zinc-900',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-24 relative bg-zinc-950 overflow-hidden" aria-label="Portfolio">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em] mb-4"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg leading-relaxed font-light tracking-wide italic"
          >
            A curated showcase of digital solutions that helped our clients scale their reach and revenue.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[28px] overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col cursor-pointer"
              suppressHydrationWarning
            >
              <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Card visual header */}
              <div className={`aspect-video bg-gradient-to-br ${item.bg} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors duration-500" />

                {/* Brand-consistent hover trigger (Play/Link) */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-red-600 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-white/10">
                  {item.type === 'video'
                    ? <Play className="w-5 h-5 fill-current ml-1" />
                    : <ExternalLink className="w-5 h-5" />
                  }
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-zinc-950/60 backdrop-blur-md text-white border border-white/10">
                  {item.category}
                </div>

                {/* Decorative overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[9px] font-display font-bold uppercase tracking-[0.15em] bg-white/[0.03] text-zinc-500 border border-white/5 group-hover:text-zinc-300 group-hover:border-white/10 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 mt-auto">
                  <div className="group/link flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-all relative w-fit">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-red-600 group-hover/link:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Ready to be our next success story?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-display font-bold text-[12px] tracking-widest uppercase hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
          >
            <span>Start Your Project</span>
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white">
              <ChevronRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
