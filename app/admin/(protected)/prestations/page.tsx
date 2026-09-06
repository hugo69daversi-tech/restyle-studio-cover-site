import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { upsertPrestation, deletePrestation } from '@/lib/actions/admin';
import type { Prestation } from '@/lib/types';

const ICONES = ['sparkles', 'hammer', 'shield', 'palette'];

function PrestationForm({ item }: { item?: Prestation }) {
  return (
    <form action={upsertPrestation} className="card space-y-3">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
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
          <label className="mb-1 block text-sm font-medium">Icône</label>
          <select
            name="icone"
            defaultValue={item?.icone || 'sparkles'}
            className="w-full rounded-lg border border-white/15 bg-brand-bg2 px-3 py-2"
          >
            {ICONES.map((icone) => (
              <option key={icone} value={icone}>
                {icone}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={2}
          required
          defaultValue={item?.description}
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

export default async function AdminPrestationsPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin.from('prestations').select('*').order('ordre');
  const prestations = (data ?? []) as Prestation[];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Prestations</h1>
      <p className="mt-2 text-sm text-brand-cream/60">Les 4 piliers de la marque.</p>

      <div className="mt-6 space-y-4">
        {prestations.map((item) => (
          <div key={item.id} className="space-y-2">
            <PrestationForm item={item} />
            <form action={deletePrestation}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ajouter une prestation</h2>
      <div className="mt-4">
        <PrestationForm />
      </div>
    </div>
  );
}
