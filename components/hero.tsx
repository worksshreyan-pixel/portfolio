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
  Highlight,
  MaskReveal,
  Magnetic,
  Reveal,
} from '@/components/paper-kit';

/* A small mock website that auto-scrolls inside the laptop screen */
function MockSite() {
  return (
    <div className="h-full w-full overflow-hidden bg-[hsl(38_30%_97%)] text-ink">
      <div className="flex h-8 items-center gap-1.5 border-b border-rule/60 px-3">
        <span className="h-2 w-2 rounded-full bg-coral/70" />
        <span className="h-2 w-2 rounded-full bg-gold/70" />
        <span className="h-2 w-2 rounded-full bg-sage/70" />
        <span className="ml-2 h-3 flex-1 rounded-sm bg-paper-2" />
      </div>
      <div className="relative h-[calc(100%-2rem)] overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0"
          animate={{ y: ['0%', '-62%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        >
          {/* hero */}
          <div className="px-3 pt-3">
            <div className="h-12 rounded-md bg-gradient-to-br from-coral/80 to-gold/70" />
            <div className="mt-2 h-2 w-2/3 rounded-sm bg-ink/70" />
            <div className="mt-1 h-2 w-1/2 rounded-sm bg-ink/30" />
            <div className="mt-2 h-5 w-20 rounded-sm bg-ink/80" />
          </div>
          {/* grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 px-3">
            <div className="h-10 rounded-sm bg-sage/40" />
            <div className="h-10 rounded-sm bg-periwinkle/40" />
            <div className="h-10 rounded-sm bg-gold/40" />
            <div className="h-10 rounded-sm bg-coral/40" />
          </div>
          {/* banner */}
          <div className="mt-3 px-3">
            <div className="h-14 rounded-md bg-ink/85" />
          </div>
          {/* footer */}
          <div className="mt-3 px-3">
            <div className="h-2 w-1/3 rounded-sm bg-ink/40" />
            <div className="mt-1 h-2 w-1/4 rounded-sm bg-ink/20" />
          </div>
        </motion.div>
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

  const yBack = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* parallax tracking the pointer for a living-desk feel */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 40, stiffness: 80 });
  const smy = useSpring(my, { damping: 40, stiffness: 80 });
  const tBackX = useTransform(smx, [-1, 1], [10, -10]);
  const tBackY = useTransform(smy, [-1, 1], [8, -8]);
  const tMidX = useTransform(smx, [-1, 1], [18, -18]);
  const tMidY = useTransform(smy, [-1, 1], [14, -14]);
  const tFrontX = useTransform(smx, [-1, 1], [-6, 6]);
  const tFrontY = useTransform(smy, [-1, 1], [-4, 4]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] w-full overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12"
    >
      {/* faint construction guides */}
      <div className="blueprint-lines pointer-events-none absolute inset-0 opacity-[0.25]" />
      <CornerMarks className="opacity-50" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* ---------------- LEFT: editorial type ---------------- */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10 pt-4 lg:pt-0">
          <Reveal>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="editorial-label">Portfolio · Vol. 01 · 2026</span>
            </div>
          </Reveal>

          <h1 className="display text-[14vw] leading-[0.86] text-ink sm:text-[12vw] lg:text-[7.2rem] xl:text-[8.4rem]">
            <MaskReveal>Designer</MaskReveal>
            <br />
            <MaskReveal delay={0.08} className="text-graphite">
              <span className="italic font-light">&amp;</span> Developer
            </MaskReveal>
            <br />
            <MaskReveal delay={0.16} className="text-ink">
              of <Highlight>premium</Highlight>
            </MaskReveal>
            <br />
            <MaskReveal delay={0.24}>web experiences.</MaskReveal>
          </h1>

          <Reveal delay={0.35} className="mt-8 max-w-md">
            <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
              I&rsquo;m <span className="font-medium text-ink">Shreyan</span> — a creative problem
              solver who obsesses over every pixel. I design and build
              detail-rich, high-performing websites for businesses that want
              to feel premium.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.5}>
              <a
                href="#work"
                data-cursor="View work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-all duration-300 hover:gap-4"
              >
                <span className="font-display text-[0.95rem] font-medium">View selected work</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <a
              href="#contact"
              data-cursor="true"
              className="link-underline font-display text-[0.95rem] text-graphite"
            >
              or start a project →
            </a>
          </Reveal>

          {/* small editorial footer-row */}
          <Reveal delay={0.55} className="mt-12 flex items-center gap-6">
            <div>
              <div className="editorial-num text-3xl text-ink">12<span className="text-stone">+</span></div>
              <div className="editorial-label !text-[0.55rem]">Sites shipped</div>
            </div>
            <div className="h-8 w-px bg-rule" />
            <div>
              <div className="editorial-num text-3xl text-ink">4.9<span className="text-stone">★</span></div>
              <div className="editorial-label !text-[0.55rem]">Client rating</div>
            </div>
            <div className="h-8 w-px bg-rule" />
            <div>
              <div className="editorial-num text-3xl text-ink">95<span className="text-stone">+</span></div>
              <div className="editorial-label !text-[0.55rem]">Lighthouse</div>
            </div>
          </Reveal>
        </motion.div>

        {/* ---------------- RIGHT: desk composition ---------------- */}
        <div className="relative h-[440px] sm:h-[520px] lg:h-[620px]">
          {/* desktop only rich composition */}
          {mounted ? (
            <DeskScene
              yBack={yBack}
              yMid={yMid}
              yFront={yFront}
              tBackX={tBackX}
              tBackY={tBackY}
              tMidX={tMidX}
              tMidY={tMidY}
              tFrontX={tFrontX}
              tFrontY={tFrontY}
            />
          ) : (
            <div className="paper-sheet h-full w-full rounded-xl" />
          )}
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="editorial-label mb-2">Scroll</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto h-8 w-px bg-ink/40"
        />
      </motion.div>
    </section>
  );
}

