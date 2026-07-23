'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tape, CornerMarks, Annotation, Stamp, PaperClip, Highlight } from '@/components/paper-kit';

/* Each project supplies a "site" renderer so every browser mock looks unique */
export type SiteRenderer = () => JSX.Element;

export function BrowserMock({
  url,
  renderSite,
  className = '',
  rotate = 0,
  tapeColor = 'gold',
  index = '01',
  metrics,
}: {
  url: string;
  renderSite: () => JSX.Element;
  className?: string;
  rotate?: number;
  tapeColor?: 'gold' | 'coral' | 'sage' | 'lavender';
  index?: string;
  metrics?: { label: string; value: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className={`relative ${className}`}
    >
      <Tape className="absolute -top-2.5 left-8 z-30 h-5 w-24" rotate={-5} color={tapeColor} />
      <PaperClip className="absolute -right-1 -top-3 z-30" rotate={-20} />

      {/* browser chrome */}
      <div className="paper-edge overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-2xl">
        <div className="flex items-center gap-2 border-b border-rule/60 bg-[hsl(38_30%_96%)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/80" />
          <div className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-paper-2 px-3">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--stone))" strokeWidth="2">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="font-mono text-[0.65rem] text-graphite">{url}</span>
          </div>
          <span className="editorial-label hidden !text-[0.5rem] sm:block">{index}</span>
        </div>

        {/* viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
          <CornerMarks className="opacity-30" />
          {renderSite()}
        </div>

        {/* metrics bar */}
        {metrics && metrics.length > 0 && (
          <div className="flex items-center justify-between border-t border-rule/60 bg-[hsl(38_30%_96%)] px-4 py-2">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-sm font-semibold text-ink">{m.value}</span>
                <span className="editorial-label !text-[0.5rem]">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Auto-scroll wrapper for tall site screenshots                      */
/* ---------------------------------------------------------------- */
export function AutoScroll({
  children,
  className = '',
  duration = 16,
  distance = '70%',
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0 top-0"
        animate={{ y: ['0%', `-${distance}`] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
      >
        {children}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Individual project site renderers — each visually distinct         */
/* ---------------------------------------------------------------- */
export function EliteCosmoSite() {
  return (
    <AutoScroll distance="72%" duration={18}>
      <div className="bg-[hsl(280_20%_12%)] px-5 py-5 text-[hsl(280_15%_92%)]">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-medium tracking-[0.2em]">ELITE COSMO</span>
          <div className="flex gap-3 text-[0.55rem] uppercase tracking-widest opacity-70">
            <span>Treatments</span><span>About</span><span>Book</span>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="text-[1.6rem] font-light leading-[0.95] tracking-tight">Reveal your<br/><span className="text-[hsl(280_40%_75%)]">natural glow</span></div>
            <div className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] opacity-60">Aesthetic Clinic · Mumbai</div>
          </div>
          <div className="h-14 w-14 rounded-full border border-[hsl(280_40%_75%)]/60" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(280_30%_30%)] to-[hsl(280_20%_18%)]" />
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(20_30%_35%)] to-[hsl(20_20%_20%)]" />
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(340_30%_30%)] to-[hsl(340_20%_18%)]" />
        </div>
        <div className="mt-4 rounded-lg border border-white/10 p-3">
          <div className="text-[0.5rem] uppercase tracking-widest text-[hsl(280_40%_75%)]">Signature</div>
          <div className="mt-1 text-sm font-light">Hydra Glow Facial</div>
          <div className="mt-1 h-1 w-2/3 rounded-full bg-white/15" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-white/5 p-2 text-[0.5rem] uppercase tracking-widest opacity-80">Laser · Skin</div>
          <div className="rounded-md bg-[hsl(280_40%_75%)]/20 p-2 text-[0.5rem] uppercase tracking-widest text-[hsl(280_40%_80%)]">Book Now</div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[hsl(280_40%_75%)]/30" />
          <div className="flex-1">
            <div className="h-1.5 w-1/2 rounded bg-white/20" />
            <div className="mt-1 h-1 w-2/3 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-5 text-center text-[0.5rem] uppercase tracking-[0.3em] text-[hsl(280_40%_75%)] opacity-70">Confidence · Care · Craft</div>
      </div>
    </AutoScroll>
  );
}

export function DealItSite() {
  return (
    <AutoScroll distance="82%" duration={20}>
      <div className="bg-[hsl(150_30%_96%)] px-5 py-5 text-[hsl(150_40%_14%)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-md bg-[hsl(150_60%_34%)]" />
            <span className="font-display text-sm font-semibold">Deal-it</span>
          </div>
          <div className="flex gap-2 text-[0.5rem] uppercase tracking-widest opacity-70">
            <span>Marketplace</span><span>Sell</span><span>Vault</span>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-[hsl(150_60%_34%)] p-4 text-white">
          <div className="text-[0.5rem] uppercase tracking-widest opacity-80">Secure digital delivery</div>
          <div className="mt-1 text-lg font-bold leading-tight">Buy & sell digital products, <span className="text-[hsl(48_80%_62%)]">safely</span></div>
          <div className="mt-3 flex gap-1.5">
            <div className="rounded-md bg-white/15 px-2 py-1 text-[0.5rem]">E-books</div>
            <div className="rounded-md bg-white/15 px-2 py-1 text-[0.5rem]">Templates</div>
            <div className="rounded-md bg-white/15 px-2 py-1 text-[0.5rem]">Licenses</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-lg border border-[hsl(150_30%_80%)] bg-white p-2.5">
              <div className="aspect-square rounded-md bg-gradient-to-br from-[hsl(150_30%_85%)] to-[hsl(150_30%_72%)]" />
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[0.6rem] font-semibold">₹{[499,299,799,199][i]}</span>
                <span className="flex items-center gap-0.5 text-[0.5rem] text-[hsl(150_60%_34%)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(150_60%_34%)]" />Secure
                </span>
              </div>
              <div className="mt-1 h-1.5 w-2/3 rounded bg-[hsl(150_30%_80%)]" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-[hsl(150_60%_34%)]/20 bg-[hsl(150_60%_34%)]/8 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[0.55rem] font-semibold uppercase tracking-wider">Escrow vault</div>
              <div className="text-[0.5rem] opacity-70">Funds held until delivery confirmed</div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(150_60%_34%)] text-[0.6rem] font-bold text-white">✓</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-white p-2.5 shadow-sm">
            <div className="text-[0.5rem] uppercase tracking-widest opacity-60">Seller</div>
            <div className="mt-0.5 text-[0.7rem] font-semibold">List product</div>
            <div className="mt-1.5 h-1.5 w-full rounded bg-[hsl(150_30%_85%)]" />
          </div>
          <div className="rounded-md bg-[hsl(150_60%_34%)] p-2.5 text-white">
            <div className="text-[0.5rem] uppercase tracking-widest opacity-80">Buyer</div>
            <div className="mt-0.5 text-[0.7rem] font-semibold">Checkout</div>
            <div className="mt-1.5 h-1.5 w-full rounded bg-white/25" />
          </div>
        </div>
        <div className="mt-4 text-center text-[0.5rem] uppercase tracking-[0.3em] text-[hsl(150_60%_34%)] opacity-60">Trust · Delivery · Marketplace</div>
      </div>
    </AutoScroll>
  );
}

/* Dr. Gaddam Clinic — distinct clinic identity, warmer palette */
export function GaddamClinicSite() {
  return (
    <AutoScroll distance="70%" duration={18}>
      <div className="bg-[hsl(20_35%_97%)] px-5 py-5 text-[hsl(20_40%_16%)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(20_60%_45%)] text-[0.55rem] font-bold text-white">+</div>
            <span className="font-display text-sm font-semibold">Dr. Gaddam Clinic</span>
          </div>
          <div className="flex gap-2 text-[0.5rem] uppercase tracking-widest opacity-70">
            <span>Services</span><span>About</span><span>Book</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-[1.55rem] font-light leading-[0.95] tracking-tight">Compassionate care,<br/><span className="text-[hsl(20_60%_45%)]">close to home</span></div>
          <div className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] opacity-60">General & Family Clinic</div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(20_40%_88%)] to-[hsl(20_40%_80%)]" />
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(150_25%_80%)] to-[hsl(150_25%_72%)]" />
          <div className="aspect-[3/4] rounded-md bg-gradient-to-b from-[hsl(20_60%_70%)] to-[hsl(20_60%_60%)]" />
        </div>
        <div className="mt-4 rounded-lg border border-[hsl(20_40%_80%)] bg-white p-3">
          <div className="text-[0.5rem] uppercase tracking-widest text-[hsl(20_60%_45%)]">Book Appointment</div>
          <div className="mt-1.5 flex gap-1.5">
            <div className="h-6 flex-1 rounded-md bg-[hsl(20_35%_92%)]" />
            <div className="h-6 flex-1 rounded-md bg-[hsl(20_35%_92%)]" />
          </div>
          <div className="mt-1.5 h-5 w-full rounded-md bg-[hsl(20_60%_45%)] text-white text-[0.5rem] flex items-center justify-center font-semibold uppercase tracking-wider">Confirm</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-[hsl(20_35%_92%)] p-2.5">
            <div className="text-[0.5rem] uppercase tracking-widest opacity-70">Consultation</div>
            <div className="mt-1 text-[0.6rem] font-semibold">Mon–Sat</div>
          </div>
          <div className="rounded-md bg-[hsl(150_25%_90%)] p-2.5">
            <div className="text-[0.5rem] uppercase tracking-widest opacity-70">Online</div>
            <div className="mt-1 text-[0.6rem] font-semibold">Video visit</div>
          </div>
        </div>
        <div className="mt-4 text-center text-[0.5rem] uppercase tracking-[0.3em] text-[hsl(20_60%_45%)] opacity-70">Care · Trust · Accessibility</div>
      </div>
    </AutoScroll>
  );
}

export function VibeBoltSite() {
  return (
    <AutoScroll distance="70%" duration={17}>
      <div className="bg-[hsl(248_55%_11%)] px-5 py-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[hsl(280_80%_60%)] to-[hsl(248_80%_55%)] text-[0.6rem] font-bold">V</div>
            <span className="font-display text-sm font-semibold">VibeBolt</span>
          </div>
          <div className="flex gap-2 text-[0.5rem] uppercase tracking-widest opacity-60">
            <span>Templates</span><span>Pricing</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-[1.7rem] font-bold leading-[0.95] tracking-tight">
            Ship apps at the<br/><span className="bg-gradient-to-r from-[hsl(280_80%_65%)] to-[hsl(248_90%_60%)] bg-clip-text text-transparent">speed of thought</span>
          </div>
          <div className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] opacity-50">AI-native dev platform</div>
          <div className="mt-3 inline-flex rounded-full bg-gradient-to-r from-[hsl(280_80%_60%)] to-[hsl(248_80%_55%)] px-4 py-1.5 text-[0.6rem] font-semibold">Start building</div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            'from-[hsl(280_70%_50%)] to-[hsl(248_70%_45%)]',
            'from-[hsl(330_70%_50%)] to-[hsl(280_70%_45%)]',
            'from-[hsl(200_70%_50%)] to-[hsl(248_70%_45%)]',
          ].map((g,i)=>(
            <div key={i} className={`rounded-lg bg-gradient-to-br ${g} p-2.5`}>
              <div className="h-4 rounded bg-white/20" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/30" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-1.5 text-[0.55rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(150_60%_50%)]" />
            <span className="opacity-80">Live deploy · 0.4s</span>
          </div>
          <div className="mt-2 space-y-1 font-mono text-[0.5rem] opacity-70">
            <div>$ vibe init project</div>
            <div className="text-[hsl(150_60%_60%)]">✓ ready in 412ms</div>
          </div>
        </div>
        <div className="mt-4 text-center text-[0.5rem] uppercase tracking-[0.3em] opacity-40">Build · Deploy · Scale</div>
      </div>
    </AutoScroll>
  );
}

/* A small reusable annotation chip used in the work spreads */
export function AnnotationChip({
  children,
  className = '',
  rotate = -3,
  color = 'gold',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'gold' | 'coral' | 'sage';
}) {
  const c: Record<string, string> = {
    gold: 'hsl(48 60% 86%)',
    coral: 'hsl(9 58% 82%)',
    sage: 'hsl(90 22% 84%)',
  };
  return (
    <div
      className={`paper-edge relative max-w-[14rem] px-3 py-2 font-hand text-[0.85rem] leading-tight text-graphite ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, background: c[color] }}
    >
      {children}
    </div>
  );
}
