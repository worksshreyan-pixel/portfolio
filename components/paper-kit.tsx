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

    let frameId: number;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        const t = e.target as HTMLElement;
        const interactive = t.closest('a, button, [data-cursor], input, textarea, [role="button"]');
        setHovering(!!interactive);
        const c = interactive?.getAttribute('data-cursor');
        setLabel(c && c !== 'true' ? c : null);
      });
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', dn, { passive: true });
    window.addEventListener('mouseup', up, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
      cancelAnimationFrame(frameId);
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
  color?: 'gold' | 'coral' | 'sage' | 'lavender';
  pin?: boolean;
}) {
  const colors: Record<string, string> = {
    gold: 'bg-[#FCF6BD]',
    coral: 'bg-[#FFD166]',
    sage: 'bg-[#EAF2D7]',
    lavender: 'bg-[#ECE4F9]',
  };
  return (
    <div
      className={`relative p-5 shadow-[0_15px_35px_rgb(0,0,0,0.06)] ${colors[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {pin && (
        <div className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-[#E63946] shadow-sm border border-white/40" />
      )}
      <div className="font-mono text-[0.8rem] leading-relaxed text-graphite/90 select-none">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stamp tool                                                          */
/* ------------------------------------------------------------------ */
export function Stamp({
  children,
  className = '',
  rotate = -12,
  color = 'sage',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'sage' | 'coral' | 'gold';
}) {
  const colors: Record<string, string> = {
    sage: 'border-sage text-sage',
    coral: 'border-coral text-coral',
    gold: 'border-gold text-gold',
  };
  return (
    <div
      className={`inline-block border-2 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.25em] rounded select-none ${colors[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Annotation chip                                                     */
/* ------------------------------------------------------------------ */
export function AnnotationChip({
  children,
  className = '',
  rotate = 0,
  color = 'sage',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'sage' | 'coral' | 'gold';
}) {
  const colors: Record<string, string> = {
    sage: 'bg-[#EAF2D7]/90 text-stone-700 border-sage/60',
    coral: 'bg-[#FFD166]/90 text-stone-700 border-coral/60',
    gold: 'bg-[#FCF6BD]/90 text-stone-700 border-gold/60',
  };
  return (
    <div
      className={`border px-2.5 py-1.5 font-mono text-[0.65rem] tracking-wider rounded shadow-sm select-none ${colors[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Annotation tag with hand-drawn arrow icon                          */
/* ------------------------------------------------------------------ */
export function Annotation({
  children,
  className = '',
  rotate = 0,
  arrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  arrow?: boolean;
}) {
  return (
    <div
      className={`font-display text-xs italic text-stone select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
      {arrow && (
        <span className="block mt-1 font-mono text-[0.8rem] text-coral opacity-80">
          ↴
        </span>
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
/* Pencil arrows                                                       */
/* ------------------------------------------------------------------ */
export function PencilArrow({
  className = '',
  direction = 'right',
}: {
  className?: string;
  direction?: 'right' | 'down' | 'curved' | 'down-right';
}) {
  const paths: Record<string, string> = {
    right: 'M2 8h20M16 3l5 5-5 5',
    down: 'M8 2v20M3 16l5 5 5-5',
    'down-right': 'M2 2l18 18M13 20h7v-7',
    curved: 'M2 2c8 1 12 8 8 16M6 14l4 4 4-4',
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`text-stone/40 select-none ${className}`}
      aria-hidden
    >
      <path d={paths[direction]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* SketchArrow hand-drawn styling                                      */
/* ------------------------------------------------------------------ */
export function SketchArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      width="54"
      height="34"
      viewBox="0 0 54 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`select-none ${className}`}
      aria-hidden
    >
      <path
        d="M2 18c12-3 28-2 42 6M38 12l8 12-12 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      style={{ willChange: 'transform, opacity' }}
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
        style={{ willChange: 'transform' }}
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
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220 });
  const sy = useSpring(y, { damping: 18, stiffness: 220 });

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    let r = rectRef.current;
    if (!r) {
      if (ref.current) {
        r = ref.current.getBoundingClientRect();
        rectRef.current = r;
      } else {
        return;
      }
    }
    const px = (e.clientX - r.left - r.width / 2) * strength;
    const py = (e.clientY - r.top - r.height / 2) * strength;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
