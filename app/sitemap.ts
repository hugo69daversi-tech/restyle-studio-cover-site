import type { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.restylestudiocover.com';
  const articles = await getPublishedArticles();

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.published_at ? new Date(article.published_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
