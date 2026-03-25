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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center"
        >
          <div className="w-20 h-20 relative">
            <Image
              src="/logo-transparent.png"
              alt="Stuck Studio logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-zinc-800"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear"
            }}
            className="h-full w-1/2 bg-red-600"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
