import type { SiteSettings } from '@/lib/types';

export function ZoneIntervention({ settings }: { settings: SiteSettings | null }) {
  const villes = (settings?.villes || 'Metz, Thionville, Moselle, Luxembourg')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  return (
    <section className="section-container text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Zone <span className="text-gradient">d&apos;intervention</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-brand-cream/70">
        {settings?.zone_intervention || 'Moselle & Luxembourg'} et leurs environs.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {villes.map((ville) => (
          <span key={ville} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium">
            {ville}
          </span>
        ))}
      </div>
    </section>
  );
}
