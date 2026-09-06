import type { SiteSettings } from '@/lib/types';

export function CompteurRealisations({ settings }: { settings: SiteSettings | null }) {
  if (!settings?.compteur_actif || !settings.compteur_valeur) return null;

  return (
    <section className="section-container text-center">
      <p className="text-6xl font-extrabold text-gradient md:text-7xl">+{settings.compteur_valeur}</p>
      <p className="mt-3 text-lg font-semibold uppercase tracking-widest text-brand-cream/80">
        Chantiers réalisés
      </p>
    </section>
  );
}
