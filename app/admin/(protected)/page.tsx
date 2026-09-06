import Link from 'next/link';

const cards = [
  { href: '/admin/contenu', title: 'Qui sommes-nous', desc: 'Titre, devise et texte de présentation.' },
  { href: '/admin/actu', title: 'Ligne actu', desc: 'Bandeau court modifiable à tout moment.' },
  { href: '/admin/prestations', title: 'Prestations', desc: 'Les 4 piliers de la marque.' },
  { href: '/admin/realisations-photos', title: 'Réalisations photos', desc: 'Avant/après avec slider.' },
  { href: '/admin/realisations-videos', title: 'Réalisations vidéos', desc: 'Vidéos avant/après.' },
  { href: '/admin/faq', title: 'FAQ', desc: 'Questions fréquentes affichées sur le site.' },
  { href: '/admin/avis', title: 'Avis Google', desc: 'Activer/désactiver le module.' },
  { href: '/admin/compteur', title: 'Compteur de réalisations', desc: 'Activer et fixer le chiffre affiché.' },
  { href: '/admin/parametres', title: 'Paramètres', desc: 'Coordonnées, horaires, zone, réseaux sociaux.' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Toutes les modifications sont visibles sur le site en moins d&apos;une minute.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card block hover:border-brand-pink/50">
            <h2 className="font-semibold">{card.title}</h2>
            <p className="mt-1 text-sm text-brand-cream/60">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
