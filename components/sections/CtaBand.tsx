import { DEVIS_HREF } from '@/lib/devis';

/** Bandeau de relance place juste apres les preuves (avant/apres, videos). */
export function CtaBand({ titre }: { titre: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="card flex flex-col items-center gap-6 border-brand-pink/25 bg-gradient-to-br from-brand-pink/10 to-brand-orange/5 p-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-xl font-bold md:text-2xl">{titre}</p>
          <p className="mt-2 text-brand-cream/75">
            En moyenne <strong className="text-brand-cream">75 % moins cher</strong> qu&apos;un remplacement, chantier
            en <strong className="text-brand-cream">1 à 3 jours</strong>.
          </p>
        </div>
        <a href={DEVIS_HREF} className="btn-primary shrink-0">
          Estimer mon projet
        </a>
      </div>
    </section>
  );
}
