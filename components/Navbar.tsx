'use client';

import { motion, useMotionValueEvent, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Team', href: '/#team' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    
    // Near top - always show
    if (latest < 100) {
      setIsNavHidden(false);
    } 
    // Scrolling down fast enough - hide
    else if (diff > 50) {
      setIsNavHidden(true);
    } 
    // Scrolling up fast enough - show
    else if (diff < -50) {
      setIsNavHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const sections = navLinks.map(link => link.href.split('#')[1]);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={isNavHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      suppressHydrationWarning
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div 
        suppressHydrationWarning
        className={`max-w-7xl mx-auto h-16 flex items-center justify-between transition-all duration-500 rounded-full px-6 ${
          isScrolled 
            ? 'bg-zinc-950/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo — transparent S icon + text */}
        <Link
          href="/#home"
          aria-label="Stuck Studio — Back to top"
          className="flex items-center gap-3 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        >
          <div className="w-10 h-10 relative shrink-0">
            <Image
              src="/logo-transparent.png"
              alt="Stuck Studio logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col font-display font-bold leading-none tracking-tighter text-xl">
            <span>STUCK</span>
            <span className="flex items-baseline">
              STUDIO<span className="text-red-600 text-2xl leading-none">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.split('#')[1];
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-full ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
          <div className="w-4" />
          <Link
            href="/#contact"
            className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-lg shadow-white/5"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6"
            >
              <button
                className="absolute top-8 right-8 text-white p-2"
                onClick={closeMobile}
              >
                <X size={32} />
              </button>

              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={`text-4xl font-display font-bold transition-colors ${
                        activeSection === link.href.split('#')[1] ? 'text-red-600' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="/#contact"
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-full font-bold text-xl mt-8 shadow-xl shadow-red-600/20 active:scale-95 transition-transform"
                  >
                    Let&apos;s Talk <ArrowRight size={24} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
