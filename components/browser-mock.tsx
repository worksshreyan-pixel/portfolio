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

  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

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
            <span className="font-mono text-[0.65rem] text-graphite">{displayUrl}</span>
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
    <AutoScroll distance="45%" duration={16}>
      <div className="bg-[#FAF6F0] text-[#3C2A21] font-serif pb-8 min-h-[500px] relative">
        {/* Soft luxury glow background */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-bl from-[#FFE8D6]/40 via-[#FDF5E6]/30 to-transparent blur-2xl pointer-events-none animate-pulse" />

        {/* Navbar */}
        <div className="bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#3C2A21]/5 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-1.5">
            <span className="text-[0.45rem] font-serif tracking-[0.15em] font-bold text-[#D4A373]">✦ ELITE COSMO</span>
          </div>
          <div className="flex gap-2.5 text-[0.35rem] font-sans font-medium text-[#3C2A21]/60 uppercase tracking-widest">
            <span>Treatments</span>
            <span>Doctors</span>
            <span>Gallery</span>
            <span>Reviews</span>
            <span>Book</span>
          </div>
          <button className="border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white px-3 py-1 rounded-full text-[0.35rem] font-sans font-semibold tracking-wider uppercase transition-all duration-300">
            Book Appointment
          </button>
        </div>

        {/* Hero Section */}
        <div className="px-6 pt-8 text-center max-w-md mx-auto">
          <span className="inline-block bg-[#D4A373]/10 text-[#C68B59] px-2.5 py-0.5 rounded-full text-[0.32rem] font-sans font-bold uppercase tracking-wider">
            Luxury Aesthetic Clinic
          </span>
          <h1 className="text-xl font-medium tracking-tight text-[#3C2A21] mt-2.5 leading-[1.1]">
            Reveal Your <span className="italic text-[#D4A373]">Natural Glow</span>
          </h1>
          <p className="text-[0.45rem] text-[#3C2A21]/60 font-sans mt-2 max-w-xs mx-auto leading-relaxed">
            Where dermatology meets art. Premium cosmetic, laser, and hair transplant therapies customized for your skin.
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button className="bg-[#D4A373] hover:bg-[#C68B59] text-white font-sans px-4 py-1.5 rounded-full text-[0.38rem] font-bold shadow-md tracking-wider uppercase transition-colors">
              Treatments
            </button>
            <button className="border border-[#3C2A21]/20 hover:bg-[#3C2A21]/5 text-[#3C2A21] font-sans px-4 py-1.5 rounded-full text-[0.38rem] font-bold tracking-wider uppercase transition-colors">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Floating Treatment Cards Gallery */}
        <div className="mt-8 grid grid-cols-3 gap-3 px-4">
          <div className="bg-white border border-[#E9D8A6]/20 rounded-xl p-3 shadow-[0_10px_25px_rgba(212,163,115,0.05)] hover:-translate-y-1 transition duration-300">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[#FFE8D6] to-[#FAF6F0] mb-2 border border-[#E6CCB2]/20 flex items-center justify-center text-[0.7rem]">🌸</div>
            <h4 className="text-[0.42rem] font-bold">Skin Rejuvenation</h4>
            <div className="w-8 h-[1px] bg-[#D4A373] mt-1" />
            <p className="text-[0.32rem] text-slate-400 font-sans mt-1">Custom HydraFacials</p>
          </div>
          <div className="bg-white border border-[#E9D8A6]/20 rounded-xl p-3 shadow-[0_10px_25px_rgba(212,163,115,0.05)] hover:-translate-y-1 transition duration-300">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[#E6CCB2] to-[#FAF6F0] mb-2 border border-[#E6CCB2]/20 flex items-center justify-center text-[0.7rem]">✨</div>
            <h4 className="text-[0.42rem] font-bold">Laser Therapy</h4>
            <div className="w-8 h-[1px] bg-[#D4A373] mt-1" />
            <p className="text-[0.32rem] text-slate-400 font-sans mt-1">USFDA Approved Lasers</p>
          </div>
          <div className="bg-white border border-[#E9D8A6]/20 rounded-xl p-3 shadow-[0_10px_25px_rgba(212,163,115,0.05)] hover:-translate-y-1 transition duration-300">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[#D4A373]/30 to-[#FAF6F0] mb-2 border border-[#E6CCB2]/20 flex items-center justify-center text-[0.7rem]">🌱</div>
            <h4 className="text-[0.42rem] font-bold">Hair Transplant</h4>
            <div className="w-8 h-[1px] bg-[#D4A373] mt-1" />
            <p className="text-[0.32rem] text-slate-400 font-sans mt-1">Follicular Unit Extraction</p>
          </div>
        </div>

        {/* Doctor trust row */}
        <div className="mt-8 mx-4 p-4 rounded-2xl bg-white border border-[#E6CCB2]/30 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#FFE8D6] to-[#D4A373]/40 border border-[#D4A373]/20 flex items-center justify-center text-[0.6rem]">👩‍⚕️</div>
          <div className="flex-1">
            <h4 className="text-[0.45rem] font-bold">Expert Care led by Dr. Ukarande</h4>
            <p className="text-[0.32rem] text-slate-400 font-sans">MD in Dermatology & Hair Restoration Specialist</p>
            <div className="flex items-center gap-1 mt-1 font-sans text-[0.3rem] text-[#D4A373]">
              <span>★★★★★</span>
              <span className="text-slate-400">(4.9/5 based on 1000+ patients)</span>
            </div>
          </div>
        </div>
      </div>
    </AutoScroll>
  );
}

export function DealItSite() {
  return (
    <AutoScroll distance="45%" duration={16}>
      <div className="bg-[#ECF7F2] text-[#0A2F1D] font-sans pb-8 min-h-[500px] relative">
        {/* Mint grid decor */}
        <div className="absolute inset-0 blueprint-lines opacity-[0.06] pointer-events-none" />

        {/* Navbar */}
        <div className="bg-[#ECF7F2]/95 backdrop-blur-md border-b border-[#0A2F1D]/5 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-1.5">
            <div className="h-4.5 w-4.5 rounded-lg bg-[#0F9F58] flex items-center justify-center text-white text-[0.42rem] font-bold shadow-sm">
              ✓
            </div>
            <span className="font-bold text-[0.55rem] tracking-tight">Dealit</span>
          </div>
          <div className="flex gap-3 text-[0.38rem] font-semibold text-[#0A2F1D]/60">
            <span>Marketplace</span>
            <span>Dashboard</span>
            <span>Escrow Vault</span>
          </div>
          <button className="bg-[#0F9F58] hover:bg-[#0D874A] text-white px-3 py-1 rounded-full text-[0.35rem] font-bold shadow-sm transition-all">
            Login
          </button>
        </div>

        {/* Hero Section */}
        <div className="px-6 pt-8 text-center max-w-md mx-auto">
          <span className="inline-block bg-[#0F9F58]/10 text-[#0F9F58] px-2.5 py-0.5 rounded-full text-[0.32rem] font-bold">
            Escrow-backed Deliveries
          </span>
          <h1 className="text-xl font-bold tracking-tight text-[#0A2F1D] mt-2 leading-tight">
            Secure Digital Delivery, <span className="text-[#0F9F58]">Guaranteed</span>
          </h1>
          <p className="text-[0.45rem] text-[#0A2F1D]/60 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Protect your transactions. Funds are held securely in our escrow vault until digital files are delivered and verified.
          </p>
        </div>

        {/* Escrow Dashboard Widget */}
        <div className="mt-6 mx-4 bg-white border border-[#A5D6A7]/30 rounded-xl p-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <span className="text-[0.32rem] text-slate-400 font-bold uppercase tracking-wider block">Active Deals</span>
              <span className="text-[0.55rem] font-bold text-[#0A2F1D]">₹24,850.00</span>
            </div>
            <span className="bg-[#E8F5E9] text-[#0F9F58] text-[0.32rem] px-2 py-0.5 rounded-full font-bold">
              ● Secure Vault Active
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-[0.38rem] bg-[#F4FAF7] p-2 rounded-lg">
              <span className="font-medium">Design Template Pack.zip</span>
              <span className="text-[#0F9F58] font-bold">₹4,500</span>
            </div>
            <div className="flex items-center justify-between text-[0.38rem] bg-[#F4FAF7] p-2 rounded-lg">
              <span className="font-medium">Laravel API License Code</span>
              <span className="text-[#0F9F58] font-bold">₹12,800</span>
            </div>
          </div>

          <div className="mt-3 border border-dashed border-[#A5D6A7]/50 rounded-lg p-3 text-center bg-[#F4FAF7] flex flex-col items-center justify-center">
            <span className="text-[0.38rem] text-slate-500 font-medium">Escrow Vault: Drag & Drop Files to Lock</span>
            <button className="mt-1 bg-white border border-[#A5D6A7] text-[#0F9F58] px-2 py-0.5 rounded text-[0.32rem] font-bold shadow-sm">
              Upload Files
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          <div className="rounded-xl border border-[#A5D6A7]/25 bg-white p-2.5 flex items-center gap-2">
            <span className="text-[0.6rem]">🛡️</span>
            <div>
              <h5 className="text-[0.38rem] font-bold">Buyer Protection</h5>
              <p className="text-[0.3rem] text-slate-400">Escrow validation</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#A5D6A7]/25 bg-white p-2.5 flex items-center gap-2">
            <span className="text-[0.6rem]">⚡</span>
            <div>
              <h5 className="text-[0.38rem] font-bold">Instant Payout</h5>
              <p className="text-[0.3rem] text-slate-400">Via Stripe Connect</p>
            </div>
          </div>
        </div>
      </div>
    </AutoScroll>
  );
}

export function GaddamClinicSite() {
  return (
    <AutoScroll distance="45%" duration={16}>
      <div className="bg-[#F0F5FA] text-[#0F2537] font-sans pb-8 min-h-[500px] relative">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 blueprint-lines opacity-[0.06] pointer-events-none" />

        {/* Navbar */}
        <div className="bg-[#F0F5FA]/95 backdrop-blur-md border-b border-[#0F2537]/5 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-1.5">
            <div className="h-4.5 w-4.5 rounded-full bg-[#1E6091] flex items-center justify-center text-white text-[0.45rem] font-bold shadow-sm">
              🩺
            </div>
            <span className="font-bold text-[0.5rem] tracking-tight text-[#1E6091]">Dr. Gaddam Clinic</span>
          </div>
          <div className="flex gap-2.5 text-[0.35rem] font-semibold text-[#0F2537]/60">
            <span>Home</span>
            <span>Services</span>
            <span>Doctors</span>
            <span>Contact</span>
          </div>
          <button className="bg-[#1E6091] hover:bg-[#1A527E] text-white px-3 py-1 rounded-full text-[0.35rem] font-bold shadow-sm transition-all">
            Book Appointment
          </button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-3 px-5 pt-8 items-start">
          {/* Left Text */}
          <div className="col-span-7 flex flex-col gap-2">
            <span className="inline-block bg-[#1E6091]/15 text-[#1E6091] px-2 py-0.5 rounded-full text-[0.32rem] font-bold w-fit">
              ✦ Trustworthy Skin & Hair Care
            </span>
            <h1 className="text-[1.05rem] font-bold leading-tight mt-1 text-[#0F2537]">
              Expert Dermatology,<br />
              <span className="text-[#1E6091]">Advanced Laser.</span>
            </h1>
            <p className="text-[0.45rem] leading-relaxed text-slate-500 mt-1">
              Personalized skin, hair and laser treatments delivered using advanced FDA-approved equipment.
            </p>
            <div className="flex gap-2 mt-2">
              <button className="bg-[#1E6091] text-white px-3 py-1 rounded text-[0.35rem] font-bold shadow-sm">
                Book Consultation
              </button>
            </div>
          </div>

          {/* Right Mockup Profile */}
          <div className="col-span-5 relative">
            <div className="aspect-[4/3] w-full rounded-xl bg-white border border-blue-100 shadow-md relative overflow-hidden flex flex-col justify-between p-2">
              <div className="flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-[#F0F5FA] border border-[#1E6091]/10 flex items-center justify-center text-[0.45rem]">👨‍⚕️</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[0.38rem] font-bold">Dr. Gaddam</span>
                  <span className="text-[0.25rem] text-slate-400 font-semibold">Chief Dermatologist</span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-slate-100 my-1" />
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[0.3rem]">
                  <span className="text-slate-400">Patients:</span>
                  <span className="font-bold text-[#1E6091]">10,000+</span>
                </div>
                <div className="flex justify-between items-center text-[0.3rem]">
                  <span className="text-slate-400">Expertise:</span>
                  <span className="font-bold text-[#1E6091]">16+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pulse / Heartbeat SVG drawing */}
        <div className="mt-6 mx-5 p-3 rounded-xl border border-blue-100/50 bg-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[0.55rem]">📈</span>
            <div className="leading-none">
              <span className="text-[0.35rem] font-bold block">Patient Health Metrics</span>
              <span className="text-[0.28rem] text-slate-400">Real-time vitals monitoring</span>
            </div>
          </div>
          <svg viewBox="0 0 100 20" className="w-16 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0,10 h15 l5,-8 l5,16 l5,-12 l5,8 l5,-4 l5,4 h40" />
          </svg>
        </div>

        {/* Treatment Quick Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 px-5">
          <div className="bg-white border border-blue-50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="text-[0.5rem]">🧴</span>
            <div className="leading-none">
              <span className="text-[0.35rem] font-bold block">Skin Care</span>
              <span className="text-[0.28rem] text-slate-400">Medical facials</span>
            </div>
          </div>
          <div className="bg-white border border-blue-50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="text-[0.5rem]">🧬</span>
            <div className="leading-none">
              <span className="text-[0.35rem] font-bold block">Laser Therapy</span>
              <span className="text-[0.28rem] text-slate-400">Hair & scar removal</span>
            </div>
          </div>
        </div>
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
