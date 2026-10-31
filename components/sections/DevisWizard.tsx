'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { DEVIS_HREF } from '@/lib/devis';

/** Formulaire de demande "une question a la fois", ouvert par tout lien vers DEVIS_HREF. */

const PROJETS = ['Cuisine', 'Meubles / portes', 'Salle de bain', 'Film vitrage', 'Murs ou autre'];
const CRENEAUX = ['Matin', 'Après-midi', 'Soir'];
const CRENEAU_PHRASE: Record<string, string> = {
  Matin: 'dans la matinée',
  'Après-midi': "dans l'après-midi",
  Soir: 'en soirée',
};
const TOTAL_STEPS = 5;

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Answers {
  projet: string;
  ville: string;
  nom: string;
  telephone: string;
  email: string;
  creneau: string;
  consentement: boolean;
}

const EMPTY: Answers = {
  projet: '',
  ville: '',
  nom: '',
  telephone: '',
  email: '',
  creneau: '',
  consentement: false,
};

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-lg outline-none transition-colors focus:border-brand-pink';

function isValidPhone(value: string) {
  return value.replace(/\D/g, '').length >= 9;
}

export function DevisWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === DEVIS_HREF) setOpen(true);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === DEVIS_HREF) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    if (status === 'success') {
      setStep(0);
      setAnswers(EMPTY);
      setStatus('idle');
    }
  }, [status]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, step]);

  if (!open) return null;

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    setError('');
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    setError('');
    setStep((s) => Math.max(s - 1, 0));
  };

  function validateCurrent(): string {
    if (step === 1 && answers.ville.trim().length < 2) return 'Indiquez votre ville ou code postal.';
    if (step === 2 && answers.nom.trim().length < 2) return 'Indiquez votre nom.';
    if (step === 3 && !isValidPhone(answers.telephone)) return 'Indiquez un numéro de téléphone valide.';
    return '';
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step < TOTAL_STEPS - 1) {
      const message = validateCurrent();
      if (message) return setError(message);
      return next();
    }

    if (!answers.creneau) return setError('Choisissez un créneau de rappel.');
    if (!answers.consentement) return setError('Merci de cocher la case pour être recontacté.');

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: answers.nom.trim(),
          adresse: answers.ville.trim(),
          telephone: answers.telephone.trim(),
          email: answers.email.trim(),
          creneau: answers.creneau,
          projet: answers.projet,
          consentement: true,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erreur lors de l'envoi");
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  }

  const progress = status === 'success' ? 100 : Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Demande d'étude gratuite"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={close}
    >
      <div
        className="relative flex max-h-[100dvh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl border border-white/10 bg-brand-bg2 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-brand-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-brand-cream/70 hover:text-brand-cream"
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-3xl text-brand-bg">
              ✓
            </div>
            <p className="mt-6 text-2xl font-bold">Demande envoyée !</p>
            <p className="mt-3 text-brand-cream/75">
              Merci {answers.nom.split(' ')[0]}, votre demande a bien été transmise à ReStyle Studio. Nous vous
              rappelons très vite, {CRENEAU_PHRASE[answers.creneau] ?? 'au créneau choisi'}.
            </p>
            <button type="button" onClick={close} className="btn-primary mt-8">
              Retour au site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate key={step} className="animate-step-in">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-cream/50">
              Étape {step + 1} sur {TOTAL_STEPS}
            </p>

            {step === 0 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Quel est votre projet ?</h2>
                <div className="mt-6 grid gap-3">
                  {PROJETS.map((projet) => (
                    <button
                      key={projet}
                      type="button"
                      onClick={() => {
                        set('projet', projet);
                        next();
                      }}
                      className={`rounded-xl border px-5 py-4 text-left text-lg font-semibold transition-colors hover:border-brand-pink ${
                        answers.projet === projet ? 'border-brand-pink bg-brand-pink/10' : 'border-white/15 bg-white/5'
                      }`}
                    >
                      {projet}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Où se situe votre projet ?</h2>
                <input
                  ref={inputRef}
                  value={answers.ville}
                  onChange={(e) => set('ville', e.target.value)}
                  placeholder="Ville ou code postal"
                  autoComplete="address-level2"
                  className={`${inputClass} mt-6`}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Comment vous appelez-vous ?</h2>
                <input
                  ref={inputRef}
                  value={answers.nom}
                  onChange={(e) => set('nom', e.target.value)}
                  placeholder="Prénom et nom"
                  autoComplete="name"
                  className={`${inputClass} mt-6`}
                />
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">À quel numéro vous rappeler ?</h2>
                <input
                  ref={inputRef}
                  type="tel"
                  value={answers.telephone}
                  onChange={(e) => set('telephone', e.target.value)}
                  placeholder="06 12 34 56 78"
                  autoComplete="tel"
                  inputMode="tel"
                  className={`${inputClass} mt-6`}
                />
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="Email (facultatif)"
                  autoComplete="email"
                  className={`${inputClass} mt-3`}
                />
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Quand préférez-vous être rappelé ?</h2>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {CRENEAUX.map((creneau) => (
                    <button
                      key={creneau}
                      type="button"
                      onClick={() => set('creneau', creneau)}
                      className={`rounded-xl border px-3 py-4 font-semibold transition-colors hover:border-brand-pink ${
                        answers.creneau === creneau ? 'border-brand-pink bg-brand-pink/10' : 'border-white/15 bg-white/5'
                      }`}
                    >
                      {creneau}
                    </button>
                  ))}
                </div>
                <label className="mt-6 flex items-start gap-3 text-sm text-brand-cream/70">
                  <input
                    type="checkbox"
                    checked={answers.consentement}
                    onChange={(e) => set('consentement', e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>
                    J&apos;accepte d&apos;être recontacté par ReStyle Studio et j&apos;ai pris connaissance de la{' '}
                    <a href="/confidentialite" className="underline hover:text-brand-cream">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>
              </>
            )}

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            {step > 0 && (
              <div className="mt-8 flex items-center gap-3">
                <button type="button" onClick={back} className="btn-secondary px-5">
                  Retour
                </button>
                <button type="submit" disabled={status === 'sending'} className="btn-primary flex-1 disabled:opacity-60">
                  {step < TOTAL_STEPS - 1
                    ? 'Continuer'
                    : status === 'sending'
                      ? 'Envoi en cours...'
                      : 'Envoyer ma demande'}
                </button>
              </div>
            )}

            <p className="mt-6 text-center text-xs text-brand-cream/50">
              Gratuit et sans engagement · Rappel sous 48h
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
