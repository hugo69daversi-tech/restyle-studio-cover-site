import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getPublicContent } from '@/lib/content';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.restylestudiocover.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ReStyle Studio Cover — Covering & rénovation intérieure en Moselle & Luxembourg',
    template: '%s | ReStyle Studio Cover',
  },
  description:
    "Covering architectural d'intérieur : cuisines, meubles, salles de bain, murs, et film vitrage bâtiment. Rénovation sur-mesure, sans travaux lourds, en Moselle et au Luxembourg.",
  keywords: [
    'covering cuisine',
    'renovation cuisine sans travaux',
    'covering meuble sur mesure',
    'film solaire vitrage professionnel',
    'renovation interieure Moselle',
    'covering Metz',
    'covering Thionville',
    'covering Luxembourg',
  ],
  openGraph: {
    title: 'ReStyle Studio Cover — Covering & rénovation intérieure',
    description:
      'Transformez vos cuisines, meubles et intérieurs sans travaux lourds. Devis gratuit en Moselle & Luxembourg.',
    url: siteUrl,
    siteName: 'ReStyle Studio Cover',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getPublicContent();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ReStyle Studio SARL',
    alternateName: 'ReStyle Studio Cover',
    description:
      "Covering architectural d'intérieur (cuisines, meubles, salles de bain, murs) et film vitrage bâtiment.",
    telephone: settings?.telephone || '+33 7 85 96 53 47',
    email: settings?.email || 'ReStyleStudioCover@gmail.com',
    areaServed: ['Moselle', 'Luxembourg', 'Metz', 'Thionville'],
    url: siteUrl,
    sameAs: [settings?.instagram_url, settings?.facebook_url, settings?.tiktok_url].filter(Boolean),
  };

  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
