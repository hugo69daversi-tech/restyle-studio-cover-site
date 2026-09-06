import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateCompteurConfig } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import type { SiteSettings } from '@/lib/types';

export default async function AdminCompteurPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('site_settings').select('*').eq('id', 1).single();
  const settings = data as SiteSettings | null;
  const { ok } = await searchParams;

  return (
    <div className="max-w-2xl">
      <BackToDashboard />
      <SavedBanner show={ok === '1'} />
      <h1 className="text-2xl font-bold">Compteur de réalisations</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        À activer une fois une vingtaine/trentaine de chantiers réalisés. Affiché en discret, à
        côté du logo.
      </p>

      <form action={updateCompteurConfig} className="card mt-6 space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="compteur_actif" defaultChecked={settings?.compteur_actif} />
          Afficher le compteur sur le site
        </label>
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre de chantiers réalisés</label>
          <input
            type="number"
            min={0}
            name="compteur_valeur"
            defaultValue={settings?.compteur_valeur ?? 0}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
