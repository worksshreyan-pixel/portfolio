'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Reveal,
  SectionIndex,
  CornerMarks,
} from '@/components/paper-kit';
import {
  BrowserMock,
  EliteCosmoSite,
  DealItSite,
  VibeBoltSite,
  AnnotationChip,
} from '@/components/browser-mock';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

type Project = {
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  url: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  notes: { text: string; color?: 'gold' | 'coral' | 'sage'; rotate?: number; pos: string }[];
  tapeColor: 'gold' | 'coral' | 'sage' | 'lavender';
  renderSite: () => JSX.Element;
};

const projects: Project[] = [
  {
    index: '01',
    name: 'Elite Cosmo Clinic',
    tagline: 'Aesthetic clinic, reimagined',
    category: 'Healthcare · Brand & Web',
    year: '2025',
    description:
      'A serene, editorial web experience for a Mumbai aesthetic clinic. Soft dark palette, generous whitespace, and a booking flow that feels less like a form and more like a consultation.',
    url: 'elitecosmoclinic.com',
    tech: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    metrics: [
      { label: 'Lighthouse', value: '98' },
      { label: 'Bookings', value: '+42%' },
      { label: 'Load', value: '0.8s' },
    ],
    notes: [
      { text: 'soft lavender — conveys calm & trust', color: 'lavender' as any, rotate: -3, pos: 'sm:-left-6 top-10' },
      { text: 'booking flow rebuilt — 3 steps → 1', color: 'sage', rotate: 4, pos: 'right-2 -bottom-6' },
    ],
    tapeColor: 'lavender',
    renderSite: EliteCosmoSite,
  },
  {
    index: '02',
    name: 'Deal-it',
    tagline: 'Deals that disappear fast',
    category: 'Commerce · Product Design',
    year: '2025',
    description:
      'A vibrant deals platform with flash timers, category feeds, and a mobile-first grid. I built a design system that scales across thousands of SKUs without losing personality.',
    url: 'dealit.app',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'PWA'],
    metrics: [
      { label: 'Lighthouse', value: '97' },
      { label: 'Conversion', value: '+31%' },
      { label: 'Bounce', value: '-22%' },
    ],
    notes: [
      { text: 'green = go. urgency without anxiety', color: 'sage', rotate: 3, pos: '-left-4 top-16' },
      { text: 'flash timer draws the eye →', color: 'coral', rotate: -4, pos: 'right-0 -bottom-4' },
    ],
    tapeColor: 'sage',
    renderSite: DealItSite,
  },
  {
    index: '03',
    name: 'VibeBolt',
    tagline: 'Ship apps at the speed of thought',
    category: 'SaaS · Developer Tool',
    year: '2025',
    description:
      'An AI-native developer platform brand and marketing site. Electric gradients on deep navy, a live terminal demo, and template cards that make the product feel immediate.',
    url: 'vibebolt.io',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Stripe'],
    metrics: [
      { label: 'Lighthouse', value: '96' },
      { label: 'Signups', value: '+58%' },
      { label: 'Load', value: '0.9s' },
    ],
    notes: [
      { text: 'gradient = energy + speed', color: 'coral', rotate: -3, pos: '-left-6 top-8' },
      { text: 'live terminal builds instant trust', color: 'gold', rotate: 5, pos: 'right-2 -bottom-6' },
    ],
    tapeColor: 'coral',
    renderSite: VibeBoltSite,
  },
];

export function Work() {
  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      {/* section header */}
      <Reveal className="mx-auto mb-20 max-w-[1280px]">
        <SectionIndex n="§" label="Selected Work" className="mb-8" />
        <div className="flex flex-col items-start justify-between gap-6 border-t border-rule pt-8 lg:flex-row lg:items-end">
          <h2 className="display max-w-3xl text-[10vw] leading-[0.9] text-ink sm:text-[7vw] lg:text-[5.5rem]">
            Three projects,<br />
            <span className="text-stone">obsessively</span> crafted.
          </h2>
          <p className="max-w-xs text-pretty font-sans text-[0.95rem] leading-relaxed text-graphite">
            Each one designed and developed end-to-end — from the first
            sketch to the final deploy. Hover the previews to peek inside.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-32 lg:gap-48">
        {projects.map((p, i) => (
          <ProjectSpread key={p.index} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectSpread({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const browserY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const noteY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative">
      {/* big watermark index */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        className="pointer-events-none absolute -top-16 right-0 z-0 select-none opacity-[0.07]"
        aria-hidden
      >
        <span className="editorial-num text-[18rem] leading-none text-ink">
          {project.index}
        </span>
      </motion.div>

      <div
        className={`relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          flip ? 'lg:[direction:rtl]' : ''
        }`}
      >
        {/* [direction] trick — reset children */}
        <div className="lg:[direction:ltr]">
          {/* editorial info */}
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="editorial-num text-xl text-ink">{project.index}</span>
              <span className="h-px w-8 bg-rule" />
              <span className="editorial-label">{project.category}</span>
              <span className="editorial-label text-rule">· {project.year}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="display text-[9vw] leading-[0.9] text-ink sm:text-[6vw] lg:text-[4.4rem]">
              {project.name}
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-display text-lg italic text-stone">{project.tagline}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-pretty font-sans text-[0.98rem] leading-relaxed text-graphite">
              {project.description}
            </p>
          </Reveal>

          {/* tech tags as a designed system */}
          <Reveal delay={0.2}>
            <div className="mt-7">
              <div className="editorial-label mb-2.5">Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-ink/20 bg-paper-2/60 px-2.5 py-1 font-mono text-[0.68rem] text-graphite"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* metrics */}
          <Reveal delay={0.25}>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-rule pt-5">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="editorial-num text-2xl text-ink">{m.value}</div>
                  <div className="editorial-label !text-[0.52rem]">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <a
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit live"
              className="group mt-7 inline-flex items-center gap-2.5 border-b border-ink pb-1 font-display text-[0.95rem] text-ink transition-all duration-300 hover:gap-4"
            >
              Visit Website
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        {/* browser mock + annotations */}
        <div className="relative lg:[direction:ltr]">
          <motion.div style={{ y: browserY }}>
            <BrowserMock
              url={project.url}
              renderSite={project.renderSite}
              rotate={flip ? 2 : -2}
              tapeColor={project.tapeColor}
              index={project.index}
              metrics={project.metrics}
            />
          </motion.div>

          {/* pinned annotation notes */}
          {project.notes.map((note, ni) => (
            <motion.div
              key={ni}
              style={{ y: noteY }}
              className={`absolute z-20 ${note.pos}`}
            >
              <AnnotationChip
                rotate={note.rotate}
                color={note.color as 'gold' | 'coral' | 'sage'}
              >
                {note.text}
              </AnnotationChip>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
