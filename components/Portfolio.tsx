'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import {
  ExternalLink, Play, ArrowRight, ChevronRight, ChevronLeft,
  ArrowUpRight, Sparkles, X,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

import { portfolio, thumbnails } from '@/data/portfolio';

type PortfolioItem = typeof portfolio[number];
type ThumbnailItem = typeof thumbnails[number];



/* ─── VIDEO CARD ────────────────────────────────────────────── */
function VideoCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) videoRef.current.play().then(() => setPlaying(true)).catch(() => { });
  };
  const handleMouseLeave = () => {
    setHovered(false); setPlaying(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
      <Link href={`/projects/${item.id}`}>
        <div className="relative rounded-[20px] overflow-hidden cursor-pointer select-none" style={{ aspectRatio: '16/10' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {item.thumbnail && (
            <img src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s ease' }} />
          )}
          {item.videoSrc && (
            <video ref={videoRef} src={item.videoSrc} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: playing ? 1 : 0 }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-red-950/20 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }} />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 origin-top transition-transform duration-500" style={{ transform: hovered ? 'scaleY(1)' : 'scaleY(0)' }} />
          <div className="absolute top-4 left-5 right-4 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-black/70 backdrop-blur-md text-zinc-400 border border-white/10">{item.category}</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.7)' }}>
              <Play className="w-4 h-4 fill-black" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{ opacity: hovered && !playing ? 1 : 0, transform: hovered && !playing ? 'scale(1)' : 'scale(0.8)' }}>
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_48px_rgba(220,38,38,0.6)]">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2 transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}>
              <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">{item.stat.value}</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em]">{item.stat.label}</span>
            </div>
            <h3 className="text-white text-xl font-bold tracking-tight mb-2">{item.title}</h3>
            <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0 }}>
              <p className="text-zinc-400 text-[13px] leading-relaxed mb-3">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] bg-white/10 text-zinc-400 border border-white/10 backdrop-blur-md">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── WEB CARD ──────────────────────────────────────────────── */
function WebCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-80, 80], [3, -3]);
  const rotateY = useTransform(mouseX, [-80, 80], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const Icon = item.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} style={{ perspective: 800 }} onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleMouseLeave}>
      <Link href={item.href ?? `/portfolio/${item.id}`} target={item.href?.startsWith('http') ? '_blank' : undefined} rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', border: hovered ? '1px solid rgba(220,38,38,0.25)' : '1px solid rgba(255,255,255,0.06)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative rounded-[20px] overflow-hidden bg-zinc-900/50 h-full flex flex-col cursor-pointer transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-red-600 to-transparent origin-left transition-transform duration-400" style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
          <div className="relative h-44 bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-white/[0.04]">
            {'previewImage' in item && item.previewImage ? (
              <>
                <img src={item.previewImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', opacity: hovered ? 0.55 : 0.35 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-zinc-950/20" />
              </>
            ) : (
              <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            )}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-400" style={{ opacity: hovered ? 1 : 0 }}>
              <div className="w-28 h-28 rounded-full bg-red-600/15 blur-2xl" />
            </div>
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-zinc-900 border flex items-center justify-center transition-all duration-300" style={{ borderColor: hovered ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.08)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
              <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: hovered ? '#ef4444' : '#52525b' }} />
            </div>
            <div className="absolute bottom-4 left-5 flex items-baseline gap-1.5 transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}>
              <span className="text-2xl font-bold text-white tracking-tighter">{item.stat.value}</span>
              <span className="text-[9px] text-red-500 uppercase tracking-[0.15em] font-bold">{item.stat.label}</span>
            </div>
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-zinc-900/90 text-zinc-500 border border-white/[0.06]">{item.category}</div>
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-45deg)' }}>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-base font-bold tracking-tight mb-2 transition-colors duration-300" style={{ color: hovered ? '#ef4444' : 'white' }}>{item.title}</h3>
            <p className="text-zinc-500 text-[13px] leading-relaxed mb-4 flex-1 font-light">{item.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] bg-white/[0.03] border transition-all duration-300" style={{ color: hovered ? '#a1a1aa' : '#52525b', borderColor: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)' }}>{tag}</span>
              ))}
            </div>
            <div className="pt-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] w-fit relative transition-colors duration-300" style={{ color: hovered ? 'white' : '#52525b' }}>
                <span>View Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)' }} />
                <div className="absolute -bottom-0.5 left-0 h-[1px] bg-red-600 transition-all duration-300" style={{ width: hovered ? '100%' : '0%' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ─── LIGHTBOX MODAL (Thumbnails) ───────────────────────────── */
// FIX: Same overlay-button pattern applied here too
function LightboxModal({ item, index, onClose, onPrev, onNext, setLightboxIndexDirect }: {
  item: ThumbnailItem; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
  setLightboxIndexDirect: (i: number) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.1) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 z-10">
        <div className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em]" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          {index + 1} / {thumbnails.length}
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-red-600/20 active:scale-95" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image Area — FIX: full width, nav buttons overlaid */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-4xl">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 80px rgba(220,38,38,0.2), 0 20px 60px rgba(0,0,0,0.8)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-transparent z-10" />
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

              {/* CTR badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em]" style={{ background: 'rgba(220,38,38,0.92)', border: '1px solid rgba(255,100,100,0.3)', color: 'white', backdropFilter: 'blur(8px)' }}>
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {item.ctr} CTR
              </div>

              {/* Style badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.2em]" style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(6px)' }}>
                {item.style}
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
                <p className="text-white text-sm sm:text-xl font-bold tracking-tight leading-tight">{item.title}</p>
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] text-red-400 mt-0.5 sm:mt-1 font-bold">{item.niche}</p>
              </div>

              {/* FIX: Nav buttons overlaid on image at mid-height */}
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-red-400 transition-colors" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip — FIX: larger touch targets */}
      <div
        className="flex-shrink-0 flex justify-center gap-2 px-4 pt-3 pb-4 sm:pt-4 sm:pb-5 overflow-x-auto z-10"
        style={{ scrollbarWidth: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {thumbnails.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setLightboxIndexDirect(i)}
            className="relative rounded overflow-hidden flex-shrink-0 transition-all duration-200"
            style={{
              width: i === index ? 72 : 56,
              height: i === index ? 46 : 36,
              border: i === index ? '2px solid #dc2626' : '2px solid rgba(255,255,255,0.08)',
              opacity: i === index ? 1 : 0.4,
              transform: i === index ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── THUMBNAIL CARD ────────────────────────────────────────── */
function ThumbnailCard({ item, index, onClick }: { item: ThumbnailItem; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.5 }} className="group relative cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
      <div className="absolute -inset-[1px] rounded-[16px] transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.5), transparent 55%)', opacity: hovered ? 1 : 0 }} />
      <div className="relative rounded-[15px] overflow-hidden" style={{ border: hovered ? '1px solid rgba(220,38,38,0.3)' : '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s ease', boxShadow: hovered ? '0 8px 40px rgba(220,38,38,0.12)' : 'none' }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-700" style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', filter: hovered ? 'brightness(0.75)' : 'brightness(0.6)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-transparent origin-left transition-transform duration-400" style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300" style={{ background: hovered ? 'rgba(220,38,38,0.92)' : 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', border: hovered ? '1px solid rgba(255,100,100,0.3)' : '1px solid rgba(255,255,255,0.1)', color: 'white', transform: hovered ? 'translateY(0) scale(1)' : 'translateY(-2px) scale(0.95)', opacity: hovered ? 1 : 0.7 }}>
            <Sparkles className="w-2.5 h-2.5" />{item.ctr} CTR
          </div>
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[8px] font-bold uppercase tracking-[0.18em] bg-black/65 backdrop-blur-sm border border-white/10 text-zinc-400">{item.style}</div>
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{ opacity: hovered ? 1 : 0 }}>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300" style={{ background: 'rgba(220,38,38,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,100,100,0.3)', color: 'white', transform: hovered ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(8px)', boxShadow: '0 0 36px rgba(220,38,38,0.5)' }}>
              <ExternalLink className="w-3.5 h-3.5" />Preview
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between transition-colors duration-300" style={{ background: hovered ? 'rgba(28,6,6,0.98)' : 'rgba(13,13,15,0.98)' }}>
          <div className="min-w-0 flex-1 mr-3">
            <p className="text-[13px] font-bold tracking-tight truncate transition-colors duration-300 leading-tight" style={{ color: hovered ? '#f87171' : 'white' }}>{item.title}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-0.5 truncate">{item.niche}</p>
          </div>
          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300" style={{ background: hovered ? 'rgba(220,38,38,1)' : 'rgba(255,255,255,0.04)', border: hovered ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)', transform: hovered ? 'scale(1.1) rotate(0deg)' : 'scale(1) rotate(-45deg)' }}>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN PORTFOLIO SECTION ────────────────────────────────── */
export default function Portfolio() {
  const webProjects = portfolio.filter((p) => p.type === 'web');
  const videoProjects = portfolio.filter((p) => p.type === 'video');

  // Thumbnail lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + thumbnails.length) % thumbnails.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % thumbnails.length));



  return (
    <section id="portfolio" className="py-16 md:py-24 relative bg-zinc-950 overflow-hidden" aria-label="Portfolio">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red-600/5 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/4 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] font-bold text-red-600 uppercase tracking-[0.4em] mb-4">Our Work</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[0.95] mb-5">
            Selected<br />Projects
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-zinc-500 text-sm leading-relaxed font-light italic max-w-sm mx-auto">
            A curated showcase of digital solutions that helped our clients scale reach and revenue.
          </motion.p>
        </div>

        {/* Video */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em] mb-5 flex items-center gap-3">
          <span className="w-6 h-[1px] bg-red-600 inline-block" />Video & Creative
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {videoProjects.map((item, i) => <VideoCard key={item.id} item={item} index={i} />)}
        </div>

        <div className="my-12 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-white/[0.04]" /><div className="w-1.5 h-1.5 rounded-full bg-red-600" /><div className="flex-1 h-[1px] bg-white/[0.04]" />
        </div>

        {/* Web */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em] mb-5 flex items-center gap-3">
          <span className="w-6 h-[1px] bg-red-600 inline-block" />Web Engineering
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {webProjects.map((item, i) => <WebCard key={item.id} item={item} index={i} />)}
        </div>

        <div className="my-12 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-white/[0.04]" /><div className="w-1.5 h-1.5 rounded-full bg-red-600" /><div className="flex-1 h-[1px] bg-white/[0.04]" />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="w-6 h-[1px] bg-red-600 inline-block" />Thumbnail Design
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.02] self-start sm:self-auto flex-shrink-0">
            <Sparkles className="w-3 h-3 text-red-500 flex-shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 whitespace-nowrap">Premium Quality</span>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {thumbnails.slice(0, 6).map((item, i) => (
            <ThumbnailCard key={item.id} item={item} index={i} onClick={() => openLightbox(i)} />
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest mb-6">Ready to be our next success story?</p>
          <Link href="/#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-[11px] tracking-widest uppercase hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all">
            <span>Start Your Project</span>
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white"><ChevronRight size={14} /></div>
          </Link>
        </motion.div>

      </div>

      {/* Thumbnail Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            item={thumbnails[lightboxIndex]}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            setLightboxIndexDirect={setLightboxIndex}
          />
        )}
      </AnimatePresence>


    </section>
  );
}