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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
