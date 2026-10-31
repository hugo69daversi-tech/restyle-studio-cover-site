'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Defilement fluide (Lenis) sur tout le site. Desactive si l'utilisateur
 * demande moins d'animations. Se met en pause quand une modale bloque le
 * scroll du body (formulaire de devis, video en grand).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Les ancres internes (#realisations...) defilent en douceur ; #devis n'a
    // pas de cible et reste gere par le formulaire.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.pathname !== window.location.pathname) return;
      const id = link.hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener('click', onClick);

    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
