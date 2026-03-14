'use client';

import { PortfolioItem } from '@/data/portfolio';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Play, 
  Clock, 
  BarChart3, 
  Share2, 
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Film,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface ProjectDetailClientProps {
  project: PortfolioItem;
  otherProjects: PortfolioItem[];
}

export default function ProjectDetailClient({ project, otherProjects }: ProjectDetailClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-500/30 overflow-x-hidden font-sans">
      {/* Background Orbs - Reduced opacity for minimalism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-red-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[25%] h-[25%] bg-red-600/3 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 pt-16 md:pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          
          {/* Top Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/#portfolio" 
              className="inline-flex items-center gap-2.5 text-zinc-500 hover:text-white transition-all group"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={14} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
            </Link>
          </motion.div>

          {/* Header Info */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] bg-red-600 text-white">
                {project.category}
              </span>
              {project.type === 'video' && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] bg-white/5 text-zinc-400 border border-white/10">
                  <Film size={10} /> Video Production
                </span>
              )}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Video Player Section - Compact and Animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 shadow-xl group shadow-black/50">
              {project.videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    src={project.videoSrc}
                    className="w-full h-full object-contain"
                    controls={isPlaying}
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    poster={project.thumbnail}
                  />
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer group-hover:bg-black/20 transition-all duration-500"
                      onClick={togglePlay}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20"
                      >
                        <Play size={24} className="text-white fill-white ml-1" />
                      </motion.div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 gap-3">
                  <Film className="text-zinc-700" size={24} />
                  <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Preview Unavailable</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Grid Layout - More Minimalist and Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[1px] bg-red-600" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Overview</h2>
                </div>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: BarChart3, label: project.stat.label, value: project.stat.value },
                  { icon: Clock, label: "Timeframe", value: "Q1 2025" },
                  { icon: CheckCircle2, label: "Success", value: "Verified" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-5 rounded-xl bg-white/[0.03] border border-white/5 transition-all"
                  >
                    <item.icon className="text-red-600 mb-2" size={18} />
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-0.5">{item.label}</p>
                    <p className="text-base font-black text-white">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar with functional Share Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-4 flex flex-col justify-end space-y-8"
            >
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-4 px-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-[9px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-4">Impact</h3>
                <div className="flex gap-4 items-end">
                  <motion.button 
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group relative"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Check size={16} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="share"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Share2 size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Tooltip */}
                    <AnimatePresence>
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] bg-red-600 text-white px-3 py-1 rounded font-bold whitespace-nowrap"
                        >
                          Link Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {project.href && project.href !== '#' && (
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                      <Link 
                        href={project.href} 
                        target="_blank"
                        className="h-10 px-6 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-white/5"
                      >
                        Visit Project <TrendingUp size={14} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-16" />

          {/* More Projects Section - Compact and Hoverable with 3D Tilt */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                Discover More
                <span className="text-red-600">.</span>
              </h2>
              <Link href="/#portfolio" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-red-600 transition-all group">
                Back to Archive 
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProjects.map((p, idx) => (
                <ProjectCard key={p.id} project={p} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Small Contact CTA */}
      <section className="py-20 relative px-5">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-6 h-6 text-red-600 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Let&apos;s create something<br />spectacular.
            </h2>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black rounded-full font-black text-[10px] tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-white/5"
            >
              Get in Touch <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/5 bg-zinc-900"
        >
          <img 
            src={project.thumbnail || project.previewImage || 'https://picsum.photos/id/1/800/600'} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300">
              <ChevronRight size={18} />
            </div>
          </div>
        </motion.div>
        <div className="px-1">
          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-red-600 mb-1 block">
            {project.category}
          </span>
          <h4 className="text-white text-sm font-black group-hover:text-zinc-400 transition-colors uppercase tracking-tight">{project.title}</h4>
        </div>
      </Link>
    </motion.div>
  );
}

