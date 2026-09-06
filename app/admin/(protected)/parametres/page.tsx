import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateSiteSettings } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import type { SiteSettings } from '@/lib/types';

export default async function AdminParametresPage({
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
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <p className="mt-2 text-sm text-brand-cream/60">Coordonnées et informations générales.</p>

      <form action={updateSiteSettings} className="card mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Téléphone</label>
            <input
              name="telephone"
              defaultValue={settings?.telephone}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              name="email"
              defaultValue={settings?.email}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Zone d&apos;intervention (texte libre)</label>
          <input
            name="zone_intervention"
            defaultValue={settings?.zone_intervention}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Villes / secteurs couverts (séparés par des virgules)</label>
          <input
            name="villes"
            defaultValue={settings?.villes}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Horaires</label>
          <input
            name="horaires"
            defaultValue={settings?.horaires}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Lien Instagram</label>
            <input
              name="instagram_url"
              defaultValue={settings?.instagram_url ?? ''}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Lien Facebook</label>
            <input
              name="facebook_url"
              defaultValue={settings?.facebook_url ?? ''}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Lien TikTok</label>
            <input
              name="tiktok_url"
              defaultValue={settings?.tiktok_url ?? ''}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
