import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { updateHero } from '@/lib/actions/admin';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import type { HeroContent } from '@/lib/types';

export default async function AdminContenuPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('hero_content').select('*').eq('id', 1).single();
  const hero = data as HeroContent | null;
  const { ok } = await searchParams;

  return (
    <div className="max-w-2xl">
      <BackToDashboard />
      <SavedBanner show={ok === '1'} />
      <h1 className="text-2xl font-bold">Qui sommes-nous</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Texte de présentation affiché en haut de la page publique.
      </p>

      <form action={updateHero} className="card mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Titre</label>
          <input
            name="titre"
            defaultValue={hero?.titre}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Devise (une phrase par ligne, ex: PRECISION. INNOVATION. TRANSFORMATION.)
          </label>
          <textarea
            name="devise"
            rows={2}
            defaultValue={hero?.devise}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Texte de présentation</label>
          <textarea
            name="texte"
            rows={5}
            defaultValue={hero?.texte}
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
