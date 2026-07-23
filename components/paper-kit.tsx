'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Paper Canvas — the warm tactile background (grain, grid, lighting)  */
/* ------------------------------------------------------------------ */
export function PaperCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base paper */}
      <div className="paper-canvas absolute inset-0" />
      {/* faint blueprint dot grid */}
      <div className="blueprint-grid absolute inset-0 opacity-[0.5]" />
      {/* blueprint construction lines */}
      <div className="blueprint-lines absolute inset-0 opacity-[0.35]" />
      {/* radial warm light top center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% -5%, rgba(255,250,238,0.6), rgba(255,250,238,0))',
        }}
      />
      {/* paper fibres — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor — magnetic ring + dot, hide on touch                  */
/* ------------------------------------------------------------------ */
export function CustomCursor() {
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringSX = useSpring(ringX, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringSY = useSpring(ringY, { damping: 28, stiffness: 320, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor], input, textarea, [role="button"]');
      setHovering(!!interactive);
      const c = interactive?.getAttribute('data-cursor');
      setLabel(c && c !== 'true' ? c : null);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', dn);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
    };
  }, [ringX, ringY, dotX, dotY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        style={{ x: ringSX, y: ringSY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 30,
            height: hovering ? 56 : 30,
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40 flex items-center justify-center"
          style={{ marginLeft: 0, marginTop: 0 }}
        >
          {label ? (
            <span className="editorial-label text-ink !text-[0.5rem] !tracking-[0.18em] px-1 text-center leading-tight">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/70" />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Masking tape                                                        */
/* ------------------------------------------------------------------ */
export function Tape({
  className = '',
  rotate = -6,
  color = 'gold',
}: {
  className?: string;
  rotate?: number;
  color?: 'gold' | 'coral' | 'sage' | 'lavender';
}) {
  const colors: Record<string, string> = {
    gold: 'hsla(48, 70%, 78%, 0.6)',
    coral: 'hsla(9, 70%, 70%, 0.55)',
    sage: 'hsla(90, 22%, 70%, 0.55)',
    lavender: 'hsla(260, 22%, 76%, 0.55)',
  };
  return (
    <div
      aria-hidden
      className={`tape ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: colors[color],
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Sticky note                                                         */
/* ------------------------------------------------------------------ */
export function StickyNote({
  children,
  className = '',
  rotate = 4,
  color = 'gold',
  pin = false,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'gold' | 'coral' | 'sage' | 'lavender' | 'white';
  pin?: boolean;
}) {
  const bg: Record<string, string> = {
    gold: 'hsl(48 60% 86%)',
    coral: 'hsl(9 58% 82%)',
    sage: 'hsl(90 22% 84%)',
    lavender: 'hsl(260 18% 86%)',
    white: 'hsl(38 35% 97%)',
  };
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {pin && (
        <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 z-10 flex h-3 w-3 items-center justify-center">
          <span className="block h-2.5 w-2.5 rounded-full bg-coral shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
          <span className="absolute h-3 w-[1px] bg-ink/30 -rotate-12" />
        </span>
      )}
      <div
        className="paper-edge relative px-4 py-3 font-hand text-[1.05rem] leading-snug"
        style={{ background: bg[color] }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stamp — rotated circular/rounded approval stamp                     */
/* ------------------------------------------------------------------ */
export function Stamp({
  children,
  className = '',
  rotate = -12,
  color = 'coral',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'coral' | 'sage' | 'ink' | 'gold';
}) {
  const c: Record<string, string> = {
    coral: 'hsl(var(--coral))',
    sage: 'hsl(var(--sage))',
    ink: 'hsl(var(--ink))',
    gold: 'hsl(var(--gold))',
  };
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <div
        className="rounded-md border-2 px-3 py-1.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.18em]"
        style={{
          borderColor: c[color],
          color: c[color],
          opacity: 0.82,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Handwritten annotation with pencil arrow                           */
/* ------------------------------------------------------------------ */
export function Annotation({
  children,
  className = '',
  rotate = -3,
  arrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  arrow?: boolean;
}) {
  return (
    <div
      className={`font-hand text-graphite ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
      {arrow && (
        <svg
          width="46"
          height="22"
          viewBox="0 0 46 22"
          className="ml-1 inline-block -mt-1"
          fill="none"
          stroke="hsl(var(--graphite))"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 11 C 14 4, 26 18, 40 9" />
          <path d="M33 5 L 40 9 L 35 14" />
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Blueprint corner marks — alignment registration ticks               */
/* ------------------------------------------------------------------ */
export function CornerMarks({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {[
        'left-0 top-0',
        'right-0 top-0 rotate-90',
        'left-0 bottom-0 -rotate-90',
        'right-0 bottom-0 rotate-180',
      ].map((pos) => (
        <svg
          key={pos}
          className={`absolute ${pos} text-rule/70`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M2 2 H 10 M 2 2 V 10" />
          <circle cx="2" cy="2" r="1.4" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pencil arrow — standalone directional doodle                        */
/* ------------------------------------------------------------------ */
export function PencilArrow({
  className = '',
  direction = 'down',
}: {
  className?: string;
  direction?: 'down' | 'down-right' | 'right' | 'curved';
}) {
  const paths: Record<string, React.ReactNode> = {
    down: <path d="M12 2 V 40 M 6 33 L 12 41 L 18 33" />,
    'down-right': <path d="M6 4 C 6 20, 24 22, 36 36 M 28 30 L 38 38 L 28 40" />,
    right: <path d="M2 12 H 40 M 33 6 L 41 12 L 33 18" />,
    curved: <path d="M4 4 C 4 24, 28 20, 40 38 M 32 30 L 42 40 L 30 40" />,
  };
  return (
    <svg
      width="48"
      height="44"
      viewBox="0 0 48 44"
      className={`text-graphite/70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[direction]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ruler markings strip                                                */
/* ------------------------------------------------------------------ */
export function Ruler({
  className = '',
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <div
        className={`relative w-3 bg-paper-2/80 ${className}`}
        aria-hidden
        style={{ backgroundImage: 'none' }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute right-0 h-px bg-ink/40"
            style={{
              top: `${(i / 24) * 100}%`,
              width: i % 5 === 0 ? '8px' : '4px',
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={`relative h-3 bg-paper-2/80 ${className}`} aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-px bg-ink/40"
          style={{
            left: `${(i / 40) * 100}%`,
            height: i % 5 === 0 ? '8px' : '4px',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Paper clip                                                          */
/* ------------------------------------------------------------------ */
export function PaperClip({ className = '', rotate = 24 }: { className?: string; rotate?: number }) {
  return (
    <svg
      width="22"
      height="44"
      viewBox="0 0 22 44"
      className={`text-graphite/80 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M14 6 V 32 a 5 5 0 0 1 -10 0 V 12 a 4 4 0 0 1 8 0 V 30 a 2 2 0 0 1 -4 0 V 16" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Highlight marker swatch                                             */
/* ------------------------------------------------------------------ */
export function Highlight({ children, className = '', color = 'highlight' }: { children: React.ReactNode; className?: string; color?: 'highlight' | 'coral' | 'sage' }) {
  const c: Record<string, string> = {
    highlight: 'hsl(48 80% 64% / 0.55)',
    coral: 'hsl(9 70% 66% / 0.4)',
    sage: 'hsl(90 24% 60% / 0.4)',
  };
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: `linear-gradient(180deg, transparent 52%, ${c[color]} 52%, ${c[color]} 92%, transparent 92%)`,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal — wraps children, animates into view                  */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Mask reveal for text lines */
export function MaskReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once, margin: '-40px' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic button wrapper                                             */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = '',
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220 });
  const sy = useSpring(y, { damping: 18, stiffness: 220 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section header — editorial label + oversized index number           */
/* ------------------------------------------------------------------ */
export function SectionIndex({ n, label, className = '' }: { n: string; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="editorial-num text-stone/70 text-2xl">{n}</span>
      <span className="h-px w-10 bg-rule" />
      <span className="editorial-label">{label}</span>
    </div>
  );
}

/* Empty export to satisfy bundlers */
export const __noop = AnimatePresence;
