import { Icon } from '@/components/ui/Icon';
import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import { DEVIS_HREF } from '@/lib/devis';
import type { SiteSettings } from '@/lib/types';

export function FinalCTA({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.telephone || '+33 7 85 96 53 47';

  return (
    <section id="contact" className="section-container">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center md:px-16 md:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-brand-bg2" />
        <div aria-hidden className="absolute -left-20 -top-20 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-pink/30 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-orange/25 blur-[120px] [animation-delay:-8s]" />

        <Reveal>
          <p className="eyebrow">Étude gratuite</p>
        </Reveal>
        <WordsReveal
          text="Prêt à transformer votre intérieur ?"
          className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight"
          accent={[2, 3]}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-brand-cream/70">
            5 questions, moins d&apos;une minute. En moyenne 75 % moins cher qu&apos;un remplacement, posé en 1 à 3
            jours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={DEVIS_HREF} className="btn-primary px-10 py-4 text-lg">
              Demander mon étude gratuite
            </a>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn-secondary gap-2">
              <Icon name="phone" className="h-5 w-5" />
              {phone}
            </a>
          </div>
          <p className="mt-5 text-sm text-brand-cream/50">
            Gratuit et sans engagement · Nous vous rappelons généralement sous 48h.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
