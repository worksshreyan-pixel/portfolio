import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Caveat } from 'next/font/google';
import { PaperCanvas, CustomCursor } from '@/components/paper-kit';

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shreyan.studio'),
  title: 'Shreyan — Designer & Developer of Premium Web Experiences',
  description:
    'Shreyan designs and builds premium, detail-obsessed digital experiences for businesses. Designer, developer, and creative problem solver.',
  openGraph: {
    title: 'Shreyan — Designer & Developer of Premium Web Experiences',
    description:
      'Premium, handcrafted websites for businesses. Designer, developer, creative problem solver.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable} ${hand.variable}`}>
      <body className="font-sans antialiased">
        <PaperCanvas />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
