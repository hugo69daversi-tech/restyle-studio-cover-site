import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { upsertFaq, deleteFaq } from '@/lib/actions/admin';
import type { FaqItem } from '@/lib/types';

function FaqForm({ item }: { item?: FaqItem }) {
  return (
    <form action={upsertFaq} className="card space-y-3">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <label className="mb-1 block text-sm font-medium">Question</label>
        <input
          name="question"
          required
          defaultValue={item?.question}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Réponse</label>
        <textarea
          name="reponse"
          rows={3}
          required
          defaultValue={item?.reponse}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2"
        />
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

export default async function AdminFaqPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('faq').select('*').order('ordre');
  const items = (data ?? []) as FaqItem[];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <p className="mt-2 text-sm text-brand-cream/60">Questions fréquentes affichées sur le site.</p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <FaqForm item={item} />
            <form action={deleteFaq}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ajouter une question</h2>
      <div className="mt-4">
        <FaqForm />
      </div>
    </div>
  );
}
