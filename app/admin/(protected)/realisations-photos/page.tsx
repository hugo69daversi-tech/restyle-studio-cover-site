import Image from 'next/image';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { upsertRealisationPhoto, deleteRealisationPhoto } from '@/lib/actions/admin';
import type { RealisationPhoto } from '@/lib/types';

function PhotoForm({ item }: { item?: RealisationPhoto }) {
  return (
    <form action={upsertRealisationPhoto} className="card space-y-3" encType="multipart/form-data">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <label className="mb-1 block text-sm font-medium">Titre de la réalisation</label>
        <input
          name="titre"
          required
          defaultValue={item?.titre}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Texte alternatif (SEO image)</label>
        <input
          name="texte_alt"
          defaultValue={item?.texte_alt}
          placeholder="Ex : Covering cuisine gris mat avant/après à Metz"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Photo avant {item ? '(laisser vide pour ne pas changer)' : '*'}
          </label>
          {item && (
            <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg">
              <Image src={item.photo_avant_url} alt="" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            name="photo_avant"
            accept="image/*"
            required={!item}
            className="w-full text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Photo après {item ? '(laisser vide pour ne pas changer)' : '*'}
          </label>
          {item && (
            <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg">
              <Image src={item.photo_apres_url} alt="" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            name="photo_apres"
            accept="image/*"
            required={!item}
            className="w-full text-sm"
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

export default async function AdminRealisationsPhotosPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('realisations_photos').select('*').order('ordre');
  const items = (data ?? []) as RealisationPhoto[];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Réalisations — Photos avant/après</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Chaque réalisation affiche une photo avant et une photo après, comparées avec un slider.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <PhotoForm item={item} />
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
        <PhotoForm />
      </div>
    </div>
  );
}
