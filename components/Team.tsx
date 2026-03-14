'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Linkedin, Github, Globe, Mail } from 'lucide-react';
import { useState } from 'react';

const team = [
  {
    name: 'Mohammad Bijoy Hasan',
    role: 'Founder & CEO',
    email: 'mdbijoyhasan009@gmail.com',
    bio: "Visionary founder driving Stuck Studio's mission to deliver cutting-edge digital solutions.",
    image: '/team/bijoy.png',
    links: [] as { icon: React.ReactNode; url: string }[],
  },
  {
    name: 'Mohammad Hridoy',
    role: 'Chief Marketing Officer',
    email: 'hridoy@stuckstudio.com',
    bio: 'Strategic marketer focused on brand growth and audience engagement.',
    image: '/team/hridoy.png',
    links: [] as { icon: React.ReactNode; url: string }[],
  },
  {
    name: 'NH Prince Pradhan',
    role: 'Developer Team Head',
    email: 'contact@nhprince.dpdns.org',
    bio: 'Full-Stack Developer, Python & C Programmer with expertise in React, Django, Node.js, and AI systems.',
    image: '/team/prince.png',
    links: [
      { icon: <Globe size={14} />, url: 'https://nhprince.dpdns.org' },
      { icon: <Github size={14} />, url: 'https://github.com/nhprince' },
      { icon: <Linkedin size={14} />, url: 'https://www.linkedin.com/in/nh-prince-prodhan-a1b46a399' },
    ],
  },
];

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex flex-col cursor-default"
      style={{ borderRadius: '28px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer border ring — sits on top of everything */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none z-30 transition-all duration-500"
        style={{
          border: hovered
            ? '1px solid rgba(220,38,38,0.3)'
            : '1px solid rgba(255,255,255,0.09)',
          boxShadow: hovered
            ? '0 0 0 1px rgba(220,38,38,0.06), 0 20px 60px rgba(0,0,0,0.8)'
            : '0 8px 40px rgba(0,0,0,0.6)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-red-600 via-red-600/60 to-transparent origin-left z-30 transition-transform duration-500 rounded-full"
        style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      {/* Red left border */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] bg-gradient-to-b from-red-600 to-red-800 origin-top z-30 transition-transform duration-500 rounded-full"
        style={{ transform: hovered ? 'scaleY(1)' : 'scaleY(0)' }}
      />

      {/* ── IMAGE AREA ── */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: '28px 28px 0 0', aspectRatio: '4/5' }}
      >
        <Image
          src={member.image}
          alt={`${member.name} — ${member.role}`}
          fill
          className="object-cover transition-all duration-700"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            opacity: hovered ? 1 : 0.82,
            filter: hovered ? 'brightness(0.9)' : 'brightness(0.75)',
          }}
          referrerPolicy="no-referrer"
          unoptimized={member.image.startsWith('http')}
        />

        {/* Deep gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Subtle red tint on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            background: 'linear-gradient(to top, rgba(120,0,0,0.35), transparent 60%)',
          }}
        />



        {/* Floating name/role — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <div
            className="transition-all duration-400"
            style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
          >
            <div
              className="mb-1.5 transition-all duration-300"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.35em]">
                {member.role}
              </span>
            </div>
            <h3 className="text-white text-xl font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {member.name}
            </h3>
          </div>
        </div>
      </div>

      {/* ── GLASS BIO PANEL ── */}
      <div
        className="relative flex flex-col flex-1 justify-between p-5"
        style={{
          borderRadius: '0 0 28px 28px',
          background: 'rgba(12,12,15,0.72)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Top sheen line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />

        <p className="text-zinc-400 text-[13px] leading-relaxed font-light mb-5 line-clamp-3">
          {member.bio}
        </p>

        {/* Social icons */}
        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            title={member.email}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 transition-all duration-300 hover:bg-red-600 hover:text-white"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Mail size={13} />
          </a>

          {member.links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 transition-all duration-300 hover:bg-red-600 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden" aria-label="Team">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/4 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold text-red-600 uppercase tracking-[0.4em] mb-4"
            >
              The People
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[0.95]"
            >
              Meet the<br />Team
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-500 text-sm leading-relaxed font-light italic max-w-xs md:text-right"
          >
            The creative minds and technical experts driving innovation at Stuck Studio.
          </motion.p>
        </div>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em] mb-5 flex items-center gap-3"
        >
          <span className="w-6 h-[1px] bg-red-600 inline-block" />
          Core Team
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}