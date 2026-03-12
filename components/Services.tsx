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
    <section id="services" className="relative py-16 md:py-24 bg-zinc-950 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em] mb-4"
          >
            What We Do
          </motion.p>
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
              className="group p-6 rounded-[28px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 relative flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              suppressHydrationWarning
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center mb-6 border border-red-600/5 text-red-500 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm flex-1">
                {service.description}
              </p>

              <div className="space-y-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-display font-bold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-all"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-auto">
                <Link
                  href="/#contact"
                  className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all relative"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-red-600 group-hover/link:w-full transition-all duration-500" />
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
          className="text-center mt-20"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-display font-bold text-[12px] tracking-widest uppercase hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
          >
            <span>Discuss Your Project</span>
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white">
              <ChevronRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
