import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { deleteRealisationPhoto } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import { RealisationPhotoForm } from '@/components/admin/RealisationPhotoForm';
import type { RealisationPhoto } from '@/lib/types';

export default async function AdminRealisationsPhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('realisations_photos').select('*').order('ordre');
  const items = (data ?? []) as RealisationPhoto[];
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <BackToDashboard />
      <SavedBanner show={ok === '1'} />
      <h1 className="text-2xl font-bold">Réalisations — Photos avant/après</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Chaque réalisation affiche une photo avant et une photo après, comparées avec un slider.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <RealisationPhotoForm item={item} />
            <form action={deleteRealisationPhoto}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ajouter une réalisation</h2>
      <div className="mt-4">
        <RealisationPhotoForm />
      </div>
    </div>
  );
}
