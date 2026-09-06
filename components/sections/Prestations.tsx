import { Icon } from '@/components/ui/Icon';
import type { Prestation } from '@/lib/types';

const DEFAULTS: Prestation[] = [
  {
    id: 'default-1',
    titre: 'Covering meubles',
    description: 'Cuisines, portes, mobiliers : un relooking complet sans changer vos meubles.',
    icone: 'palette',
    ordre: 0,
    publie: true,
  },
  {
    id: 'default-2',
    titre: 'Rénovation sur-mesure',
    description: "Intérieur et extérieur, adaptée à vos espaces et à vos contraintes.",
    icone: 'hammer',
    ordre: 1,
    publie: true,
  },
  {
    id: 'default-3',
    titre: 'Résistant & durable',
    description: 'Matériaux premium, pensés pour durer au quotidien.',
    icone: 'shield',
    ordre: 2,
    publie: true,
  },
  {
    id: 'default-4',
    titre: 'Design & finition',
    description: 'Un rendu haut de gamme, au détail près, incluant le film vitrage bâtiment.',
    icone: 'sparkles',
    ordre: 3,
    publie: true,
  },
];

export function Prestations({ prestations }: { prestations: Prestation[] }) {
  const items = prestations.length > 0 ? prestations : DEFAULTS;

  return (
    <section id="prestations" className="section-container">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Nos <span className="text-gradient">prestations</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-brand-cream/70">
        Du covering de meuble sur-mesure au film solaire pour vitrage professionnel, une gamme
        complète pour transformer votre intérieur sans travaux lourds.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-brand-bg">
              <Icon name={item.icone} className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">{item.titre}</h3>
            <p className="mt-2 text-sm text-brand-cream/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
