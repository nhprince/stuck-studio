'use client';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 relative">
            <Image
              src="/logo-transparent.png"
              alt="Stuck Studio logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col font-display font-bold text-6xl leading-none tracking-tighter text-white">
            <span>STUCK</span>
            <span className="flex items-baseline">
              STUDIO<span className="text-red-600 text-6xl leading-none">.</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-zinc-800"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
            className="h-full w-1/2 bg-red-600"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
