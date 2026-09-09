'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { nextSlotAfter } from '@/lib/blogSchedule';

async function requireSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  return user;
}

function revalidateAll() {
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  revalidatePath('/sitemap.xml');
}

/**
 * Approuver un article ne le rend pas visible immediatement : il est mis en
 * file d'attente sur le prochain creneau lundi/mercredi/vendredi disponible
 * (apres le dernier article deja programme), pour respecter le rythme de
 * publication voulu sans avoir a publier manuellement chaque jour.
 */
export async function publishArticle(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  const { data: lastScheduled } = await admin
    .from('blog_articles')
    .select('published_at')
    .eq('statut', 'publie')
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date();
  const base = lastScheduled?.published_at && new Date(lastScheduled.published_at) > now
    ? new Date(lastScheduled.published_at)
    : now;
  const scheduledFor = nextSlotAfter(base);

  await admin
    .from('blog_articles')
    .update({
      titre: formData.get('titre')?.toString() || '',
      extrait: formData.get('extrait')?.toString() || '',
      contenu: formData.get('contenu')?.toString() || '',
      statut: 'publie',
      published_at: scheduledFor.toISOString(),
    })
    .eq('id', id);

  revalidateAll();
  redirect('/admin/blog?ok=1');
}

export async function saveArticleDraft(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  await admin
    .from('blog_articles')
    .update({
      titre: formData.get('titre')?.toString() || '',
      extrait: formData.get('extrait')?.toString() || '',
      contenu: formData.get('contenu')?.toString() || '',
    })
    .eq('id', id);

  revalidateAll();
  redirect('/admin/blog?ok=1');
}

export async function rejectArticle(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin.from('blog_articles').delete().eq('id', formData.get('id')?.toString());
  revalidateAll();
  redirect('/admin/blog?ok=1');
}

export async function unpublishArticle(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('blog_articles')
    .update({ statut: 'brouillon', published_at: null })
    .eq('id', formData.get('id')?.toString());
  revalidateAll();
  redirect('/admin/blog?ok=1');
}
