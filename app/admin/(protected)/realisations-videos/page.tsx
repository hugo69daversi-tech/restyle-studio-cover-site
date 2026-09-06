import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { upsertRealisationVideo, deleteRealisationVideo } from '@/lib/actions/admin';
import type { RealisationVideo } from '@/lib/types';

function VideoForm({ item }: { item?: RealisationVideo }) {
  return (
    <form action={upsertRealisationVideo} className="card space-y-3" encType="multipart/form-data">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <label className="mb-1 block text-sm font-medium">Titre</label>
        <input
          name="titre"
          required
          defaultValue={item?.titre}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Texte alternatif (SEO)</label>
        <input
          name="texte_alt"
          defaultValue={item?.texte_alt}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      {item && (
        <video src={item.video_url} controls className="aspect-video w-full rounded-lg bg-black" />
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Fichier vidéo (upload)</label>
          <input type="file" name="video" accept="video/*" className="w-full text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ou lien vidéo externe (YouTube, etc.)</label>
          <input
            name="video_url_externe"
            placeholder="https://..."
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Ordre</label>
          <input
            type="number"
            name="ordre"
            defaultValue={item?.ordre ?? 0}
            className="w-24 rounded-lg border border-white/15 bg-white/5 px-3 py-2"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="publie" defaultChecked={item?.publie ?? true} />
          Publié
        </label>
        <button type="submit" className="btn-primary ml-auto px-5 py-2 text-sm">
          {item ? 'Enregistrer' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default async function AdminRealisationsVideosPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('realisations_videos').select('*').order('ordre');
  const items = (data ?? []) as RealisationVideo[];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Réalisations — Vidéos avant/après</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Liste de vidéos qui défilent simplement (pas de comparaison superposée).
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <VideoForm item={item} />
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
        <VideoForm />
      </div>
    </div>
  );
}
