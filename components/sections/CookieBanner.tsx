'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) setVisible(true);
    } catch {
      // localStorage indisponible : ne pas bloquer l'affichage du site
    }
  }, []);

  function choose(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch {
      // ignorable
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-brand-bg2/95 p-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-brand-cream/80">
          Ce site n&apos;utilise que des cookies techniques nécessaires à son fonctionnement. Nous
          pourrons utiliser des cookies de mesure d&apos;audience à l&apos;avenir, uniquement avec
          votre consentement.{' '}
          <a href="/confidentialite" className="underline">
            En savoir plus
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => choose('declined')} className="rounded-full border border-white/20 px-4 py-2 text-sm">
            Refuser
          </button>
          <button onClick={() => choose('accepted')} className="btn-primary px-4 py-2 text-sm">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
