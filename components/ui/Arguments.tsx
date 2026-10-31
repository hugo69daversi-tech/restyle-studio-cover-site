'use client';

import { CountUp, Reveal } from '@/components/motion/Reveal';

/** Les chiffres cles, repris sous le Hero et dans le CTA final. */
const STATS = [
  { to: 75, prefix: '-', suffix: ' %', label: 'en moyenne vs. remplacer cuisine, meubles ou salle de bain' },
  { to: 3, prefix: '1-', suffix: ' j', label: 'de chantier, sans poussière ni démolition' },
  { to: 10, prefix: '', suffix: ' ans', label: 'de garantie sur le covering architectural' },
  { to: 500, prefix: '', suffix: '+', label: 'finitions : bois, marbre, mat, métal…' },
];

export function Arguments({ className = '' }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4 ${className}`}>
      {STATS.map((stat, i) => (
        <li key={stat.label} className="bg-brand-bg p-6 md:p-8">
          <Reveal delay={i * 0.08}>
            <p className="font-display text-3xl font-bold text-gradient md:text-5xl">
              <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-brand-cream/60">{stat.label}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
