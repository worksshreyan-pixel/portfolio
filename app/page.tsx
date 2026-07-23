'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
import { About } from '@/components/about';
import { Process } from '@/components/process';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.3 });

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-coral"
      />
      <Navigation />
      <main className="relative">
        <Hero />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
