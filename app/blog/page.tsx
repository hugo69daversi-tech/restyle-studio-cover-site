import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/blog';
import { getPublicContent } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog covering & rénovation intérieure',
  description:
    'Conseils, retours de chantier et réponses aux questions fréquentes sur le covering architectural, la rénovation de cuisine et le film vitrage, par ReStyle Studio en Moselle et au Luxembourg.',
};

export default async function BlogIndexPage() {
  const [articles, { settings }] = await Promise.all([getPublishedArticles(), getPublicContent()]);

  return (
    <>
      <Header settings={settings} />
      <main className="section-container max-w-4xl">
        <h1 className="text-3xl font-bold md:text-4xl">
          Le <span className="text-gradient">blog</span> ReStyle Studio
        </h1>
        <p className="mt-4 text-brand-cream/70">
          Covering architectural, rénovation de cuisine et de mobilier, film vitrage : conseils et
          retours de chantier en Moselle et au Luxembourg.
        </p>

        {articles.length === 0 ? (
          <p className="mt-10 text-brand-cream/50">Les premiers articles arrivent très bientôt.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="card block hover:border-brand-pink/50">
                <h2 className="text-xl font-semibold">{article.titre}</h2>
                <p className="mt-2 text-sm text-brand-cream/70">{article.extrait}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
