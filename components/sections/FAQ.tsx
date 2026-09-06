'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { FaqItem } from '@/lib/types';

const DEFAULTS: FaqItem[] = [
  {
    id: 'd1',
    question: 'Combien de temps durent les travaux ?',
    reponse:
      'La plupart des chantiers de covering (cuisine, meuble) sont réalisés en 1 à 3 jours, sans gros travaux ni poussière.',
    ordre: 0,
    publie: true,
  },
  {
    id: 'd2',
    question: 'Quel entretien pour un covering ?',
    reponse:
      "Un entretien simple à l'eau savonneuse suffit. Les matériaux utilisés sont résistants à l'humidité et aux chocs du quotidien.",
    ordre: 1,
    publie: true,
  },
  {
    id: 'd3',
    question: 'Proposez-vous une garantie ?',
    reponse:
      'Oui, nos prestations sont garanties. Les détails sont précisés lors du devis établi avec notre commercial.',
    ordre: 2,
    publie: true,
  },
];

export function FAQ({ items }: { items: FaqItem[] }) {
  const faqItems = items.length > 0 ? items : DEFAULTS;
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="section-container">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Questions <span className="text-gradient">fréquentes</span>
      </h2>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="card">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left font-semibold"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                {item.question}
                <Icon
                  name="chevron"
                  className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && <p className="mt-3 text-sm text-brand-cream/70">{item.reponse}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
