import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles } from '@/lib/blog';
import { getPublicContent } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.titre,
    description: article.extrait,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.titre,
      description: article.extrait,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, { settings }] = await Promise.all([getArticleBySlug(slug), getPublicContent()]);

  if (!article) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.restylestudiocover.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.extrait,
    datePublished: article.published_at,
    author: { '@type': 'Organization', name: 'ReStyle Studio SARL' },
    publisher: { '@type': 'Organization', name: 'ReStyle Studio SARL' },
    mainEntityOfPage: `${siteUrl}/blog/${article.slug}`,
  };

  return (
    <>
      <Header settings={settings} />
      <main className="section-container max-w-3xl">
        <Link href="/blog" className="text-sm text-brand-cream/60 hover:text-brand-cream">
          ← Retour au blog
        </Link>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{article.titre}</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          {article.contenu.split(/\n{2,}/).map((bloc, index) =>
            bloc.startsWith('## ') ? (
              <h2 key={index}>{bloc.replace(/^##\s*/, '')}</h2>
            ) : (
              <p key={index}>{bloc}</p>
            )
          )}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="font-semibold">Un projet de covering ou de rénovation en tête ?</p>
          <Link href="/#contact" className="btn-primary mt-4 inline-flex">
            Demander votre étude gratuite
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
