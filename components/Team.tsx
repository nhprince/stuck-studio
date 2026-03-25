'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Globe, Github, Linkedin, Mail, CircleCheckBig } from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────────────── */
const members = [
  {
    name: 'NH Prince Pradhan',
    role: 'Developer Team Head',
    email: 'contact@nhprince.dpdns.org',
    image: '/team/prince.png',
    position: 'left',
    links: [
      { icon: <Globe size={12} />, url: 'https://nhprince.dpdns.org' },
      { icon: <Github size={12} />, url: 'https://github.com/nhprince' },
      { icon: <Linkedin size={12} />, url: 'https://www.linkedin.com/in/nh-prince-prodhan-a1b46a399' },
    ],
  },
  {
    name: 'Mohammad Bijoy Hasan',
    role: 'Founder & CEO',
    email: 'mdbijoyhasan009@gmail.com',
    image: '/team/bijoy.png',
    position: 'center',
    links: [],
  },
  {
    name: 'Mohammad Hridoy',
    role: 'Chief Marketing Officer',
    email: 'hridoy@stuckstudio.com',
    image: '/team/hridoy.png',
    position: 'right',
    links: [],
  },
];

const highlights = [
  'Creative media production that converts',
  'Full-stack web development expertise',
  'Data-driven YouTube growth strategy',
  'End-to-end brand storytelling',
];

/* ─── ICON BUTTON ───────────────────────────────────────────── */
function IconBtn({ href, external, children }: any) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 hover:scale-110"
    >
      {children}
    </a>
  );
}

/* ─── MEMBER CARD (GLASSMORPHISM) ───────────────────────────── */
function Member({ m, index }: { m: any; index: number }) {
  const isCenter = m.position === 'center';

  // Responsive absolute positioning to prevent mobile overlap
  const positionClasses = {
    center: 'top-0 left-1/2 -translate-x-1/2 z-30',
    left: 'top-[35%] sm:top-[40%] left-0 sm:-left-4 z-20',
    right: 'top-[65%] sm:top-[55%] right-0 sm:-right-4 z-10',
  }[m.position as 'left' | 'center' | 'right'];

  // 3D parallax refs & state
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler as any);
    };
  }, []);

  function handlePointerMove(e: React.PointerEvent) {
    if (reducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5; // -0.5 .. 0.5
    const py = y / rect.height - 0.5;
    const rotateY = px * 14; // degrees
    const rotateX = -py * 14;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.setProperty('--rx', `${rotateX}deg`);
    el.style.setProperty('--ry', `${rotateY}deg`);
  }

  function handlePointerLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  }

  return (
    <div className={`absolute ${positionClasses} group w-full max-w-[150px] sm:max-w-none sm:w-auto`}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={() => setIsActive((s) => !s)}
        className={`flex flex-col items-center will-change-transform transition-transform duration-500 ${isActive ? 'scale-105' : ''}`}
        style={{ animation: `float 6s ease-in-out infinite ${index * 1.5}s`, transformStyle: 'preserve-3d' }}
      >
        {/* Glowing Avatar */}
        <div
          className={`relative rounded-full p-[2px] bg-gradient-to-b from-red-500/60 to-transparent shadow-[0_0_30px_rgba(220,38,38,0.15)] mb-3 sm:mb-4 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] ${
            isCenter ? 'w-20 h-20 sm:w-28 sm:h-28' : 'w-16 h-16 sm:w-20 sm:h-20'
          }`}
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 20%, rgba(255,80,80,0.12), transparent 40%)',
              filter: 'blur(18px)',
              transform: 'translateZ(22px)',
              opacity: 0.95,
            }}
          />

          <div className="w-full h-full relative rounded-full overflow-hidden bg-zinc-950 border border-black" style={{ transform: 'translateZ(36px)' }}>
            <Image src={m.image} alt={m.name} fill className="object-cover" />
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-3 sm:p-4 text-center sm:min-w-[190px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:bg-white/[0.04] group-hover:border-white/[0.15]">
          <p className="text-[13px] sm:text-[14px] font-bold text-zinc-100 mb-0.5 leading-tight">{m.name}</p>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 mb-3">{m.role}</p>

          <div className="flex justify-center gap-2" style={{ transform: 'translateZ(18px)' }}>
            <IconBtn href={`mailto:${m.email}`}>
              <Mail size={12} />
            </IconBtn>
            {m.links?.map((l: any, i: number) => (
              <IconBtn key={i} href={l.url} external>
                {l.icon}
              </IconBtn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── VISUAL SYSTEM ─────────────────────────────────────────── */
function TeamVisual() {
  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      // Adjusted height specifically for mobile to accommodate the staggered layout
      className="relative w-full max-w-[450px] h-[480px] sm:h-[450px] mx-auto mt-8 lg:mt-0"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Background ambient glow for the glass effect to contrast against */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {members.map((m, i) => (
        <Member key={i} m={m} index={i} />
      ))}
    </motion.div>
  );
}

/* ─── SECTION ───────────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* LEFT */}
        <div className="text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Building dominance <br className="hidden sm:block" />
            <span className="text-red-600 italic">through strategic content.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0"
          >
            Stuck Studio helps brands dominate with content & engineering.
          </motion.p>

          <ul className="space-y-4 max-w-md mx-auto lg:mx-0 text-left">
            {highlights.map((h, i) => (
              <motion.li 
                key={h} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-zinc-300 font-medium text-sm sm:text-base"
              >
                <CircleCheckBig size={18} className="text-red-600 shrink-0" />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center items-center w-full">
          <TeamVisual />
        </div>

      </div>
    </section>
  );
}