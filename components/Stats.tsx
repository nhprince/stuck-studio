'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Happy Clients' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

function AnimatedStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500; // ms
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), value);
        setCount(current);
        if (current >= value) clearInterval(interval);
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="font-display text-5xl md:text-6xl font-bold text-white mb-2">
        {count}
        <span className="text-red-500">{suffix}</span>
      </div>
      <div className="text-sm md:text-base text-zinc-400 font-medium uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
