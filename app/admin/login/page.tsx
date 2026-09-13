'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Logo } from '@/components/ui/Logo';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;
const STORAGE_KEY = 'admin-login-guard';

interface LoginGuardState {
  attempts: number;
  lockedUntil: number | null;
}

function readGuardState(): LoginGuardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempts: 0, lockedUntil: null };
    return JSON.parse(raw);
  } catch {
    return { attempts: 0, lockedUntil: null };
  }
}

function writeGuardState(state: LoginGuardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage indisponible : le blocage cote client est ignorable,
    // Supabase applique de toute facon sa propre limitation cote serveur.
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setLockedUntil(readGuardState().lockedUntil);
  }, []);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = Boolean(lockedUntil && lockedUntil > now);
  const secondsLeft = isLocked ? Math.ceil((lockedUntil! - now) / 1000) : 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLocked) return;

    setLoading(true);
    setError('');

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      const state = readGuardState();
      const attempts = (state.lockedUntil && state.lockedUntil > Date.now() ? 0 : state.attempts) + 1;

      if (attempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS;
        writeGuardState({ attempts: 0, lockedUntil: until });
        setLockedUntil(until);
        setNow(Date.now());
        setError(`Trop de tentatives. Réessayez dans ${Math.ceil(LOCKOUT_MS / 60000)} minutes.`);
      } else {
        writeGuardState({ attempts, lockedUntil: null });
        setError(`Identifiants incorrects (${attempts}/${MAX_ATTEMPTS} tentatives).`);
      }
      return;
    }

    writeGuardState({ attempts: 0, lockedUntil: null });
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-marble bg-brand-bg px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm space-y-4">
        <div className="flex flex-col items-center gap-2">
          <Logo size={48} />
          <h1 className="text-lg font-semibold">Espace admin</h1>
          <p className="text-center text-xs text-brand-cream/60">
            ReStyle Studio — accès réservé
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            disabled={isLocked}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink disabled:opacity-50"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            required
            disabled={isLocked}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 outline-none focus:border-brand-pink disabled:opacity-50"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {isLocked && (
          <p className="text-sm text-brand-cream/60">
            Nouvelle tentative possible dans {Math.floor(secondsLeft / 60)}:
            {String(secondsLeft % 60).padStart(2, '0')}.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || isLocked}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? 'Connexion...' : isLocked ? 'Bloqué temporairement' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
