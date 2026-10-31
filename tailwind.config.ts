import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#150c0a',
          bg2: '#1f1310',
          pink: '#ff3d7f',
          orange: '#ff8a3d',
          cream: '#f5ede7',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #ff3d7f 0%, #ff8a3d 100%)',
        'brand-marble':
          'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,61,127,0.08), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(255,138,61,0.07), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255,61,127,0.05), transparent 60%), linear-gradient(160deg, #1f1310 0%, #150c0a 55%, #100a08 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'step-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Balayage avant -> apres du visuel du Hero, comme un film qu'on pose.
        wipe: {
          '0%, 12%': { clipPath: 'inset(0 0 0 0)' },
          '45%, 62%': { clipPath: 'inset(0 0 0 100%)' },
          '95%, 100%': { clipPath: 'inset(0 0 0 0)' },
        },
        'wipe-line': {
          '0%, 12%': { left: '0%' },
          '45%, 62%': { left: '100%' },
          '95%, 100%': { left: '0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8%, -6%) scale(1.1)' },
          '66%': { transform: 'translate(-6%, 5%) scale(0.95)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'step-in': 'step-in 0.35s ease-out',
        wipe: 'wipe 7s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        'wipe-line': 'wipe-line 7s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
