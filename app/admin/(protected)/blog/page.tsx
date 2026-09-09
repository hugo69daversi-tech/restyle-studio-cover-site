import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { publishArticle, saveArticleDraft, rejectArticle, unpublishArticle } from '@/lib/actions/blog';
import { BackToDashboard } from '@/components/admin/BackToDashboard';
import { SavedBanner } from '@/components/admin/SavedBanner';
import type { BlogArticle } from '@/lib/types';

function DraftForm({ item }: { item: BlogArticle }) {
  return (
    <form action={saveArticleDraft} className="card space-y-3">
      <input type="hidden" name="id" value={item.id} />
      <div className="flex flex-wrap items-center gap-2 text-xs text-brand-cream/50">
        <span>Mot-clé cible : {item.mot_cle_cible || '—'}</span>
        <span>·</span>
        <span>/blog/{item.slug}</span>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Titre</label>
        <input
          name="titre"
          required
          defaultValue={item.titre}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Extrait (meta description)</label>
        <textarea
          name="extrait"
          rows={2}
          required
          defaultValue={item.extrait}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          Contenu (ligne vide entre les paragraphes, &quot;## &quot; devant un sous-titre)
        </label>
        <textarea
          name="contenu"
          rows={10}
          required
          defaultValue={item.contenu}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" formAction={publishArticle} className="btn-primary px-5 py-2 text-sm">
          Publier
        </button>
        <button
          type="submit"
          formAction={saveArticleDraft}
          className="rounded-full border border-white/15 px-5 py-2 text-sm hover:border-white/30"
        >
          Enregistrer sans publier
        </button>
      </div>
    </form>
  );
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('blog_articles').select('*').order('created_at', { ascending: false });
  const articles = (data ?? []) as BlogArticle[];
  const brouillons = articles.filter((a) => a.statut === 'brouillon');
  const publies = articles.filter((a) => a.statut === 'publie');
  const { ok } = await searchParams;

  return (
    <div className="max-w-3xl">
      <BackToDashboard />
      <SavedBanner show={ok === '1'} />
      <h1 className="text-2xl font-bold">Blog — validation des articles</h1>
      <p className="mt-2 text-sm text-brand-cream/60">
        Relis, corrige si besoin, puis clique &quot;Publier&quot; pour mettre l&apos;article en ligne, ou
        &quot;Rejeter&quot; pour le supprimer définitivement.
      </p>

      <h2 className="mt-8 text-lg font-semibold">
        À valider {brouillons.length > 0 && <span className="text-gradient">({brouillons.length})</span>}
      </h2>
      {brouillons.length === 0 && (
        <p className="mt-2 text-sm text-brand-cream/50">Aucun brouillon en attente pour le moment.</p>
      )}
      <div className="mt-4 space-y-4">
        {brouillons.map((item) => (
          <div key={item.id} className="space-y-2">
            <DraftForm item={item} />
            <form action={rejectArticle}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Rejeter (supprimer)
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Publiés ({publies.length})</h2>
      <div className="mt-4 space-y-2">
        {publies.map((item) => (
          <div key={item.id} className="card flex items-center justify-between gap-4">
            <div>
              <a
                href={`/blog/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-brand-pink"
              >
                {item.titre}
              </a>
              <p className="text-xs text-brand-cream/50">/blog/{item.slug}</p>
            </div>
            <form action={unpublishArticle}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="shrink-0 text-xs text-brand-cream/60 hover:underline">
                Dépublier
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
