import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateAvisConfig } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import type { SiteSettings } from '@/lib/types';

export default async function AdminAvisPage({
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
      <h1 className="text-2xl font-bold">Avis Google</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Module désactivé par défaut tant qu&apos;il n&apos;y a pas d&apos;avis à afficher.
      </p>

      <form action={updateAvisConfig} className="card mt-6 space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="avis_google_actif" defaultChecked={settings?.avis_google_actif} />
          Afficher le module Avis Google sur le site
        </label>
        <div>
          <label className="mb-1 block text-sm font-medium">Lien vers la fiche Google Business</label>
          <input
            name="avis_google_lien"
            defaultValue={settings?.avis_google_lien ?? ''}
            placeholder="https://g.page/..."
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
