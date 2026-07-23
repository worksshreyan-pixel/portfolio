'use client';

import { Reveal, Annotation, CornerMarks } from '@/components/paper-kit';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-rule px-5 py-14 sm:px-8 lg:px-12">
      <CornerMarks className="opacity-30" />
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            {/* brand wordmark */}
            <div>
              <div className="editorial-label mb-2">Shreyan · Designer & Developer</div>
              <div className="display text-[14vw] leading-[0.8] text-ink sm:text-[9vw] lg:text-[7rem]">
                Shreyan<span className="text-coral">.</span>
              </div>
              <Annotation className="mt-3 text-[0.95rem]" rotate={-2}>
                crafted with care, pixel by pixel
              </Annotation>
            </div>

            {/* meta */}
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <a
                href="#work"
                data-cursor="true"
                className="group flex items-center gap-2 font-display text-[0.9rem] text-graphite"
              >
                Back to top
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ArrowUp size={14} />
                </span>
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                <a href="mailto:works.shreyan@gmail.com" className="link-underline font-sans text-[0.85rem] text-graphite">Email</a>
                <a href="https://wa.me/919422420145" target="_blank" rel="noopener noreferrer" className="link-underline font-sans text-[0.85rem] text-graphite">WhatsApp</a>
                <a href="tel:+919422420145" className="link-underline font-sans text-[0.85rem] text-graphite">Phone</a>
              </div>
              <div className="editorial-label text-rule">© 2026 · All rights reserved</div>
            </div>
          </div>
        </Reveal>

        {/* baseline ruler */}
        <div className="mt-12 flex items-center justify-between border-t border-rule pt-4">
          <span className="editorial-label !text-[0.5rem]">Portfolio · Vol. 01</span>
          <span className="font-mono text-[0.5rem] text-stone">Designed & built by Shreyan</span>
          <span className="editorial-label !text-[0.5rem]">India · IN</span>
        </div>
      </div>
    </footer>
  );
}
