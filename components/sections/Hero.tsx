import { GarantieBadge } from '@/components/ui/GarantieBadge';
import type { HeroContent } from '@/lib/types';

export function Hero({ hero }: { hero: HeroContent | null }) {
  const titre = hero?.titre || 'ReStyle Studio';
  const devise = hero?.devise || 'PRECISION. INNOVATION. TRANSFORMATION.';
  const texte =
    hero?.texte ||
    "ReStyle Studio transforme vos cuisines, meubles, salles de bain et intérieurs grâce au covering architectural haut de gamme — sans les travaux ni le budget d'une rénovation classique.";
  const motsDevise = devise.replace(/\.$/, '').split('. ').filter(Boolean);

  return (
    <section id="accueil" className="section-container flex flex-col items-center pt-16 text-center md:pt-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cream/50">
        Covering &amp; rénovation intérieure — Moselle &amp; Luxembourg
      </p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{titre}</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">{texte}</p>

      <div className="mt-10 space-y-1">
        {motsDevise.map((mot) => (
          <p
            key={mot}
            className="text-gradient text-xl font-extrabold uppercase tracking-widest md:text-2xl"
          >
            {mot}.
          </p>
        ))}
      </div>

      <div className="mt-10">
        <a href="#prestations" className="btn-secondary">
          Découvrir nos prestations
        </a>
      </div>

      <div className="mt-8">
        <GarantieBadge compact />
      </div>
    </section>
  );
}
