import { Reveal, WordsReveal } from '@/components/motion/Reveal';

/** En-tete de section commun : sur-titre, titre anime mot par mot, chapeau. */
export function SectionHeading({
  eyebrow,
  titre,
  accent = [],
  chapeau,
  align = 'center',
}: {
  eyebrow: string;
  titre: string;
  /** Index des mots du titre a passer en degrade. */
  accent?: number[];
  chapeau?: string;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <WordsReveal
        text={titre}
        className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.08] tracking-tight"
        accent={accent}
      />
      {chapeau && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-lg text-brand-cream/65 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{chapeau}</p>
        </Reveal>
      )}
    </div>
  );
}
