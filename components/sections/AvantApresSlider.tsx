'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { RealisationPhoto } from '@/lib/types';

function SingleSlider({ item }: { item: RealisationPhoto }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div className="card overflow-hidden p-0">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none touch-none"
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
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            src={item.photo_avant_url}
            alt={item.texte_alt || `${item.titre} - avant`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient text-brand-bg shadow-lg">
            ↔
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide">
          Avant
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide">
          Après
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{item.titre}</h3>
      </div>
    </div>
  );
}

export function AvantApresPhotos({ photos }: { photos: RealisationPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <section id="realisations" className="section-container">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Avant / <span className="text-gradient">Après</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-brand-cream/70">
        Faites glisser le curseur pour comparer avant et après.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {photos.map((item) => (
          <SingleSlider key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
