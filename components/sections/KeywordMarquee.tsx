const MOTS = ['Cuisine', 'Salle de bain', 'Mobilier', 'Film vitrage', 'Portes', 'Murs', '500+ finitions', 'Garantie 10 ans'];

/** Bandeau de mots geants qui defile, en separation entre le Hero et la suite. */
export function KeywordMarquee() {
  const serie = [...MOTS, ...MOTS];
  return (
    <div aria-hidden className="relative -rotate-2 overflow-hidden border-y border-white/10 bg-brand-bg2/60 py-5 md:py-7">
      <div className="flex w-max animate-marquee items-center gap-10 [--marquee-duration:45s]">
        {serie.map((mot, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-bold uppercase md:text-5xl">
            <span className={i % 2 ? 'text-outline' : 'text-gradient'}>{mot}</span>
            <span className="text-brand-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
