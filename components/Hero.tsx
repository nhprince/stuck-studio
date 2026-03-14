import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface Splatter {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  scale: number;
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const [splatters, setSplatters] = useState<Splatter[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const spawnSplatter = useCallback((x: number, y: number) => {
    const newSplatter: Splatter = {
      id: Math.random() + Date.now(),
      x,
      y,
      size: Math.random() * 100 + 80,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.4 + 0.8,
    };

    setSplatters(prev => [...prev, newSplatter]);

    // Auto-remove after animation
    setTimeout(() => {
      setSplatters(prev => prev.filter(s => s.id !== newSplatter.id));
    }, 5000);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spawnSplatter(e.clientX - rect.left, e.clientY - rect.top);
  }, [spawnSplatter]);

  // Auto-splatter on load
  useEffect(() => {
    if (!mounted || !ready) return;

    const timer = setTimeout(() => {
      // Artistic scatter points (scaled for mobile)
      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.6 : 1;

      const scatterPoints = [
        { x: -240 * scale, y: -60 * scale }, // Top Left
        { x: 260 * scale, y: 80 * scale },   // Bottom Right
        { x: -180 * scale, y: 120 * scale },  // Bottom Left
      ];

      scatterPoints.forEach((point, i) => {
        setTimeout(() => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          spawnSplatter(centerX + point.x, centerY + point.y);
        }, i * 400);
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [mounted, ready, spawnSplatter]);

  return (
    <section
      id="home"
      onPointerDown={handlePointerDown}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 cursor-crosshair select-none"
      aria-label="Hero"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Filter for Paint Texture */}
      <svg className="hidden">
        <filter id="paint-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
        </filter>
      </svg>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTEgMWg1OHY1OEgxVjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9nPjwvc3ZnPg==\")" }}
        aria-hidden="true"
      />

      {/* Cinematic Ambient Layer (Option 2) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Film Grain */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

        {/* Drifting Light Leaks */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -120, 80, 0],
                y: [0, 100, -80, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
              className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-zinc-600/10 rounded-full blur-[150px]"
            />
          </div>
        )}
      </div>

      {/* Interactive Splatters Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {mounted && (
          <AnimatePresence mode="popLayout">
            {splatters.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0, rotate: s.rotation }}
                animate={{ opacity: 0.6, scale: s.scale }}
                exit={{ opacity: 0, scale: s.scale * 1.5, filter: 'blur(40px)' }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { type: 'spring', damping: 20, stiffness: 90 },
                }}
                style={{
                  left: s.x,
                  top: s.y,
                  width: s.size,
                  height: s.size,
                  filter: 'url(#paint-texture)',
                  x: '-50%',
                  y: '-50%',
                }}
                className="absolute bg-gradient-to-br from-red-600 to-red-900 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] mix-blend-multiply shadow-[0_4px_24px_rgba(153,27,27,0.3)]"
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-display font-semibold text-zinc-300 uppercase tracking-[0.2em] pt-0.5">
              Digital Growth Agency
            </span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6"
        >
          From{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Cut
          </span>{' '}
          to{' '}
          <br className="hidden md:block" />
          <span className="relative inline-block px-5 py-2 ml-1">
            <span className="relative z-10 italic font-light">Creativity.</span>
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'backOut' }}
              style={{ filter: 'url(#paint-texture)' }}
              className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 -skew-x-6 -rotate-1 origin-left pointer-events-none rounded-[15%_25%_5%_35%] shadow-[0_4px_12px_rgba(153,27,27,0.4)]"
            />
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={ready ? { scaleX: 1, opacity: 0.4 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1, delay: 1, ease: 'circOut' }}
              style={{ filter: 'url(#paint-texture)' }}
              className="absolute inset-0 bg-red-900/50 -skew-x-3 rotate-1 origin-left pointer-events-none rounded-[20%_15%_10%_25%] mix-blend-overlay"
            />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-light tracking-wide italic"
        >
          We craft stunning websites and cinematic video content that elevate brands and turn
          online attention into real business results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-20"
        >
          {/* Primary CTA: Start a Project */}
          <div className="relative group/btn">
            <Link
              href="/#contact"
              className="relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-display font-bold text-[12px] tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-[0_15px_40px_rgba(255,255,255,0.08)] group overflow-hidden"
            >
              {/* Premium Shimmer Sweep */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
                <motion.div
                  animate={{ 
                    x: ['-100%', '200%'],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 2
                  }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-red-600/10 to-transparent -skew-x-12"
                />
              </div>

              {/* Internal Light Flare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <span className="relative z-10">Start a Project</span>
              
              <div className="relative z-10 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:rotate-[-45deg] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                <ArrowRight size={16} />
              </div>
            </Link>

            {/* Premium Outer Pulsing Rings */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-red-600/0 group-hover/btn:border-red-600/20 group-hover/btn:scale-[1.15] transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border border-red-600/0 group-hover/btn:border-red-600/10 group-hover/btn:scale-[1.3] transition-all duration-1000" />
            </div>
          </div>

          {/* Secondary CTA: See Our Work */}
          <Link
            href="/#portfolio"
            className="group relative flex items-center gap-3 px-8 py-4 text-white rounded-full font-display font-bold text-[12px] tracking-[0.2em] uppercase border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.03] backdrop-blur-sm"
          >
            {/* Play icon animation */}
            <div className="relative">
              <Play size={16} className="fill-white group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white rounded-full -z-10 blur-sm"
              />
            </div>
            <span>See Our Work</span>

            {/* Bottom Border Orbit */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent group-hover:w-1/2 transition-all duration-700" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
