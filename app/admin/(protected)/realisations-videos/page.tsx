import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { deleteRealisationVideo } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import { RealisationVideoForm } from '@/components/admin/RealisationVideoForm';
import type { RealisationVideo } from '@/lib/types';

export default async function AdminRealisationsVideosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('realisations_videos').select('*').order('ordre');
  const items = (data ?? []) as RealisationVideo[];
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <BackToDashboard />
      <SavedBanner show={ok === '1'} />
      <h1 className="text-2xl font-bold">Réalisations — Vidéos avant/après</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Liste de vidéos qui défilent simplement (pas de comparaison superposée).
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <RealisationVideoForm item={item} />
            <form action={deleteRealisationVideo}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ajouter une vidéo</h2>
      <div className="mt-4">
        <RealisationVideoForm />
      </div>
    </div>
  );
}
