import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slugify';

const TARGET_BUFFER = 12;

function checkAuth(request: Request): boolean {
  const header = request.headers.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '');
  return Boolean(process.env.BLOG_AUTOMATION_TOKEN) && token === process.env.BLOG_AUTOMATION_TOKEN;
}

async function getPipelineCount() {
  const supabase = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();

  const [brouillons, planifies] = await Promise.all([
    supabase.from('blog_articles').select('id', { count: 'exact', head: true }).eq('statut', 'brouillon'),
    supabase
      .from('blog_articles')
      .select('id', { count: 'exact', head: true })
      .eq('statut', 'publie')
      .gt('published_at', nowIso),
  ]);

  return (brouillons.count ?? 0) + (planifies.count ?? 0);
}

// GET : indique combien d'articles il manque pour atteindre le tampon cible (12).
export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const current = await getPipelineCount();
  const needed = Math.max(0, TARGET_BUFFER - current);

  return NextResponse.json({ current, target: TARGET_BUFFER, needed });
}

const articleSchema = z.object({
  titre: z.string().min(5).max(200),
  extrait: z.string().min(20).max(300),
  contenu: z.string().min(200),
  mot_cle_cible: z.string().max(100).optional().default(''),
  slug: z.string().max(100).optional(),
});

const bodySchema = z.object({
  articles: z.array(articleSchema).min(1).max(20),
});

// POST : insere les articles fournis en brouillon, sans jamais depasser le
// tampon cible (12) meme si l'appelant en envoie davantage.
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload invalide', details: parsed.error.flatten() }, { status: 400 });
  }

  const current = await getPipelineCount();
  const slotsLeft = Math.max(0, TARGET_BUFFER - current);
  const toInsert = parsed.data.articles.slice(0, slotsLeft);

  if (toInsert.length === 0) {
    return NextResponse.json({ inserted: 0, message: 'Tampon déjà plein (12 articles en attente).' });
  }

  const supabase = createSupabaseAdminClient();
  const { data: existingRows } = await supabase.from('blog_articles').select('slug');
  const usedSlugs = new Set((existingRows ?? []).map((r) => r.slug as string));
  const rows = [];

  for (const article of toInsert) {
    let slug = slugify(article.slug || article.titre) || `article-${Date.now()}`;
    while (usedSlugs.has(slug)) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    usedSlugs.add(slug);

    rows.push({
      slug,
      titre: article.titre,
      extrait: article.extrait,
      contenu: article.contenu,
      mot_cle_cible: article.mot_cle_cible || '',
      statut: 'brouillon' as const,
    });
  }

  const { data, error } = await supabase.from('blog_articles').insert(rows).select('slug, titre');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: data.length, articles: data });
}
