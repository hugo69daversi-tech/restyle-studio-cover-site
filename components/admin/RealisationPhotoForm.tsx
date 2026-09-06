'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadMediaFile } from '@/lib/uploadMedia';
import { upsertRealisationPhoto } from '@/lib/actions/admin';
import type { RealisationPhoto } from '@/lib/types';

type Status = 'idle' | 'saving' | 'success' | 'error';

export function RealisationPhotoForm({ item }: { item?: RealisationPhoto }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const photoAvantFile = formData.get('photo_avant') as File | null;
    const photoApresFile = formData.get('photo_apres') as File | null;

    try {
      if (!item && (!photoAvantFile?.size || !photoApresFile?.size)) {
        throw new Error('Les deux photos (avant et après) sont requises pour une nouvelle réalisation.');
      }

      const payload = new FormData();
      if (item) payload.set('id', item.id);
      payload.set('titre', formData.get('titre')?.toString() || '');
      payload.set('texte_alt', formData.get('texte_alt')?.toString() || '');
      payload.set('ordre', formData.get('ordre')?.toString() || '0');
      if (formData.get('publie') === 'on') payload.set('publie', 'on');

      // Upload direct navigateur -> Supabase Storage : evite la limite de taille
      // des requetes serveur Netlify (photos de telephone souvent > 6 Mo).
      if (photoAvantFile && photoAvantFile.size > 0) {
        payload.set('photo_avant_url', await uploadMediaFile(photoAvantFile, 'photo_avant'));
      }
      if (photoApresFile && photoApresFile.size > 0) {
        payload.set('photo_apres_url', await uploadMediaFile(photoApresFile, 'photo_apres'));
      }

      await upsertRealisationPhoto(payload);
      setStatus('success');
      if (!item) form.reset();
      router.refresh();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
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
          <input type="file" name="photo_avant" accept="image/*" className="w-full text-sm" />
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
          <input type="file" name="photo_apres" accept="image/*" className="w-full text-sm" />
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
        <button
          type="submit"
          disabled={status === 'saving'}
          className="btn-primary ml-auto px-5 py-2 text-sm disabled:opacity-60"
        >
          {status === 'saving' ? 'Envoi en cours...' : item ? 'Enregistrer' : 'Ajouter'}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-sm text-green-400">
          {item ? 'Modifications enregistrées.' : 'Réalisation ajoutée avec succès.'}
        </p>
      )}
      {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
