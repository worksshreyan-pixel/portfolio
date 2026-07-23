import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'paper-grain':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        paper: 'hsl(var(--paper))',
        'paper-2': 'hsl(var(--paper-2))',
        ink: 'hsl(var(--ink))',
        graphite: 'hsl(var(--graphite))',
        stone: 'hsl(var(--stone))',
        rule: 'hsl(var(--rule))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        coral: 'hsl(var(--coral))',
        sage: 'hsl(var(--sage))',
        periwinkle: 'hsl(var(--periwinkle))',
        gold: 'hsl(var(--gold))',
        lavender: 'hsl(var(--lavender))',
        highlight: 'hsl(var(--highlight))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'scroll-spool': {
          '0%': { transform: 'translateY(0%)' },
          '45%': { transform: 'translateY(calc(-100% + 280px))' },
          '50%': { transform: 'translateY(calc(-100% + 280px))' },
          '95%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--rot, 0deg))' },
        },
        'blink-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scroll-spool': 'scroll-spool 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'blink-cursor': 'blink-cursor 1.1s steps(2) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
