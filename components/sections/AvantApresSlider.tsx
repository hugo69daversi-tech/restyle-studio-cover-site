'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motionValue, useInView } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import type { RealisationPhoto } from '@/lib/types';

function SingleSlider({ item, featured }: { item: RealisationPhoto; featured: boolean }) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(containerRef, { once: true, margin: '-30%' });

  // A l'arrivee a l'ecran, le curseur fait un aller-retour pour montrer qu'il se deplace.
  useEffect(() => {
    if (!inView || touched) return;
    const hint = motionValue(50);
    const unsubscribe = hint.on('change', setPosition);
    const controls = animate(hint, [50, 78, 22, 50], { duration: 2.4, ease: 'easeInOut' });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, touched]);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    setTouched(true);
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <figure className="group">
      <div
        ref={containerRef}
        className={`relative w-full cursor-ew-resize select-none touch-pan-y overflow-hidden rounded-[2rem] border border-white/10 ${
          featured ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[4/3]'
        }`}
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        <Image
          src={item.photo_apres_url}
          alt={item.texte_alt || `${item.titre} - après`}
          fill
          sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={item.photo_avant_url}
            alt={item.texte_alt || `${item.titre} - avant`}
            fill
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
          />
        </div>
        <div
          className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-brand-gradient shadow-[0_0_20px_4px_rgba(255,61,127,0.55)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-brand-bg/60 text-lg backdrop-blur-md">
            ↔
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
          Avant
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-bg">
          Après
        </span>
      </div>
      <figcaption className={`mt-4 line-clamp-2 text-brand-cream/70 ${featured ? 'md:text-lg' : 'text-sm'}`}>
        {item.titre}
      </figcaption>
    </figure>
  );
}

export function AvantApresPhotos({ photos }: { photos: RealisationPhoto[] }) {
  if (photos.length === 0) return null;
  const [premiere, ...autres] = photos;

  return (
    <section id="realisations" className="section-container">
      <SectionHeading
        eyebrow="Réalisations"
        titre="Avant / après : jugez par vous-même."
        accent={[0, 1, 2]}
        chapeau="Faites glisser le curseur pour comparer. Même meubles, même murs : seul le revêtement change."
      />
      <div className="mt-16 space-y-12">
        <Reveal>
          <SingleSlider item={premiere} featured />
        </Reveal>
        <div className="grid gap-12 md:grid-cols-2">
          {autres.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.12}>
              <SingleSlider item={item} featured={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
