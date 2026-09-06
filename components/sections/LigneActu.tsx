import type { LigneActu as LigneActuType } from '@/lib/types';

export function LigneActu({ ligneActu }: { ligneActu: LigneActuType | null }) {
  if (!ligneActu || !ligneActu.actif || !ligneActu.texte) return null;

  return (
    <div className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-6 py-3 text-center text-sm font-medium text-brand-cream/90">
        <span className="text-gradient font-semibold">Actu · </span>
        {ligneActu.texte}
      </div>
    </div>
  );
}
