import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import type { SiteSettings } from '@/lib/types';

export function ZoneIntervention({ settings }: { settings: SiteSettings | null }) {
  const villes = (settings?.villes || 'Metz, Thionville, Moselle, Luxembourg')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  return (
    <section className="section-container">
      <SectionHeading
        eyebrow="Zone d'intervention"
        titre="On se déplace chez vous."
        accent={[3, 4]}
        chapeau={`${settings?.zone_intervention || 'Moselle & Luxembourg'} et leurs environs.`}
      />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {villes.map((ville, i) => (
          <Reveal key={ville} delay={i * 0.06}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              {ville}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
