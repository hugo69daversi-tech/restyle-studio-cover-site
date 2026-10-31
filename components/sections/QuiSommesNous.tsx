import type { HeroContent } from '@/lib/types';

/** Histoire de la famille : contenu edite depuis l'admin "Qui sommes-nous" (table hero_content). */
export function QuiSommesNous({ hero }: { hero: HeroContent | null }) {
  const titre = hero?.titre || 'ReStyle Studio';
  const devise = hero?.devise || 'PRECISION. INNOVATION. TRANSFORMATION.';
  const texte = hero?.texte;
  const motsDevise = devise.replace(/\.$/, '').split('. ').filter(Boolean);

  if (!texte) return null;

  return (
    <section id="qui-sommes-nous" className="section-container text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cream/50">Qui sommes-nous</p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{titre}</h2>
      <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-left text-brand-cream/80 md:text-center">{texte}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-1">
        {motsDevise.map((mot) => (
          <p key={mot} className="text-gradient text-xl font-extrabold uppercase tracking-widest md:text-2xl">
            {mot}.
          </p>
        ))}
      </div>
    </section>
  );
}
