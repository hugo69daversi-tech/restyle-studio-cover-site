import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateLigneActu } from '@/lib/actions/admin';
import type { LigneActu } from '@/lib/types';

export default async function AdminActuPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('ligne_actu').select('*').eq('id', 1).single();
  const ligneActu = data as LigneActu | null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Ligne actu</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Bandeau affiché en haut du site, à changer selon la saison ou l&apos;actualité.
      </p>

      <form action={updateLigneActu} className="card mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <input
            name="texte"
            defaultValue={ligneActu?.texte}
            placeholder="Ex : L'été arrive, préparez-vous avec nos films solaires."
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="actif" defaultChecked={ligneActu?.actif} />
          Afficher ce message sur le site
        </label>
        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
