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
  GaddamClinicSite,
  DealItSite,
  AnnotationChip,
} from '@/components/browser-mock';
import { ArrowUpRight } from 'lucide-react';

type Spec = { label: string; value: string };

type Project = {
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  url: string;
  tech: string[];
  specs: Spec[];
  notes: { text: string; color?: 'gold' | 'coral' | 'sage' | 'lavender'; rotate?: number; pos: string }[];
  tapeColor: 'gold' | 'coral' | 'sage' | 'lavender';
  renderSite: () => JSX.Element;
  featured?: boolean;
  focusAreas?: string[];
};

const projects: Project[] = [
  {
    index: '01',
    name: 'Elite Cosmo Clinic',
    tagline: 'Professional clinic website',
    category: 'Healthcare',
    year: '2025',
    description:
      'A professional website for a cosmetic clinic, built to make appointment booking effortless, establish trust with new patients, and give the clinic a modern, credible online presence that stands out in a competitive market.',
    url: 'elitecosmoclinic.com',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    specs: [
      { label: 'Industry', value: 'Cosmetic Clinic' },
      { label: 'Project Type', value: 'Business Website' },
      { label: 'Role', value: 'Design & Development' },
      { label: 'Status', value: 'Live' },
    ],
    notes: [
      { text: 'calm palette — builds trust with patients', color: 'lavender', rotate: -3, pos: 'sm:-left-6 top-10' },
      { text: 'appointment booking front and centre', color: 'sage', rotate: 4, pos: 'right-2 -bottom-6' },
    ],
    tapeColor: 'lavender',
    renderSite: EliteCosmoSite,
  },
  {
    index: '02',
    name: 'Dr. Gaddam Clinic',
    tagline: 'Professional clinic website',
    category: 'Healthcare',
    year: '2025',
    description:
      'A professional website for Dr. Gaddam Clinic, designed to streamline appointment booking, strengthen the clinic\u2019s modern online presence, improve the patient experience, and improve visibility so patients can find and reach the clinic easily.',
    url: 'drgaddamclinic.com',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    specs: [
      { label: 'Industry', value: 'General Clinic' },
      { label: 'Project Type', value: 'Business Website' },
      { label: 'Role', value: 'Design & Development' },
      { label: 'Status', value: 'Live' },
    ],
    notes: [
      { text: 'warm, approachable — feels human', color: 'coral', rotate: 3, pos: '-left-4 top-16' },
      { text: 'booking + video visit options', color: 'gold', rotate: -4, pos: 'right-0 -bottom-4' },
    ],
    tapeColor: 'coral',
    renderSite: GaddamClinicSite,
  },
  {
    index: '03',
    name: 'Deal-it',
    tagline: 'Personal SaaS project · featured',
    category: 'SaaS · Marketplace',
    year: '2025',
    description:
      'Deal-it is my personal SaaS project, built while exploring AI-assisted web development and modern product design. It is a platform focused on secure digital product delivery between buyers and sellers — an end-to-end marketplace concept where trust, transaction security, and a clean user experience come first. Building it taught me how to think like a product designer, not just a developer.',
    url: 'dealit.app',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    specs: [
      { label: 'Industry', value: 'Digital Marketplace' },
      { label: 'Project Type', value: 'SaaS Platform' },
      { label: 'Role', value: 'Product, Design & Development' },
      { label: 'Status', value: 'In Progress' },
    ],
    notes: [
      { text: 'escrow vault — funds held until delivery', color: 'sage', rotate: -3, pos: '-left-6 top-8' },
      { text: 'AI-assisted workflow → faster iteration', color: 'coral', rotate: 5, pos: 'right-2 -bottom-6' },
    ],
    tapeColor: 'sage',
    renderSite: DealItSite,
    featured: true,
    focusAreas: [
      'Product Design',
      'User Experience',
      'Frontend Development',
      'Secure Digital Delivery',
      'Marketplace Concepts',
      'AI-assisted Development Workflow',
      'Modern SaaS Architecture',
      'Responsive Design',
      'Continuous Iteration',
    ],
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
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative">
      {/* big watermark index */}
      <motion.div
        style={{ y: watermarkY }}
        className="pointer-events-none absolute -top-16 right-0 z-0 select-none opacity-[0.07]"
        aria-hidden
      >
        <span className="editorial-num text-[18rem] leading-none text-ink">
          {project.index}
        </span>
      </motion.div>

      {/* featured badge */}
      {project.featured && (
        <Reveal className="absolute -top-10 left-0 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/50 bg-paper/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-coral backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Featured Project
          </span>
        </Reveal>
      )}

      <div
        className={`relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          flip ? 'lg:[direction:rtl]' : ''
        }`}
      >
        {/* editorial info */}
        <div className="lg:[direction:ltr]">
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
              <div className="editorial-label mb-2.5">Technologies</div>
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

          {/* genuine specs — no fake metrics */}
          <Reveal delay={0.25}>
            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-rule pt-5 sm:grid-cols-4">
              {project.specs.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[0.92rem] font-medium text-ink">{s.value}</div>
                  <div className="editorial-label !text-[0.52rem]">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* focus areas — only for featured project */}
          {project.focusAreas && (
            <Reveal delay={0.28}>
              <div className="mt-7">
                <div className="editorial-label mb-2.5">What I worked on</div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {project.focusAreas.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 font-sans text-[0.82rem] text-graphite">
                      <span className="h-1 w-1 rounded-full bg-coral" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

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
