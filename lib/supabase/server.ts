import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/** Client cote serveur, utilise la session de l'utilisateur connecte (pages admin). */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // appele depuis un Server Component sans acces en ecriture aux cookies :
          // ignorable, le middleware se charge de rafraichir la session.
        }
      },
    },
  });
}

/**
 * Client admin (cle service_role) : ne jamais importer depuis un composant client.
 * Reserve aux server actions/routes pour lire/ecrire le contenu sans etre limite par RLS.
 * Pas de gestion de cookies : ce client n'est jamais lie a une session utilisateur.
 */
export function createSupabaseAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
