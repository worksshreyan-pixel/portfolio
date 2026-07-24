'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Tape,
  StickyNote,
  Stamp,
  Annotation,
  CornerMarks,
  PaperClip,
  MaskReveal,
  Magnetic,
  Reveal,
} from '@/components/paper-kit';

function MockSite() {
  return (
    <div className="h-full w-full overflow-hidden bg-white text-ink">
      <div className="flex h-10 items-center gap-1.5 border-b border-stone/10 bg-stone/5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/80 shadow-sm" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/80 shadow-sm" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage/80 shadow-sm" />
        <div className="ml-3 h-4 flex-1 rounded-md bg-white shadow-sm ring-1 ring-black/5" />
      </div>
      <div className="relative h-[calc(100%-2.5rem)] overflow-hidden bg-[hsl(38_30%_98%)]">
        <motion.div
          className="absolute inset-x-0 top-0"
          animate={{ y: ['0%', '-50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
        >
          {/* refined clean layout */}
          <div className="p-4">
            <div className="h-20 rounded-xl bg-gradient-to-br from-ink/5 to-ink/10 shadow-sm ring-1 ring-ink/5" />
            <div className="mt-4 h-2.5 w-3/4 rounded-full bg-ink/80" />
            <div className="mt-2 h-2.5 w-1/2 rounded-full bg-ink/40" />
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            <div className="h-16 rounded-lg bg-sage/20 ring-1 ring-sage/30" />
            <div className="h-16 rounded-lg bg-coral/10 ring-1 ring-coral/20" />
            <div className="h-16 rounded-lg bg-gold/10 ring-1 ring-gold/20" />
            <div className="h-16 rounded-lg bg-periwinkle/20 ring-1 ring-periwinkle/30" />
          </div>
          <div className="mt-4 px-4 pb-4">
            <div className="h-24 rounded-xl bg-ink/90 shadow-lg" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Hand-drawn arrow doodle component that animates as if being sketched
function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      width="50"
      height="30"
      viewBox="0 0 50 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <motion.path
        d="M2 28 C 15 25, 32 24, 44 8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M36 10 L 44 8 L 41 18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.8, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// Immediate load animation wrappers for bulletproof mounting near screen edges
function HeroMaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function HeroReveal({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Top-down Coffee Mug Component
function CoffeeMug({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 shadow-[0_15px_30px_rgba(0,0,0,0.18)] flex items-center justify-center border border-white/40 ${className}`}>
      {/* Handle */}
      <div className="absolute -right-3.5 top-6 w-4.5 h-8 rounded-r-md bg-stone-300 border-t border-b border-r border-white/20 shadow-md" />
      {/* Inner mug wall */}
      <div className="w-16 h-16 rounded-full bg-[#fcfcfc] border border-stone-200/50 shadow-inner flex items-center justify-center">
        {/* Coffee content */}
        <div className="w-13 h-13 rounded-full bg-[#3D2314] shadow-inner flex items-center justify-center">
          {/* Coffee crema swirl */}
          <div className="w-10 h-10 rounded-full border border-[#D4A373]/20 border-dashed rotate-45" />
        </div>
      </div>
    </div>
  );
}

// Metal Ruler Component
function MetalRuler({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`w-5 h-56 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-400 border border-stone-400 rounded shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col justify-between py-3 items-center select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex flex-col justify-between h-full w-full px-1">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="flex justify-between w-full h-px">
            <div className={`bg-stone-500/80 ${i % 5 === 0 ? 'w-2.5' : 'w-1.5'}`} />
            <div className={`bg-stone-500/80 ${i % 5 === 0 ? 'w-2.5' : 'w-1.5'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Mechanical Pencil Component
function MechanicalPencil({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`w-2.5 h-48 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-full shadow-[0_6px_15px_rgba(0,0,0,0.1)] flex flex-col justify-between py-1 relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Silver tip */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-stone-300 rounded-b-full border-t border-stone-400/30 flex justify-center items-end">
        <div className="w-1 h-2 bg-stone-800 rounded-b-full" />
      </div>
      {/* Silver pocket clip */}
      <div className="absolute top-4 -right-1 w-1.5 h-10 bg-stone-300 rounded shadow-sm" />
      {/* Eraser cap */}
      <div className="w-full h-3 bg-stone-300 rounded-t-full flex justify-center items-start">
        <div className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-0.5" />
      </div>
    </div>
  );
}

// Color Swatches Fan
function ColorSwatches({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`relative w-28 h-10 select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {[
        { color: 'bg-sage', rot: -20 },
        { color: 'bg-coral', rot: -10 },
        { color: 'bg-gold', rot: 0 },
        { color: 'bg-stone-400', rot: 10 },
        { color: 'bg-ink', rot: 20 },
      ].map((sw, i) => (
        <div
          key={i}
          className={`absolute left-0 bottom-0 w-24 h-5 ${sw.color} rounded-sm border border-white/30 shadow-sm origin-left`}
          style={{ transform: `rotate(${sw.rot}deg)` }}
        />
      ))}
      {/* Grommet eyelet */}
      <div className="absolute left-1.5 bottom-1.5 w-2 h-2 rounded-full bg-stone-300 border border-stone-500 shadow-inner flex items-center justify-center">
        <div className="w-0.5 h-0.5 rounded-full bg-white" />
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const fadeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Spotlight coordinates state
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Buttery smooth parallax springs (Linear/Framer influence)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothOptions = { damping: 50, stiffness: 100, mass: 0.5 };
  const smx = useSpring(mx, smoothOptions);
  const smy = useSpring(my, smoothOptions);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x * 2);
    my.set(y * 2);

    // Track coordinates for the spotlight effect
    setSpotlightPos({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[hsl(38_20%_97%)] px-6 py-20 sm:px-12 lg:px-20"
    >
      {/* Vignette Shadow Frame around pages */}
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.04)]" />

      {/* V2 ultra-subtle blueprint background (slow drifting animation) */}
      <motion.div
        animate={{ x: [0, 6, 0], y: [0, 6, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="blueprint-lines pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
      />

      {/* Dynamic Cursor Spotlight Overlay */}
      {mounted && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-55 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,244,214,0.45), transparent 85%)`
          }}
        />
      )}

      {/* Background Watermark Outlines */}
      <div className="pointer-events-none absolute left-10 bottom-24 z-0 font-display text-[15vw] font-bold text-ink/[0.015] tracking-tighter select-none">
        SHREYAN.STUDIO
      </div>
      <div className="pointer-events-none absolute left-12 top-28 z-0 font-mono text-[7vw] font-bold text-ink/[0.01] tracking-widest select-none">
        01_INDEX
      </div>

      {/* Technical drafting guides and crop marks on canvas */}
      <div className="pointer-events-none absolute inset-x-8 top-12 bottom-12 border-l border-r border-ink/[0.03] z-0 flex justify-between">
        <span className="font-mono text-[0.45rem] text-ink/20 p-2">[Y: 00px]</span>
        <span className="font-mono text-[0.45rem] text-ink/20 p-2">[W: 100%]</span>
      </div>

      {/* Floating drafting marks */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-16 top-24 text-[1.4rem] text-ink/[0.08] select-none pointer-events-none font-sans"
      >
        ○
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/4 bottom-36 text-[1.1rem] text-ink/[0.08] select-none pointer-events-none font-sans"
      >
        +
      </motion.div>

      {/* Large coordinates in background */}
      <div className="absolute right-8 top-10 font-mono text-[0.55rem] text-ink/20 select-none pointer-events-none hidden md:block">
        LAT: 19.076 / LONG: 72.877
      </div>

      <CornerMarks className="opacity-45" />

      <motion.div
        style={{ opacity: fadeOpacity, scale: scaleDown, y: yParallax } as any}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
      >
        {/* ---------------- LEFT: Ultra-premium Typography ---------------- */}
        <div className="relative z-10 flex flex-col justify-center lg:-translate-y-12">

          {/* Subtle measurement marker above label */}
          <div className="flex items-center gap-2 font-mono text-[0.55rem] text-ink/20 mb-3 select-none">
            <span className="w-6 h-px bg-ink/10" />
            <span>CASE BOARD v2.01</span>
            <span className="w-6 h-px bg-ink/10" />
          </div>

          <HeroReveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink/5 ring-1 ring-ink/10">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ink/60">
                Edition · v-2.0.2.6
              </span>
            </div>
          </HeroReveal>

          <div className="relative">
            <h1 className="font-display text-[4vw] font-bold tracking-tight text-[#1a1a1a] leading-[1.25] sm:text-[5vw] lg:text-[3rem] xl:text-[2.5rem]">
              <HeroMaskReveal>
                •   Think -
              </HeroMaskReveal>
              <br />
              <HeroMaskReveal delay={0.08}>
                •   Design -
              </HeroMaskReveal>
              <br />
              <HeroMaskReveal delay={0.16}>
                •   Build -
              </HeroMaskReveal>
            </h1>

            {/* Hand-drawn arrow pointing from text to layout */}
            <SketchArrow className="absolute -left-14 top-1/2 text-coral/40 hidden xl:block -rotate-12" />
          </div>

          {/* Tiny Measurement details */}
          <div className="hidden xl:flex items-center gap-2 text-[0.55rem] font-mono text-ink/20 my-4 select-none">
            <span className="w-8 h-px bg-ink/10" />
            <span>GAP: 32px / 2.0rem</span>
            <span className="w-8 h-px bg-ink/10" />
          </div>

          <HeroReveal delay={0.24}>
            <div className="max-w-[640px]">
              <p className="font-sans text-[20px] font-medium leading-relaxed tracking-tight text-ink/70 lg:text-[22px]">
                I design and build detail-rich, high-performing websites for businesses that want to feel premium and mature.
              </p>
            </div>
          </HeroReveal>

          {/* V2 Refined CTA Section */}
          <HeroReveal delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Magnetic strength={0.2}>
                <a
                  href="#work"
                  data-cursor="View work"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-[#1a1a1a] px-7 py-4 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:bg-black"
                >
                  <span className="font-sans text-[1rem] font-medium tracking-tight">View selected work</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <a
                href="#contact"
                data-cursor="true"
                className="group relative font-sans text-[1rem] font-medium tracking-tight text-ink/80 transition-colors hover:text-ink"
              >
                start a project
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </HeroReveal>

          {/* V2 Statistics - Clean & Subdued */}
          <HeroReveal delay={0.4}>
            <div className="mt-14 flex items-center gap-10 border-t border-ink/10 pt-6 relative">
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight text-ink">03</div>
                <div className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Websites built</div>
              </div>
              <div className="h-10 w-px bg-ink/10" />
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight text-ink">03</div>
                <div className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50">Websites live</div>
              </div>


            </div>
          </HeroReveal>
        </div>

        {/* ---------------- RIGHT: Elevated Desk Illustration ---------------- */}
        <div className="relative h-[560px] w-full sm:h-[680px] lg:h-[760px] lg:-translate-y-8">
          {mounted ? (
            <DeskScene smx={smx} smy={smy} />
          ) : (
            <div className="h-full w-full rounded-2xl bg-white/50" />
          )}
        </div>
      </motion.div>

      {/* V2 Scroll Indicator */}
      <motion.div
        style={{ opacity: fadeOpacity } as any}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ink/40">Scroll</span>
        <div className="flex h-10 w-6 justify-center rounded-full border border-ink/20 p-1">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-ink/60"
          />
        </div>
      </motion.div>
    </section>
  );
}

function DeskScene({ smx, smy }: { smx: any; smy: any }) {
  // Parallax tracking mouse
  const tBackX = useTransform(smx, [-1, 1], [15, -15]);
  const tBackY = useTransform(smy, [-1, 1], [10, -10]);
  const tMidX = useTransform(smx, [-1, 1], [25, -25]);
  const tMidY = useTransform(smy, [-1, 1], [18, -18]);
  const tFrontX = useTransform(smx, [-1, 1], [-8, 8]);
  const tFrontY = useTransform(smy, [-1, 1], [-5, 5]);

  // 3D Mockup Tilt
  const rotateX = useTransform(smy, [-1, 1], [-2.5, 2.5]);
  const rotateY = useTransform(smx, [-1, 1], [2.5, -2.5]);

  // Nested Scroll Parallax
  const { scrollY } = useScroll();
  const scrollBackY = useTransform(scrollY, [0, 800], [0, -45]);
  const scrollMidY = useTransform(scrollY, [0, 800], [0, -15]);
  const scrollFrontY = useTransform(scrollY, [0, 800], [0, 25]);

  return (
    <div className="relative h-full w-full">
      {/* Warm ambient spotlight behind laptop */}
      <div className="absolute left-[30%] top-[25%] -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-gold/10 via-coral/5 to-transparent blur-3xl opacity-80 pointer-events-none" />

      {/* ---- BACK LAYER: Blueprint Sheets & Notebook ---- */}
      <motion.div
        style={{ y: scrollBackY }}
        className="absolute left-[5%] top-[10%] w-[62%] lg:w-[57%]"
      >
        <motion.div
          style={{ x: tBackX, y: tBackY }}
          className="relative rounded-xl border border-ink/10 bg-[hsl(38_30%_96%)] p-4 shadow-[0_20px_40px_rgb(0,0,0,0.03)] ring-1 ring-white/50"
        >
          {/* Faint coffee cup ring stain on blueprint */}
          <div className="absolute -left-1 -bottom-1 w-14 h-14 rounded-full border border-[#3D2314]/5 bg-[#3D2314]/1 opacity-60 pointer-events-none" />

          <CornerMarks className="opacity-30" />
          <div className="mb-4 flex items-center justify-between font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-ink/40">
            <span>Grid.01</span>
            <span className="text-sage/80">Draft</span>
          </div>
          <div className="space-y-2">
            {[100, 85, 60, 40].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-ink/5"
                style={{ width: `${w}%` }}
              />
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="aspect-video rounded-md border border-dashed border-ink/15 bg-white/30" />
              <div className="aspect-video rounded-md border border-dashed border-indigo-200/20 bg-white/30" />
            </div>
          </div>
          <Tape className="absolute -left-4 top-8 h-6 w-20 opacity-80" rotate={-25} color="sage" />
        </motion.div>
      </motion.div>

      {/* ---- MID LAYER: Laptop Device & Coffee Mug ---- */}
      <motion.div
        style={{ y: scrollMidY }}
        className="absolute right-[2%] top-[20%] w-[85%] lg:w-[80%]"
      >
        <motion.div
          style={{ x: tMidX, y: tMidY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative group transition-shadow duration-300"
        >
          {/* Glassy, modern laptop frame */}
          <div className="rounded-t-2xl border border-white/20 bg-[#f0f0f0] p-3 shadow-[0_30px_60px_rgb(0,0,0,0.12)] group-hover:shadow-[0_40px_70px_rgb(0,0,0,0.16)] ring-1 ring-black/5 backdrop-blur-xl">
            <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-inner">
              {/* Refinement on Mocksite screen: realistic UI reflections */}
              <div className="relative h-[260px] sm:h-[320px]">
                <MockSite />
                {/* Diagonal glossy reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </div>
          </div>
          {/* Refined aluminum base */}
          <div className="relative h-4 rounded-b-[40%] bg-gradient-to-b from-[#e5e5e5] to-[#d4d4d4] shadow-md ring-1 ring-black/5" />
          <div className="mx-auto h-2 w-[30%] rounded-b-lg bg-[#b5b5b5] shadow-inner" />

          <Annotation className="absolute -right-6 top-8 max-w-[8rem] text-[0.85rem] font-medium text-coral" rotate={8}>
            pixel perfect
          </Annotation>

          {/* Tiny paperclip graphic on the mockup bezel */}
          <PaperClip className="absolute -right-2 top-0 z-30" rotate={-10} />
        </motion.div>
      </motion.div>

      {/* ---- FRONT LAYER: Sketches, Notebook, Mug & Tools ---- */}
      <motion.div
        style={{ y: scrollFrontY }}
        className="absolute -left-[5%] bottom-[8%] w-[65%] lg:w-[58%] z-20"
      >
        <motion.div
          style={{ x: tFrontX, y: tFrontY }}
          className="relative flex flex-col gap-6"
        >
          {/* Open Sketchbook Spiral notebook */}
          <div className="relative w-72 sm:w-80 h-48 bg-[#FBF9F6] border border-stone-200 rounded-lg shadow-lg relative p-4 flex flex-col justify-between" style={{ transform: 'rotate(-2deg)' }}>
            {/* Spiral binding rings */}
            <div className="absolute left-[-6px] top-4 bottom-4 flex flex-col justify-between w-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-4.5 h-2 bg-gradient-to-r from-stone-300 to-stone-400 rounded-full border border-stone-400/80 shadow-sm" />
              ))}
            </div>

            <div className="flex justify-between font-mono text-[0.5rem] text-ink/30 pl-4 pr-2">
              <span>WIRE FRAME DRAFT</span>
              <span>iteration 03</span>
            </div>

            {/* Sketch Wireframe sketches inside */}
            <div className="grid grid-cols-2 gap-4 pl-4 pr-2 h-full pt-3">
              <div className="border border-dashed border-ink/20 rounded p-2 flex flex-col justify-between bg-white/50">
                <div className="h-6 rounded bg-ink/5" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-ink/10 rounded" />
                  <div className="h-1 w-2/3 bg-ink/10 rounded" />
                </div>
              </div>
              <div className="border border-dashed border-ink/20 rounded p-2 flex flex-col justify-between bg-white/50">
                <div className="h-8 rounded bg-coral/5 border border-coral/10" />
                <div className="h-1.5 w-1/2 bg-ink/15 rounded" />
              </div>
            </div>

            {/* Faint technical label */}
            <div className="text-[0.45rem] font-mono text-stone pl-4">
              [GRID COMPOSITION / ASYMMETRICAL_SCALE]
            </div>

            {/* Tiny Stamp in the notebook */}
            <div className="absolute right-3 bottom-3">
              <Stamp rotate={-8} color="gold" className="scale-75">
                wireframe
              </Stamp>
            </div>
          </div>

          {/* Crisp Sketch Sheet (overlapping sketchbook) */}
          <div
            className="absolute left-1/3 -top-12 rounded-xl border border-ink/5 bg-white p-4 shadow-[0_15px_35px_rgb(0,0,0,0.06)] w-56 hidden sm:block"
            style={{ transform: 'rotate(4deg)' }}
          >
            <Tape className="absolute -top-3 left-6 h-5 w-16 opacity-90" rotate={-8} />
            <div className="mb-2 flex items-center justify-between font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-ink/30">
              <span>Layout.v2</span>
              <span>iteration 04</span>
            </div>
            <svg viewBox="0 0 120 90" className="h-auto w-full text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="8" y="8" width="104" height="74" rx="4" />
              <line x1="8" y1="24" x2="112" y2="24" />
              <rect x="16" y="32" width="40" height="40" rx="2" />
              <rect x="64" y="32" width="40" height="16" rx="2" />
              <rect x="64" y="56" width="40" height="16" rx="2" />
            </svg>
          </div>

          {/* Floating Sticky Note (swaying rotation loop animation) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [5, 9, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[-10%] bottom-[-5%] z-20 w-40"
          >
            <StickyNote color="coral" pin className="shadow-[0_10px_30px_rgb(0,0,0,0.1)]">
              <span className="font-sans text-[0.9rem] font-medium leading-snug text-ink/80">focus on details & spacing ✨</span>
            </StickyNote>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- ADDED DESK PROPS: Coffee Mug, Ruler, Pencil & Swatches ---- */}



      {/* Metal Ruler */}
      <motion.div
        style={{ y: scrollMidY }}
        className="absolute right-[5%] bottom-[12%] z-10 hidden sm:block"
      >
        <motion.div style={{ x: tMidX, y: tMidY }}>
          <MetalRuler rotate={-65} />
        </motion.div>
      </motion.div>

      {/* Mechanical Pencil */}
      <motion.div
        style={{ y: scrollFrontY }}
        className="absolute left-[2%] bottom-[2%] z-30"
      >
        <motion.div style={{ x: tFrontX, y: tFrontY }}>
          <MechanicalPencil rotate={75} />
        </motion.div>
      </motion.div>

      {/* Color Swatches */}
      <motion.div
        style={{ y: scrollBackY }}
        className="absolute right-[3%] top-[4%] z-10 hidden xl:block"
      >
        <motion.div style={{ x: tBackX, y: tBackY }}>
          <ColorSwatches rotate={15} />
        </motion.div>
      </motion.div>

      {/* ---- FOREGROUND: Stamps & Details ---- */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[5%] right-[22%] z-30"
      >
        <Stamp rotate={-12} color="sage" className="scale-110 opacity-90 shadow-sm">
          approved
        </Stamp>
      </motion.div>

      <motion.div
        className="absolute top-[48%] right-[5%] z-30 hidden md:block"
      >
        <Stamp rotate={5} color="coral" className="scale-90 opacity-80 shadow-sm">
          launch ready
        </Stamp>
      </motion.div>

      {/* Additional tiny v2 stamp */}
      <div className="absolute right-[3%] bottom-[35%] z-20">
        <Stamp rotate={18} color="gold" className="scale-75 opacity-70">
          v2.01
        </Stamp>
      </div>

      <div className="absolute left-[44%] top-0 z-20">
        <PaperClip rotate={18} />
      </div>

      <motion.div
        className="absolute left-[44%] top-[48%] z-20 hidden sm:block"
      >
        <Annotation className="text-[0.82rem] text-stone" rotate={-8} arrow>
          focus here
        </Annotation>
      </motion.div>

      {/* measuring guide */}
      <motion.div
        className="absolute -bottom-1 right-8 z-10 hidden flex-col items-end sm:flex"
      >
        <span className="editorial-label mb-1 !text-[0.5rem]">↕ 100vh</span>
        <span className="h-16 w-px bg-ink/30" />
      </motion.div>
    </div>
  );
}
