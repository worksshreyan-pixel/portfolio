'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Reveal, SectionIndex, Stamp, Annotation, Highlight, Magnetic, CornerMarks, PencilArrow } from '@/components/paper-kit';
import { Mail, Phone, MessageCircle, Send, Check, Loader2 } from 'lucide-react';

const EMAIL = 'works.shreyan@gmail.com';
const PHONE = '+91 9422420145';
const WHATSAPP = '919422420145';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            reply_to: form.email,
            message: form.message,
            to_email: EMAIL,
          },
          { publicKey }
        );
      } else {
        // Fallback: open the user's mail client pre-filled
        const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="05" label="Contact" className="mb-12" />
        </Reveal>

        <Reveal>
          <h2 className="display max-w-5xl text-[11vw] leading-[0.86] text-ink sm:text-[8vw] lg:text-[7.5rem]">
            Let&rsquo;s build<br />
            something <Highlight>worth</Highlight><br />
            <span className="text-stone italic font-light">obsessing</span> over.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* left: contact details */}
          <div>
            <Reveal>
              <p className="max-w-md text-pretty font-sans text-[1rem] leading-relaxed text-graphite">
                Have a project in mind, or just want to say hello? I reply to
                every serious inquiry within a day. Tell me what you&rsquo;re
                building.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-5">
              <ContactRow icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactRow icon={Phone} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s/g, '')}`} />
              <ContactRow
                icon={MessageCircle}
                label="WhatsApp"
                value="Chat directly"
                href={`https://wa.me/${WHATSAPP}`}
              />
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex items-center gap-4">
              <Stamp color="sage" rotate={-8}>
                open for work · 2026
              </Stamp>
              <Annotation className="text-[0.9rem]" rotate={3} arrow>
                say hi
              </Annotation>
            </Reveal>

            <Reveal delay={0.25} className="mt-10 hidden lg:block">
              <PencilArrow direction="down-right" className="opacity-40" />
            </Reveal>
          </div>

          {/* right: the form, as a paper sheet */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="paper-sheet relative rounded-xl border border-rule/60 p-7 sm:p-9"
            >
              <div
                aria-hidden
                className="tape absolute -left-3 -top-3 h-5 w-24"
                style={{ transform: 'rotate(-10deg)' }}
              />
              <div className="editorial-label mb-1 flex items-center justify-between">
                <span>Project Inquiry / Form</span>
                <span className="text-rule">F-01</span>
              </div>
              <div className="editorial-num text-ink text-lg mb-7">Tell me about it.</div>

              <Field label="Your name" n="01">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Jane Doe"
                  className="editorial-input"
                />
              </Field>

              <Field label="Email" n="02">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="jane@company.com"
                  className="editorial-input"
                />
              </Field>

              <Field label="What are you building?" n="03">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={4}
                  placeholder="A premium website for my clinic, launching in Q2…"
                  className="editorial-input resize-none"
                />
              </Field>

              <Magnetic strength={0.35} className="mt-7">
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  data-cursor={status === 'success' ? 'Sent!' : 'Send'}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-display text-[1.05rem] font-medium text-paper transition-all duration-300 hover:gap-4 disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </motion.span>
                    ) : status === 'success' ? (
                      <motion.span key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Check size={18} /> Message sent — I&rsquo;ll be in touch
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Send inquiry
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>

              {status === 'error' && (
                <p className="mt-4 text-center font-sans text-[0.85rem] text-coral">
                  Something went wrong. Try again, or email me directly at {EMAIL}.
                </p>
              )}
              {!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && (
                <p className="mt-4 text-center font-hand text-[0.9rem] text-stone">
                  tip: opens your mail app if the form service isn&rsquo;t set up yet
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.editorial-input) {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid hsl(var(--rule));
          padding: 0.6rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: hsl(var(--ink));
          outline: none;
          transition: border-color 0.3s ease;
        }
        :global(.editorial-input::placeholder) {
          color: hsl(var(--stone));
          font-weight: 300;
          font-style: italic;
        }
        :global(.editorial-input:focus) {
          border-color: hsl(var(--ink));
        }
      `}</style>
    </section>
  );
}

function Field({ label, n, children }: { label: string; n: string; children: React.ReactNode }) {
  return (
    <label className="mb-6 block">
      <div className="mb-1.5 flex items-baseline gap-2">
        <span className="editorial-num text-[0.65rem] text-stone">{n}</span>
        <span className="editorial-label">{label}</span>
      </div>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      data-cursor="true"
      className="group flex items-center gap-4 border-b border-rule/60 pb-4 transition-colors"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-graphite transition-colors group-hover:bg-ink group-hover:text-paper">
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <div>
        <div className="editorial-label !text-[0.5rem]">{label}</div>
        <div className="font-display text-[1rem] text-ink">{value}</div>
      </div>
    </a>
  );
}
