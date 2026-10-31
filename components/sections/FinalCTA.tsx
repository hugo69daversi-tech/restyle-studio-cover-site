import { Icon } from '@/components/ui/Icon';
import { Arguments } from '@/components/ui/Arguments';
import { DEVIS_HREF } from '@/lib/devis';
import type { SiteSettings } from '@/lib/types';

export function FinalCTA({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.telephone || '+33 7 85 96 53 47';

  return (
    <section id="contact" className="section-container text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Prêt à <span className="text-gradient">transformer votre intérieur</span> ?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-brand-cream/70">
        Répondez à 5 questions rapides, on vous rappelle pour une étude gratuite de votre projet.
      </p>

      <Arguments className="mx-auto mt-10 max-w-3xl" />

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a href={DEVIS_HREF} className="btn-primary">
          Demander votre étude gratuite
        </a>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn-secondary gap-2">
          <Icon name="phone" className="h-5 w-5" />
          Appelez-nous
        </a>
      </div>
      <p className="mx-auto mt-4 max-w-xl text-sm text-brand-cream/50">
        Gratuit et sans engagement · Nous vous rappelons généralement sous 48h.
      </p>
    </section>
  );
}
