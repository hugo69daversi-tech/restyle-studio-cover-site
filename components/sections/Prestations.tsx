import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { Spotlight } from '@/components/motion/Spotlight';
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

// Grille "bento" : la premiere carte prend deux colonnes et deux lignes.
const BENTO = ['md:col-span-2 md:row-span-2', 'md:col-span-2', '', ''];

export function Prestations({ prestations }: { prestations: Prestation[] }) {
  const items = prestations.length > 0 ? prestations : DEFAULTS;

  return (
    <section id="prestations" className="section-container">
      <SectionHeading
        eyebrow="Nos prestations"
        titre="Tout transformer, sans rien démolir."
        accent={[3, 4]}
        chapeau="Du covering de meuble sur-mesure au film solaire pour vitrage professionnel : une gamme complète pour transformer votre intérieur sans travaux lourds, sans poussière ni démolition."
      />

      <div className="mt-16 grid auto-rows-fr gap-4 md:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} className={BENTO[i % BENTO.length]}>
            <Spotlight className="card group flex h-full flex-col justify-between gap-10 p-8 transition-colors hover:border-brand-pink/30">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-brand-bg transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon name={item.icone} className="h-7 w-7" />
                </div>
                <span className="font-display text-sm text-brand-cream/30">0{i + 1}</span>
              </div>
              <div>
                <h3 className={`font-display font-bold ${i === 0 ? 'text-2xl md:text-4xl' : 'text-xl'}`}>{item.titre}</h3>
                <p className={`mt-3 text-brand-cream/65 ${i === 0 ? 'md:text-lg' : 'text-sm'}`}>{item.description}</p>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
