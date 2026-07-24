'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, SectionIndex, Stamp, Annotation, PencilArrow, Highlight, CornerMarks } from '@/components/paper-kit';
import { Code2, Palette, Sparkles, Layers } from 'lucide-react';

const tech = [
  { name: 'Next.js', role: 'Framework', icon: Code2 },
  { name: 'React', role: 'UI Library', icon: Layers },
  { name: 'TypeScript', role: 'Type System', icon: Sparkles },
  { name: 'Tailwind CSS', role: 'Styling', icon: Palette },
  { name: 'Framer Motion', role: 'Animation', icon: Sparkles },
  { name: 'Supabase', role: 'Backend', icon: Layers },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const stampRotate = useTransform(scrollYProgress, [0, 1], [-12, -4]);
  const ySide = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="02" label="About" className="mb-12" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* editorial story */}
          <div>
            <Reveal>
              <h2 className="display text-[9vw] leading-[0.92] text-ink sm:text-[6.5vw] lg:text-[5rem]">
                All <span className="text-stone italic font-light">Project</span><br />
                starts with <br />
                <Highlight>Curosity</Highlight> Ends with Experience.
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                I am an Engineering student passionate about building premium websites and digital experiences.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-5 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                While working on Dealit, I discovered the power of AI-assisted development and modern web technologies.
                That journey inspired me to start creating professional websites while continuously improving my design and development skills.
              </p>
            </Reveal>
            <Reveal delay={0.28} className="mt-5 max-w-xl">
              <p className="text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                Today I enjoy combining design thinking, frontend engineering and AI tools to build modern, fast and visually refined digital experiences.
                My long-term goal is to build a premium web design agency.
              </p>
            </Reveal>

            <Reveal delay={0.32} className="mt-8 flex items-center gap-5">
              <Annotation className="text-[1rem]" rotate={-2}>
                continuously learning, always shipping
              </Annotation>
              <PencilArrow direction="right" className="opacity-60" />
            </Reveal>
          </div>

          {/* side: tech system + stamp */}
          <motion.div style={{ y: ySide, willChange: 'transform' }} className="relative">
            <Reveal delay={0.1}>
              <div className="paper-sheet relative rounded-xl border border-rule/60 p-7">
                <Tape />
                <div className="editorial-label mb-1">Toolkit / Specimen sheet</div>
                <div className="editorial-num text-ink text-lg">No. 02 — Stack</div>

                <div className="mt-6 space-y-px">
                  {tech.map((t) => (
                    <div
                      key={t.name}
                      className="group flex items-center gap-4 border-b border-rule/40 py-3 transition-colors hover:bg-paper-2/40"
                    >
                      <span className="editorial-num w-5 text-[0.7rem] text-stone">{String(tech.indexOf(t) + 1).padStart(2, '0')}</span>
                      <t.icon size={16} className="text-graphite" strokeWidth={1.6} />
                      <div className="flex-1">
                        <div className="font-display text-[0.95rem] text-ink">{t.name}</div>
                        <div className="editorial-label !text-[0.5rem] !tracking-[0.18em]">{t.role}</div>
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-coral opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="editorial-label !text-[0.5rem]">specimen · 2026</span>
                  <span className="font-mono text-[0.55rem] text-stone">S/02</span>
                </div>
              </div>
            </Reveal>

            <motion.div style={{ rotate: stampRotate, willChange: 'transform' }} className="absolute -right-3 -top-6 z-20">
              <Stamp color="coral" rotate={0}>
                made by hand
              </Stamp>
            </motion.div>

            <div className="absolute -bottom-6 -left-6 z-20">
              <Annotation className="text-[0.85rem]" rotate={-6} arrow>
                real tools, real craft
              </Annotation>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Tape() {
  return (
    <div
      aria-hidden
      className="tape absolute -left-3 -top-2.5 h-5 w-20"
      style={{ transform: 'rotate(-14deg)' }}
    />
  );
}
