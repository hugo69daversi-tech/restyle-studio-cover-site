'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { DEVIS_HREF } from '@/lib/devis';

const ETAPES = [
  {
    titre: 'Vous décrivez votre projet',
    texte: '5 questions en ligne, moins d’une minute. Nous vous rappelons sous 48h au créneau choisi.',
  },
  {
    titre: 'Étude gratuite & choix de la finition',
    texte: 'On étudie votre projet et vous choisissez parmi plus de 500 références : bois, marbre, mat, métal, couleurs unies…',
  },
  {
    titre: 'Pose en 1 à 3 jours',
    texte: 'Démontage, préparation, pose au millimètre. Sans poussière ni démolition : votre pièce reste utilisable.',
  },
  {
    titre: 'Garanti 10 ans',
    texte: 'Nos films architecturaux sont garantis 10 ans par le fournisseur. Un simple coup d’éponge suffit à l’entretien.',
  },
];

/** Etapes reliees par une ligne qui se remplit au fil du scroll. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });

  return (
    <section id="process" className="section-container">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Comment ça marche"
            titre="De l’idée au résultat en quelques jours."
            accent={[5, 6]}
            chapeau="Pas de chantier interminable, pas de liste d’attente de plusieurs mois."
          />
          <Reveal delay={0.3}>
            <a href={DEVIS_HREF} className="btn-primary mt-10">
              Démarrer mon projet
            </a>
          </Reveal>
        </div>

        <ol ref={ref} className="relative space-y-14 pl-14">
          <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-white/10" />
          <motion.div
            className="absolute bottom-2 left-[1.15rem] top-2 w-px origin-top bg-brand-gradient"
            style={{ scaleY: scrollYProgress }}
          />
          {ETAPES.map((etape, i) => (
            <li key={etape.titre} className="relative">
              <span className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-brand-bg font-display text-sm font-bold">
                {i + 1}
              </span>
              <Reveal>
                <h3 className="font-display text-xl font-bold md:text-2xl">{etape.titre}</h3>
                <p className="mt-3 text-brand-cream/65">{etape.texte}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
