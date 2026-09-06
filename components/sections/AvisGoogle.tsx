import type { SiteSettings } from '@/lib/types';

export function AvisGoogle({ settings }: { settings: SiteSettings | null }) {
  if (!settings?.avis_google_actif) return null;

  return (
    <section className="section-container text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Ce que disent nos <span className="text-gradient">clients</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-brand-cream/70">
        Retrouvez tous nos avis vérifiés sur notre fiche Google Business.
      </p>
      {settings.avis_google_lien && (
        <a href={settings.avis_google_lien} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-8 inline-flex">
          Voir nos avis Google
        </a>
      )}
    </section>
  );
}
