import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

interface Splatter {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  scale: number;
}

export default function Hero() {
  const [splatters, setSplatters] = useState<Splatter[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    if (!mounted) return;

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
  }, [mounted, spawnSplatter]);

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
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTEgMWg1OHY1OEgxVjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9nPjwvc3ZnPg==')] opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Cinematic Ambient Layer (Option 2) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Film Grain */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

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
                  exit: { duration: 2.5, ease: 'easeIn' }
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
          animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1, y: 0 }}
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
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'backOut' }}
              style={{ filter: 'url(#paint-texture)' }}
              className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 -skew-x-6 -rotate-1 origin-left pointer-events-none rounded-[15%_25%_5%_35%] shadow-[0_4px_12px_rgba(153,27,27,0.4)]"
            />
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ duration: 1, delay: 1, ease: 'circOut' }}
              style={{ filter: 'url(#paint-texture)' }}
              className="absolute inset-0 bg-red-900/50 -skew-x-3 rotate-1 origin-left pointer-events-none rounded-[20%_15%_10%_25%] mix-blend-overlay"
            />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-light tracking-wide italic"
        >
          We craft stunning websites and cinematic video content that elevate brands and turn
          online attention into real business results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <a
            href="/#contact"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            Start a Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/#portfolio"
            className="flex items-center gap-2 px-8 py-4 text-white rounded-full font-medium border border-white/10 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Play size={16} className="fill-white" />
            See Our Work
          </a>
        </motion.div>

      </div>
    </section>
  );
}
