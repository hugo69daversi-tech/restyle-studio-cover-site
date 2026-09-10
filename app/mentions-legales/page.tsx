import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de ReStyle Studio.',
};

export default async function MentionsLegalesPage() {
  const { settings } = await getPublicContent();

  return (
    <main className="section-container prose prose-invert max-w-3xl">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        ReStyle Studio SARL — société en cours d&apos;immatriculation
        <br />
        Forme juridique : SARL
        <br />
        Capital social : 5 000 €
        <br />
        Siège social : 6 Domaine des Coteaux, 57925 Distroff
        <br />
        RCS : en cours d&apos;immatriculation
        <br />
        SIRET : en cours d&apos;attribution
        <br />
        TVA intracommunautaire : en cours d&apos;attribution
        <br />
        Directeur de la publication : Hugo D&apos;aversi, Gérant
        <br />
        Téléphone : {settings?.telephone || '+33 7 85 96 53 47'}
        <br />
        Email : {settings?.email || 'ReStyleStudioCover@gmail.com'}
      </p>
      <p className="text-sm text-brand-cream/60">
        La société ReStyle Studio étant en cours de constitution, les numéros RCS, SIRET et de TVA
        intracommunautaire seront complétés dès leur attribution.
      </p>

      <h2>Hébergement</h2>
      <p>
        Netlify, Inc.
        <br />
        2325 3rd Street, Suite 296, San Francisco, California 94107, États-Unis
        <br />
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          www.netlify.com
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images, logo, vidéos) est la
        propriété de ReStyle Studio SARL, sauf mention contraire, et ne peut être reproduit sans
        autorisation préalable.
      </p>
    </main>
  );
}
