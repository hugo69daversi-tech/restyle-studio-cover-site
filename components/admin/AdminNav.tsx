import Link from 'next/link';
import { logoutAction } from '@/lib/actions/admin';

const links = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/contenu', label: 'Qui sommes-nous' },
  { href: '/admin/actu', label: 'Ligne actu' },
  { href: '/admin/prestations', label: 'Prestations' },
  { href: '/admin/realisations-photos', label: 'Réalisations photos' },
  { href: '/admin/realisations-videos', label: 'Réalisations vidéos' },
  { href: '/admin/faq', label: 'FAQ' },
  { href: '/admin/avis', label: 'Avis Google' },
  { href: '/admin/compteur', label: 'Compteur' },
  { href: '/admin/parametres', label: 'Paramètres' },
];

export function AdminNav() {
  return (
    <nav className="w-full shrink-0 border-b border-white/10 bg-brand-bg2/60 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between p-4 md:flex-col md:items-stretch md:gap-1">
        <p className="mb-2 hidden text-xs font-semibold uppercase tracking-widest text-brand-cream/50 md:block">
          Administration
        </p>
        <div className="flex flex-wrap gap-1 md:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-brand-cream/80 hover:bg-white/5 hover:text-brand-cream"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <form action={logoutAction} className="mt-4">
          <button type="submit" className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm">
            Déconnexion
          </button>
        </form>
      </div>
    </nav>
  );
}
