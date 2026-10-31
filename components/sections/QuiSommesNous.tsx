import { Logo } from '@/components/ui/Logo';
import { Reveal } from '@/components/motion/Reveal';
import type { HeroContent } from '@/lib/types';

/** Histoire de la famille : contenu edite depuis l'admin "Qui sommes-nous" (table hero_content). */
export function QuiSommesNous({ hero }: { hero: HeroContent | null }) {
  const devise = hero?.devise || 'PRECISION. INNOVATION. TRANSFORMATION.';
  const texte = hero?.texte;
  const motsDevise = devise.replace(/\.$/, '').split('. ').filter(Boolean);

  if (!texte) return null;

  return (
    <section id="qui-sommes-nous" className="section-container">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -z-10 animate-drift rounded-full bg-brand-pink/25 blur-[100px]" />
          <div className="glow-border rounded-full">
            <div className="rounded-full bg-brand-bg p-3">
              <Logo size={400} />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Qui sommes-nous</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.08] tracking-tight">
              René, Joce &amp; Hugo. <span className="text-gradient">Une famille, un savoir-faire.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 whitespace-pre-line text-brand-cream/70">{texte}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {motsDevise.map((mot) => (
                <p key={mot} className="font-display text-lg font-bold uppercase tracking-widest text-gradient md:text-xl">
                  {mot}.
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
