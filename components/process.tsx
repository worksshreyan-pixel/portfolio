'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, SectionIndex, StickyNote, Stamp, Annotation, PencilArrow, Highlight, CornerMarks } from '@/components/paper-kit';

const steps = [
  { n: '01', label: 'Idea', desc: 'We talk. I learn what your business needs and what success looks like.', color: 'gold' as const, rotate: -2 },
  { n: '02', label: 'Research', desc: 'Competitors, audience, references. I assemble a moodboard and blueprint.', color: 'sage' as const, rotate: 1.5 },
  { n: '03', label: 'Design', desc: 'Layouts, typography, motion. Sketches become a refined visual system.', color: 'coral' as const, rotate: -1 },
  { n: '04', label: 'Development', desc: 'Built in Next.js — fast, accessible, responsive, pixel-accurate.', color: 'lavender' as const, rotate: 2 },
  { n: '05', label: 'Launch', desc: 'Deployed, tested, optimised. Lighthouse 95+. Live and performing.', color: 'gold' as const, rotate: -1.5 },
  { n: '06', label: 'Support', desc: 'Iterate, measure, improve. I stay on after launch, not just before.', color: 'sage' as const, rotate: 1 },
];

const reasons = [
  { k: 'Design-led', v: 'I design before I build. Every decision is intentional, not accidental.' },
  { k: 'One person, full stack', v: 'No handoffs, no lost-in-translation. One mind owns the whole thing.' },
  { k: 'Performance obsessed', v: 'Lighthouse 95+, sub-second loads. Beautiful and fast.' },
  { k: 'Built to last', v: 'Clean, maintainable code you can hand off or extend later.' },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const arrowY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="process" ref={ref} className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />
      <div className="blueprint-lines pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="03" label="Services · Process · Why Me" className="mb-12" />
        </Reveal>

        {/* heading */}
        <Reveal>
          <h2 className="display max-w-4xl text-[9vw] leading-[0.9] text-ink sm:text-[6.5vw] lg:text-[5rem]">
            From <Highlight>sketch</Highlight> to ship —<br />
            <span className="text-stone italic font-light">one continuous</span> line.
          </h2>
        </Reveal>

        {/* process flow */}
        <div className="relative mt-20">
          {/* the drawn line connecting steps */}
          <div className="absolute left-[7.5%] top-7 hidden h-px w-[85%] origin-left bg-rule/60 lg:block" />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-[7.5%] top-7 hidden h-px w-[85%] origin-left bg-ink lg:block"
          />

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className="relative">
                {/* node */}
                <div className="relative mb-5 flex items-center gap-2.5">
                  <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink bg-paper">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  </span>
                  <span className="editorial-num text-2xl text-ink">{s.n}</span>
                </div>

                {/* sticky note card */}
                <div
                  className="paper-edge relative px-3.5 py-3"
                  style={{ transform: `rotate(${s.rotate}deg)` }}
                >
                  <div aria-hidden className="tape absolute -top-1.5 left-1/2 h-4 w-12 -translate-x-1/2" style={{ transform: 'translateX(-50%) rotate(-6deg)', background: 'hsla(48,70%,78%,0.6)' }} />
                  <div className="font-display text-base font-medium text-ink">{s.label}</div>
                  <p className="mt-1.5 font-sans text-[0.78rem] leading-snug text-graphite">{s.desc}</p>
                </div>

                {/* arrow between (desktop) */}
                {i < steps.length - 1 && (
                  <motion.div style={{ y: arrowY }} className="absolute -right-5 top-1.5 hidden text-graphite/50 lg:block">
                    <PencilArrow direction="right" className="!w-5" />
                  </motion.div>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* WHY ME — compact, editorial */}
        <Reveal className="mt-28">
          <div className="grid grid-cols-1 gap-10 border-t border-rule pt-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div>
              <div className="editorial-label mb-4">Why work with me</div>
              <h3 className="display text-3xl leading-tight text-ink sm:text-4xl">
                You&rsquo;re not hiring a <span className="text-stone italic">template</span>.
              </h3>
              <Annotation className="mt-5 block text-[0.95rem]" rotate={-2}>
                and you&rsquo;ll feel the difference
              </Annotation>
            </div>

            <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
              {reasons.map((r, i) => (
                <Reveal key={r.k} delay={i * 0.06}>
                  <div className="h-full border-t border-rule/60 px-1 py-5">
                    <div className="editorial-num mb-1.5 text-[0.7rem] text-stone">{String(i + 1).padStart(2, '0')}</div>
                    <div className="font-display text-lg font-medium text-ink">{r.k}</div>
                    <p className="mt-1.5 font-sans text-[0.88rem] leading-snug text-graphite">{r.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
