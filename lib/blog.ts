import { createSupabaseAdminClient } from '@/lib/supabase/server';
import type { BlogArticle } from '@/lib/types';

export async function getPublishedArticles(): Promise<BlogArticle[]> {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('statut', 'publie')
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
    .maybeSingle();
  return (data as BlogArticle) ?? null;
}
