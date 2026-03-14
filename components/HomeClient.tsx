'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import TechStack from '@/components/TechStack';
import Stats from '@/components/Stats';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Loading overlay — content is ALWAYS in the DOM for SEO / pre-rendering */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <Hero ready={!loading} />
      <About />
      <Services />
      <Portfolio />
      <TechStack />
      <Stats />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
