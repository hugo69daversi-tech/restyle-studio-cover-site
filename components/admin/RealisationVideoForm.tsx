'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { uploadMediaFile } from '@/lib/uploadMedia';
import { upsertRealisationVideo } from '@/lib/actions/admin';
import type { RealisationVideo } from '@/lib/types';

type Status = 'idle' | 'saving' | 'success' | 'error';

export function RealisationVideoForm({ item }: { item?: RealisationVideo }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const videoFile = formData.get('video') as File | null;
    const externalUrl = formData.get('video_url_externe')?.toString().trim();

    try {
      if (!item && !videoFile?.size && !externalUrl) {
        throw new Error('Une vidéo (fichier ou lien) est requise.');
      }

      const payload = new FormData();
      if (item) payload.set('id', item.id);
      payload.set('titre', formData.get('titre')?.toString() || '');
      payload.set('texte_alt', formData.get('texte_alt')?.toString() || '');
      payload.set('ordre', formData.get('ordre')?.toString() || '0');
      if (formData.get('publie') === 'on') payload.set('publie', 'on');

      // Upload direct navigateur -> Supabase Storage : evite la limite de taille
      // des requetes serveur Netlify (les videos depassent tres vite quelques Mo).
      if (videoFile && videoFile.size > 0) {
        payload.set('video_url', await uploadMediaFile(videoFile, 'video'));
      } else if (externalUrl) {
        payload.set('video_url', externalUrl);
      }

      await upsertRealisationVideo(payload);
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
      {item && <video src={item.video_url} controls className="aspect-video w-full rounded-lg bg-black" />}
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
          {item ? 'Modifications enregistrées.' : 'Vidéo ajoutée avec succès.'}
        </p>
      )}
      {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
