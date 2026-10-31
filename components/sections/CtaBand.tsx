import { Reveal } from '@/components/motion/Reveal';
import { DEVIS_HREF } from '@/lib/devis';

/** Bandeau de relance place juste apres les preuves (avant/apres, videos). */
export function CtaBand({ titre }: { titre: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <Reveal>
        <div className="glow-border">
          <div className="flex flex-col items-center gap-6 rounded-[calc(1.5rem-1px)] bg-brand-bg2 p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
            <div>
              <p className="font-display text-xl font-bold md:text-2xl">{titre}</p>
              <p className="mt-2 text-brand-cream/70">
                En moyenne <strong className="text-brand-cream">75 % moins cher</strong> qu&apos;un remplacement, chantier
                en <strong className="text-brand-cream">1 à 3 jours</strong>.
              </p>
            </div>
            <a href={DEVIS_HREF} className="btn-primary shrink-0">
              Estimer mon projet
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
