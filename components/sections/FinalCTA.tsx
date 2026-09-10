'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ContactForm } from './ContactForm';
import type { SiteSettings } from '@/lib/types';

export function FinalCTA({ settings }: { settings: SiteSettings | null }) {
  const [showForm, setShowForm] = useState(false);
  const phone = settings?.telephone || '+33 7 85 96 53 47';

  return (
    <section id="contact" className="section-container text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Prêt à <span className="text-gradient">transformer votre intérieur</span> ?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-brand-cream/70">
        Laissez-nous vos coordonnées pour être rappelé, ou appelez-nous directement.
      </p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-cream/50">
        Nous vous rappelons généralement sous 48h.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button type="button" onClick={() => setShowForm(true)} className="btn-primary">
          Demander votre étude gratuite
        </button>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn-secondary gap-2">
          <Icon name="phone" className="h-5 w-5" />
          Appelez-nous
        </a>
      </div>

      {showForm && (
        <div className="mx-auto mt-10 max-w-xl text-left">
          <ContactForm />
        </div>
      )}
    </section>
  );
}
