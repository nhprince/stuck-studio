'use client';

import { motion } from 'motion/react';

const techStack = [
  // Web Dev — use CDN brand colors (no /ffffff suffix)
  { name: 'React',        slug: 'react',            local: null },
  { name: 'Next.js',      slug: 'nextdotjs',        local: null },
  { name: 'Vue.js',       slug: 'vuedotjs',         local: null },
  { name: 'Angular',      slug: 'angular',          local: null },
  { name: 'Django',       slug: 'django',           local: null },
  { name: 'Node.js',      slug: 'nodedotjs',        local: null },
  { name: 'Flutter',      slug: 'flutter',          local: null },
  { name: 'Laravel',      slug: 'laravel',          local: null },
  { name: 'TypeScript',   slug: 'typescript',       local: null },
  { name: 'Python',       slug: 'python',           local: null },
  { name: 'PostgreSQL',   slug: 'postgresql',       local: null },
  { name: 'Tailwind CSS', slug: 'tailwindcss',      local: null },
  { name: 'Figma',        slug: 'figma',            local: null },
  // Video editing — local assets (preferred)
  { name: 'Premiere Pro',    slug: 'adobepremierepro',  local: '/premiere.svg'     },
  { name: 'After Effects',   slug: 'adobeaftereffects', local: '/aftereffects.svg' },
  { name: 'DaVinci Resolve', slug: 'davinciresolve',    local: '/davinci.png'      },
  { name: 'Final Cut Pro',   slug: 'apple',             local: '/finalcut.png'     },
  { name: 'CapCut',          slug: 'capcut',            local: '/capcut.png'       },
];

function TechIcon({ name, slug, local }: { name: string; slug: string; local: string | null }) {
  // Brand-colored CDN URL (no color suffix = uses official brand color)
  const cdnUrl = `https://cdn.simpleicons.org/${slug}`;
  const src = local ?? cdnUrl;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (local && img.src.includes(local.replace(/^\//, ''))) {
      // Local failed → try CDN brand color
      img.src = cdnUrl;
    } else {
      // CDN also failed → hide gracefully
      img.style.display = 'none';
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-10 md:px-14 group gap-3"
      title={name}
    >
      <div className="relative w-10 h-10 md:w-14 md:h-14 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="w-full h-full object-contain"
          onError={handleError}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <span className="text-xs text-zinc-600 group-hover:text-zinc-300 transition-colors whitespace-nowrap font-medium">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const doubled = [...techStack, ...techStack];

  return (
    <section className="py-16 border-y border-white/5 bg-zinc-950 overflow-hidden" aria-label="Technology stack">
      <div className="text-center mb-10">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
          Technologies &amp; Tools We Use
        </p>
      </div>
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap items-end"
        >
          {doubled.map((tech, index) => (
            <TechIcon key={`${tech.slug}-${index}`} {...tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
