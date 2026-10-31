'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
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
      <SectionHeading eyebrow="FAQ" titre="Vos questions, nos réponses." accent={[2, 3]} />
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 border-y border-white/10">
        {faqItems.map((item, i) => {
          const isOpen = openId === item.id;
          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold transition-colors hover:text-brand-pink md:text-xl"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                {item.question}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl transition-transform duration-300 ${
                    isOpen ? 'rotate-45 border-brand-pink text-brand-pink' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-14 text-brand-cream/65">{item.reponse}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
