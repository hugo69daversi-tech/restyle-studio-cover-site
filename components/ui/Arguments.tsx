/** Les trois arguments commerciaux repris dans le Hero et les bandeaux CTA. */
export const ARGUMENTS = [
  { chiffre: '-75 %', texte: "en moyenne vs. remplacer cuisine, meubles ou salle de bain" },
  { chiffre: '1 à 3 j', texte: 'de chantier, sans poussière ni démolition' },
  { chiffre: 'Rapide', texte: 'démarrage sans longue liste d’attente' },
];

export function Arguments({ className = '' }: { className?: string }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      {ARGUMENTS.map((arg) => (
        <li key={arg.chiffre} className="card p-4 text-center">
          <p className="text-gradient text-2xl font-extrabold md:text-3xl">{arg.chiffre}</p>
          <p className="mt-1 text-sm text-brand-cream/70">{arg.texte}</p>
        </li>
      ))}
    </ul>
  );
}
