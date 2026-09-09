import { createSupabaseAdminClient } from '@/lib/supabase/server';
import type { BlogArticle } from '@/lib/types';

// "publie" veut dire approuve : la date reelle de visibilite est published_at,
// qui peut etre programmee dans le futur (creneau lundi/mercredi/vendredi).
export async function getPublishedArticles(): Promise<BlogArticle[]> {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('statut', 'publie')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });
  return (data ?? []) as BlogArticle[];
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('statut', 'publie')
    .lte('published_at', new Date().toISOString())
    .maybeSingle();
  return (data as BlogArticle) ?? null;
}
