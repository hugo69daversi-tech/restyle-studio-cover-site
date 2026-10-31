'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { WordsReveal } from '@/components/motion/Reveal';
import { DEVIS_HREF } from '@/lib/devis';
import type { RealisationPhoto } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Visuel avant/apres qui se balaie tout seul en boucle, comme un film pose en direct. */
function HeroVisual({ photo }: { photo?: RealisationPhoto }) {
  if (!photo) {
    return (
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <Image src="/logo-badge.png" alt="ReStyle Studio" width={320} height={320} className="w-3/5 rounded-full" priority />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(255,61,127,0.45)]">
      <Image
        src={photo.photo_avant_url}
        alt={photo.texte_alt || `${photo.titre} - avant`}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover"
      />
      <div className="absolute inset-0 animate-wipe">
        <Image
          src={photo.photo_apres_url}
          alt={photo.texte_alt || `${photo.titre} - après`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-y-0 w-[3px] -translate-x-1/2 animate-wipe-line bg-brand-gradient shadow-[0_0_24px_6px_rgba(255,61,127,0.6)]" />
      <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 text-xs font-semibold uppercase tracking-[0.25em]">
        <span>Avant</span>
        <span className="text-gradient">Après</span>
      </div>
    </div>
  );
}

export function Hero({ photo }: { photo?: RealisationPhoto }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="accueil" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] animate-drift rounded-full bg-brand-pink/20 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[32rem] w-[32rem] animate-drift rounded-full bg-brand-orange/15 blur-[120px] [animation-delay:-9s]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <motion.div style={{ opacity: textOpacity }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Covering architectural · Moselle &amp; Luxembourg
          </motion.p>

          <WordsReveal
            as="h1"
            text="Votre intérieur comme neuf, sans tout remplacer."
            delay={0.15}
            className="mt-6 font-display text-[clamp(2rem,4.6vw,3.9rem)] font-bold leading-[1.02] tracking-tight"
            accent={[2, 3]}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            <p className="mt-8 max-w-xl text-lg text-brand-cream/75">
              Cuisines, meubles, salles de bain, vitrages : on transforme ce que vous avez déjà avec un covering
              architectural haut de gamme. <strong className="text-brand-cream">En moyenne 75 % moins cher</strong>{' '}
              qu&apos;un remplacement, posé en <strong className="text-brand-cream">1 à 3 jours</strong>.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={DEVIS_HREF} className="btn-primary">
                Estimer mon projet gratuitement
              </a>
              <a href="#realisations" className="btn-secondary">
                Voir les avant / après
              </a>
            </div>
            <p className="mt-4 text-sm text-brand-cream/50">
              Gratuit · Sans engagement · Démarrage rapide, sans longue liste d&apos;attente
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ y: visualY, rotate: visualRotate }}
          initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <HeroVisual photo={photo} />

          <div className="absolute -left-4 top-8 animate-float rounded-2xl border border-white/10 bg-brand-bg2/80 px-4 py-3 shadow-2xl backdrop-blur-md sm:-left-10">
            <p className="font-display text-2xl font-bold text-gradient">-75 %</p>
            <p className="text-xs text-brand-cream/60">vs. un remplacement</p>
          </div>
          <div className="absolute -right-3 bottom-24 animate-float rounded-2xl border border-white/10 bg-brand-bg2/80 px-4 py-3 shadow-2xl backdrop-blur-md [animation-delay:-3s] sm:-right-8">
            <p className="font-display text-2xl font-bold">10 ans</p>
            <p className="text-xs text-brand-cream/60">de garantie</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
