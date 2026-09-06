import Link from 'next/link';

export function BackToDashboard() {
  return (
    <Link
      href="/admin"
      className="mb-4 inline-flex items-center gap-1 text-sm text-brand-cream/60 hover:text-brand-cream"
    >
      ← Retour au tableau de bord
    </Link>
  );
}
