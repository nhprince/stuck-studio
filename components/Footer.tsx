'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Youtube, 
  Twitter, 
  Instagram, 
  Facebook, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

const footerLinks = {
  services: [
    { label: 'Web Development', href: '/#services' },
    { label: 'Video Editing', href: '/#services' },
    { label: 'YouTube Growth', href: '/#services' },
    { label: 'Thumbnail Design', href: '/#services' },
    { label: 'Social Media', href: '/#services' },
  ],
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Team', href: '/#team' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socials = [
  { 
    icon: <Linkedin size={20} />, 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/company/stuckstudio',
    glowColor: 'group-hover:text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]'
  },
  { 
    icon: <Youtube size={20} />,  
    label: 'YouTube',  
    href: 'https://youtube.com/@stuckstudio',
    glowColor: 'group-hover:text-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
  },
  { 
    icon: <Twitter size={20} />,  
    label: 'Twitter',  
    href: 'https://x.com/stuckstudio',
    glowColor: 'group-hover:text-sky-400 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'
  },
  { 
    icon: <Instagram size={20} />, 
    label: 'Instagram',
    href: 'https://instagram.com/stuckstudio',
    glowColor: 'group-hover:text-pink-500 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]'
  },
  { 
    icon: <Facebook size={20} />, 
    label: 'Facebook', 
    href: 'https://facebook.com/stuckstudio',
    glowColor: 'group-hover:text-blue-600 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]'
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative z-10 border-t border-white/5 bg-zinc-950 pt-24 pb-12 overflow-hidden" 
      aria-label="Footer"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-100/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link
              href="/#home"
              className="flex items-center gap-3 w-fit group"
            >
              <div className="w-12 h-12 relative shrink-0">
                <Image
                  src="/logo-transparent.png"
                  alt="Stuck Studio"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col font-display font-bold leading-none tracking-tighter text-2xl">
                <span>STUCK</span>
                <span className="flex items-baseline">
                  STUDIO<span className="text-red-600 text-3xl leading-none">.</span>
                </span>
              </div>
            </Link>
            
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
              From Cut to Creativity. We help visionary brands grow online through cinematic content, high-converting code, and strategic YouTube management.
            </p>

            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className={`relative z-10 text-zinc-500 transition-all duration-300 ${s.glowColor}`}>
                    {s.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-zinc-400 hover:text-white transition-all text-[15px] relative w-fit"
                  >
                    <ChevronRight className="w-0 group-hover:w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-0 group-hover:mr-2 text-red-600" />
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-zinc-400 hover:text-white transition-all text-[15px] relative w-fit"
                  >
                    <ChevronRight className="w-0 group-hover:w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-0 group-hover:mr-2 text-red-600" />
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-[0.2em]">Get In Touch</h4>
            <div className="space-y-5">
              <a 
                href="mailto:info@stuckstudio.com" 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:bg-white group-hover:text-red-600 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-zinc-500 mb-1 group-hover:text-red-500 transition-colors">Email Us</span>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">info@stuckstudio.com</span>
                </div>
              </a>

              <a 
                href="https://wa.me/8801967385336" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100/5 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-zinc-500 mb-1 group-hover:text-red-500 transition-colors">WhatsApp</span>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">+880 1967 385 336</span>
                </div>
              </a>

              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-zinc-100/5 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-zinc-500 mb-1 group-hover:text-red-500 transition-colors">Location</span>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-zinc-500">
            <p>© {year} Stuck Studio. All rights reserved.</p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-800" />
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Back to top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={scrollToTop}
                className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900 border border-white/5 hover:border-red-600/50 hover:bg-zinc-800 transition-all duration-300 shadow-xl"
                aria-label="Scroll back to top"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  Back to Top
                </span>
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:translate-y-[-2px] transition-transform">
                  <ArrowUp size={14} />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
}
