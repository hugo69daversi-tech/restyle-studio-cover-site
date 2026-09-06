'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erreur lors de l'envoi");
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  }

  if (status === 'success') {
    return (
      <div className="card text-center">
        <p className="text-lg font-semibold text-gradient">Merci pour votre demande !</p>
        <p className="mt-2 text-sm text-brand-cream/70">
          Un commercial ReStyle Studio Cover vous recontacte au créneau choisi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Nom / Prénom *</label>
          <input
            name="nom"
            required
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Adresse</label>
          <input
            name="adresse"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Téléphone</label>
          <input
            name="telephone"
            type="tel"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Créneau de rappel préféré</label>
        <select
          name="creneau"
          defaultValue="Matin"
          className="w-full rounded-lg border border-white/15 bg-brand-bg2 px-4 py-2.5 outline-none focus:border-brand-pink"
        >
          <option>Matin</option>
          <option>Après-midi</option>
          <option>Soir</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Votre besoin (optionnel)</label>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-brand-cream/70">
        <input type="checkbox" name="consentement" required className="mt-0.5" />
        J&apos;accepte d&apos;être recontacté par ReStyle Studio et j&apos;ai pris connaissance de la{' '}
        <a href="/confidentialite" className="underline hover:text-brand-cream">
          politique de confidentialité
        </a>
        .
      </label>

      {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Envoi en cours...' : 'Demander votre étude gratuite'}
      </button>
    </form>
  );
}
