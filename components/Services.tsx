'use client';

import { motion } from 'motion/react';
import {
  Code2,
  Video,
  Youtube,
  Layers,
  Globe,
  Monitor,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Web Development',
    description:
      'Custom websites, landing pages, SaaS platforms, and e-commerce stores — built fast, SEO-ready, and fully responsive.',
    icon: <Code2 className="w-6 h-6" />,
    features: ['React & Next.js', 'Full-Stack Platforms', 'Performance Optimization', 'Mobile-First Design'],
  },
  {
    title: 'Video Editing',
    description:
      'Professional video editing with cinematic color grading, motion graphics, and brand storytelling that keeps audiences watching.',
    icon: <Video className="w-6 h-6" />,
    features: ['Cinematic Editing', 'Motion Graphics', 'Color Grading', 'Brand Films'],
  },
  {
    title: 'YouTube Growth & Management',
    description:
      'End-to-end YouTube channel management — strategy, SEO, audience analytics, and consistent publishing to grow subscribers.',
    icon: <Youtube className="w-6 h-6" />,
    features: ['YouTube SEO', 'Content Strategy', 'Analytics & Reporting', 'Channel Optimization'],
  },
  {
    title: 'Thumbnail Design',
    description:
      'Eye-catching thumbnails scientifically designed to maximize click-through rates and stand out in crowded feeds.',
    icon: <Monitor className="w-6 h-6" />,
    features: ['High-CTR Layouts', 'Brand Consistency', 'A/B Variants', 'Rapid Delivery'],
  },
  {
    title: 'Social Media Content',
    description:
      'Scroll-stopping short-form content — Reels, Shorts, and TikToks — optimized for each platform algorithm.',
    icon: <Layers className="w-6 h-6" />,
    features: ['Reels & Shorts', 'Caption Copywriting', 'Trend Research', 'Batch Production'],
  },
  {
    title: 'Digital Brand Strategy',
    description:
      'Cohesive brand identity — from logo and color systems to messaging frameworks that make your brand unmissable online.',
    icon: <Globe className="w-6 h-6" />,
    features: ['Brand Identity', 'Messaging Framework', 'Competitor Analysis', 'Style Guide'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Technical Background Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent" />
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] border border-white/[0.03] rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] border border-white/[0.02] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-[1px] bg-red-600/50" />
            <p className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em]">
              What We Do
            </p>
            <div className="w-8 h-[1px] bg-red-600/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light tracking-wide italic"
          >
            End-to-end digital growth solutions for visionary creators and businesses ready to scale their impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-8 rounded-[32px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 relative flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Refractive Flare Hover Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  variants={{ hover: { x: ['100%', '-100%'] } }}
                  initial={false}
                  whileHover="hover"
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12"
                />
              </div>

              {/* Inner HUD Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-br-sm" />

              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-8 text-zinc-500 group-hover:text-red-600 transition-all duration-500 relative">
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 blur-xl transition-all duration-500 rounded-full" />
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-400 mb-8 leading-relaxed text-[15px] font-light flex-1">
                {service.description}
              </p>

              <div className="space-y-4 mb-2">
                <motion.div 
                  initial="initial"
                  whileHover="hover"
                  className="flex flex-wrap gap-2.5"
                >
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      variants={{
                        initial: { opacity: 0.4 },
                        hover: { opacity: 1, scale: 1.05 }
                      }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-display font-bold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-all cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="pt-8 border-t border-white/5 mt-auto">
                <Link
                  href="/#contact"
                  className="group/link inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-all relative"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover/link:w-full transition-all duration-500" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-24"
        >
          <div className="inline-block relative">
            <Link
              href="/#contact"
              className="relative inline-flex items-center gap-5 px-10 py-5 bg-white text-black rounded-full font-display font-bold text-[13px] tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group/btn overflow-hidden"
            >
              {/* Shimmering Background Flare */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
                <motion.div
                  animate={{ 
                    x: ['-100%', '200%'],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 1
                  }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-red-600/10 to-transparent -skew-x-12"
                />
              </div>

              <span className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-[-2px]">Discuss Your Project</span>
              
              <div className="relative z-10 w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white group-hover/btn:rotate-[-45deg] group-hover/btn:scale-110 transition-all duration-500 shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Premium Outer Pulsing Rings (Only on hover) */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-red-600/0 group-hover/btn:border-red-600/20 group-hover/btn:scale-[1.2] transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border border-red-600/0 group-hover/btn:border-red-600/10 group-hover/btn:scale-[1.4] transition-all duration-1000" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
