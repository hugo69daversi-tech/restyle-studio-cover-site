import { createSupabaseBrowserClient } from '@/lib/supabase/client';

/**
 * Upload direct navigateur -> Supabase Storage (bucket "media").
 * Evite de faire transiter les fichiers (photos/videos) par le serveur Netlify,
 * qui rejette silencieusement les requetes trop volumineuses (photos de telephone).
 */
export async function uploadMediaFile(file: File, folder: string): Promise<string> {
  const supabase = createSupabaseBrowserClient();
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from('media').upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) {
    throw new Error(`Échec de l'envoi du fichier "${file.name}" : ${error.message}`);
  }

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}
