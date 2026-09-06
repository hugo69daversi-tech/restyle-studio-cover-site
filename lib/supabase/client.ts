import { createBrowserClient } from '@supabase/ssr';

/** Client cote navigateur (formulaire de login admin uniquement). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