function DeskScene({
  yBack,
  yMid,
  yFront,
  tBackX,
  tBackY,
  tMidX,
  tMidY,
  tFrontX,
  tFrontY,
}: {
  yBack: any;
  yMid: any;
  yFront: any;
  tBackX: any;
  tBackY: any;
  tMidX: any;
  tMidY: any;
  tFrontX: any;
  tFrontY: any;
}) {
  return (
    <div className="relative h-full w-full">
      {/* ---- BACK LAYER: blueprint + floating browser ---- */}
      <motion.div
        style={{ y: yBack, x: tBackX, translateY: tBackY }}
        className="absolute left-0 top-2 w-[58%] sm:w-[52%]"
      >
        <div className="paper-sheet relative rounded-lg border border-rule/60 p-3">
          <CornerMarks />
          <div className="editorial-label mb-2 flex items-center justify-between">
            <span>blueprint / wireframe</span>
            <span className="text-rule">A-01</span>
          </div>
          <div className="space-y-1.5">
            {[100, 76, 88, 64].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-sm bg-ink/10"
                style={{ width: `${w}%` }}
              />
            ))}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="aspect-[4/3] rounded-sm border border-dashed border-ink/25" />
              <div className="aspect-[4/3] rounded-sm border border-dashed border-ink/25" />
              <div className="aspect-[4/3] rounded-sm border border-dashed border-ink/25" />
            </div>
          </div>
          <Tape className="absolute -left-3 top-6 h-5 w-16" rotate={-32} color="sage" />
        </div>
      </motion.div>

      {/* ---- MID LAYER: laptop showing live site ---- */}
      <motion.div
        style={{ y: yMid, x: tMidX, translateY: tMidY }}
        className="absolute right-0 top-10 w-[74%] sm:w-[68%]"
      >
        <div className="relative">
          {/* tape holding laptop */}
          <Tape className="absolute -top-2 left-1/2 z-20 h-4 w-20 -translate-x-1/2" rotate={-4} />
          {/* laptop frame */}
          <div className="paper-edge rounded-t-xl border border-ink/20 bg-[hsl(30_10%_16%)] p-2 shadow-2xl">
            <div className="overflow-hidden rounded-lg bg-paper">
              <div className="flex items-center gap-1.5 border-b border-rule/50 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-coral/80" />
                <span className="h-2 w-2 rounded-full bg-gold/80" />
                <span className="h-2 w-2 rounded-full bg-sage/80" />
                <div className="ml-2 flex h-4 flex-1 items-center rounded-sm bg-paper-2 px-2">
                  <span className="font-mono text-[0.5rem] text-stone">shreyan.studio</span>
                </div>
              </div>
              <div className="h-[200px] sm:h-[230px]">
                <MockSite />
              </div>
            </div>
          </div>
          {/* base */}
          <div className="relative h-3 rounded-b-[40%] bg-[hsl(30_12%_22%)] shadow-lg" />
          <div className="mx-auto h-1.5 w-1/3 rounded-b-md bg-[hsl(30_14%_28%)]" />

          <Annotation className="absolute -right-2 top-4 max-w-[7rem] text-[0.8rem]" rotate={6}>
            live preview ↗
          </Annotation>
        </div>
      </motion.div>

      {/* ---- FRONT LAYER: sketches, sticky, stamps ---- */}
      <motion.div
        style={{ y: yFront, x: tFrontX, translateY: tFrontY }}
        className="absolute -left-2 bottom-2 w-[46%] sm:w-[42%]"
      >
        {/* sketch sheet */}
        <div
          className="paper-sheet relative rounded-md p-3"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <Tape className="absolute -top-2 left-3 h-4 w-14" rotate={-12} />
          <div className="editorial-label mb-1.5">sketch · 02</div>
          <svg viewBox="0 0 120 90" className="h-auto w-full text-graphite/80" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="8" y="8" width="104" height="74" rx="3" strokeDasharray="3 3" />
            <rect x="14" y="14" width="92" height="12" />
            <line x1="20" y1="20" x2="50" y2="20" />
            <rect x="14" y="32" width="40" height="44" />
            <rect x="60" y="32" width="46" height="20" />
            <rect x="60" y="58" width="46" height="18" />
            <path d="M70 24 l4 4 l4 -4" />
            <path d="M86 40 h16 M86 44 h12" />
          </svg>
          <Annotation className="mt-1 text-[0.78rem]" rotate={2}>
            layout v2
          </Annotation>
        </div>

        {/* sticky note */}
        <StickyNote
          className="absolute -right-10 top-2 w-32 sm:-right-14"
          rotate={7}
          color="coral"
          pin
        >
          <span className="text-graphite">remember: hero must feel premium ✦</span>
        </StickyNote>
      </motion.div>

      {/* ---- FOREGROUND: stamps + paperclip + arrow ---- */}
      <motion.div style={{ y: yFront }} className="absolute right-2 bottom-6 z-20">
        <Stamp rotate={-14} color="sage">
          approved
        </Stamp>
      </motion.div>

      <div className="absolute left-1/2 top-1 z-20">
        <PaperClip rotate={18} />
      </div>

      <motion.div
        style={{ y: yMid }}
        className="absolute left-[42%] top-[52%] z-20 hidden sm:block"
      >
        <Annotation className="text-[0.82rem]" rotate={-8} arrow>
          focus here
        </Annotation>
      </motion.div>

      {/* measuring guide */}
      <motion.div
        style={{ y: yBack }}
        className="absolute -bottom-2 right-10 z-10 hidden flex-col items-end sm:flex"
      >
        <span className="editorial-label mb-1 !text-[0.5rem]">↕ 100vh</span>
        <span className="h-16 w-px bg-ink/30" />
      </motion.div>
    </div>
  );
}
