'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { id: 'work', label: 'Work', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'about', label: 'Toolkit', n: '03' },
  { id: 'process', label: 'Process', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('work');
  const [activeLabel, setActiveLabel] = useState('Work');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['work', 'about', 'process', 'contact'];
      const els = sections.map((id) => document.getElementById(id));
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = 'work';
      let curLabel = 'Work';
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el && el.offsetTop <= y) {
          cur = sections[i];
          curLabel = sections[i] === 'about' ? 'About' : sections[i] === 'work' ? 'Work' : sections[i] === 'process' ? 'Process' : 'Contact';
        }
      }
      setActive(cur);
      setActiveLabel(curLabel);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.8, 0.24, 1] }}
        className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-2rem))] -translate-x-1/2"
      >
        <div
          className={`flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'border-rule/70 bg-paper/85 backdrop-blur-md paper-edge'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5"
            data-cursor="true"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 font-display text-sm font-semibold text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
              S
            </span>
            <span className="hidden font-display text-[0.95rem] font-medium tracking-tight text-ink sm:block">
              Shreyan
            </span>
          </button>

          {/* Desktop links — evenly spaced, vertically centered */}
          <nav className="hidden items-center justify-center gap-2 md:flex">
            {links.map((l) => (
              <button
                key={`${l.id}-${l.label}`}
                onClick={() => go(l.id)}
                data-cursor="true"
                className="group relative flex items-center px-3 py-1.5"
              >
                <span
                  className={`font-mono text-[0.7rem] tracking-wide transition-colors ${
                    active === l.id && activeLabel === l.label ? 'text-ink' : 'text-stone'
                  }`}
                >
                  {l.n}
                </span>
                <span
                  className={`ml-1.5 link-underline font-display text-[0.9rem] ${
                    active === l.id && activeLabel === l.label ? 'text-ink' : 'text-graphite'
                  }`}
                >
                  {l.label}
                </span>
                {active === l.id && activeLabel === l.label && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-coral"
                    transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go('contact')}
              data-cursor="true"
              className="hidden rounded-full border border-ink/25 px-4 py-1.5 font-display text-[0.82rem] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:block"
            >
              Let&rsquo;s talk
            </button>
            {/* Mobile toggle */}
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {links.map((l, i) => (
                <motion.button
                  key={`${l.id}-${l.label}`}
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="flex items-baseline gap-4 border-b border-rule/60 py-5 text-left"
                >
                  <span className="editorial-num text-stone/70 text-lg">{l.n}</span>
                  <span className="display text-5xl text-ink">{l.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
