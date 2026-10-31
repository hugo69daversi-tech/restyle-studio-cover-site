import { GarantieBadge } from '@/components/ui/GarantieBadge';
import { Arguments } from '@/components/ui/Arguments';
import { DEVIS_HREF } from '@/lib/devis';

export function Hero() {
  return (
    <section id="accueil" className="section-container flex flex-col items-center pt-12 text-center md:pt-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cream/50">
        Covering architectural — Moselle &amp; Luxembourg
      </p>
      <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
        Votre intérieur <span className="text-gradient">comme neuf</span>, sans tout remplacer.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
        Cuisines, meubles, salles de bain, vitrages : on transforme ce que vous avez déjà avec un covering
        architectural haut de gamme. Sans travaux lourds, sans poussière, sans démolition.
      </p>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={DEVIS_HREF} className="btn-primary w-full sm:w-auto">
          Estimer mon projet gratuitement
        </a>
        <a href="#realisations" className="btn-secondary w-full sm:w-auto">
          Voir les avant / après
        </a>
      </div>
      <p className="mt-3 text-sm text-brand-cream/50">Gratuit · Sans engagement · Rappel sous 48h</p>

      <Arguments className="mt-12 w-full max-w-3xl" />

      <div className="mt-8">
        <GarantieBadge compact />
      </div>
    </section>
  );
}
