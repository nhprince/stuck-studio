'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Linkedin, Github, Globe, Mail } from 'lucide-react';

const team = [
  {
    name: 'Mohammad Bijoy Hasan',
    role: 'Founder & CEO',
    email: 'bijoy@stuckstudio.com',
    bio: 'Visionary founder driving Stuck Studio\'s mission to deliver cutting-edge digital solutions.',
    image: '/team/bijoy.jpeg',
    links: [] as { icon: React.ReactNode; url: string }[],
  },
  {
    name: 'Mohammad Hridoy',
    role: 'Chief Marketing Officer',
    email: 'hridoy@stuckstudio.com',
    bio: 'Strategic marketer focused on brand growth and audience engagement.',
    image: 'https://picsum.photos/seed/hridoy/400/500?grayscale',
    links: [] as { icon: React.ReactNode; url: string }[],
  },
  {
    name: 'NH Prince Pradhan',
    role: 'Chief Technology Officer',
    email: 'prince@stuckstudio.com',
    bio: 'Full-Stack Developer, Python & C Programmer with expertise in React, Django, Node.js, and AI systems.',
    image: '/team/prince.jpeg',
    links: [
      { icon: <Globe size={16} />, url: 'https://nhprince.dpdns.org' },
      { icon: <Github size={16} />, url: 'https://github.com/nhprince' },
      { icon: <Linkedin size={16} />, url: 'https://linkedin.com/in/nhprince' },
    ],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden" aria-label="Team">
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
            The People
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg leading-relaxed font-light tracking-wide italic"
          >
            The creative minds and technical experts driving innovation at Stuck Studio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[28px] overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col"
              suppressHydrationWarning
            >
              <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Image Area with Floating Text Overlay */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  unoptimized={member.image.startsWith('http')}
                />

                {/* Advanced Multi-layer Gradient for Text Legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                {/* Floating Identification Text */}
                <div className="absolute inset-x-0 bottom-0 p-6 pt-16">
                  <motion.div
                    className="transform transition-all duration-500 group-hover:-translate-y-1"
                  >
                    <h3 className="text-2xl font-display font-bold text-white mb-1.5 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:text-white">
                      {member.name}
                    </h3>
                    <p className="text-zinc-400 font-display font-bold text-[9px] uppercase tracking-[0.35em] transition-all duration-500 group-hover:text-red-500 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                      {member.role}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Bio & Socials Area */}
              <div className="p-6 pb-8 flex-1 flex flex-col justify-between">
                <p className="text-zinc-400 text-[13px] mb-6 leading-relaxed line-clamp-3 font-light">
                  {member.bio}
                </p>

                <div className="flex items-center gap-2.5 pt-5 border-t border-white/5 mt-auto">
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    title={member.email}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-red-600 transition-all duration-300 group/icon"
                  >
                    <Mail size={14} />
                  </a>

                  {member.links?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-red-600 transition-all duration-300"
                    >
                      {/* Clone the icon element with a smaller size if possible, else just wrap */}
                      <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 flex items-center justify-center">
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
