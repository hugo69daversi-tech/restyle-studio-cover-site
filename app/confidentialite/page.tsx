import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: "Politique de confidentialité et RGPD de ReStyle Studio Cover.",
};

export default async function ConfidentialitePage() {
  const { settings } = await getPublicContent();
  const email = settings?.email || 'ReStyleStudioCover@gmail.com';

  return (
    <main className="section-container prose prose-invert max-w-3xl">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>

      <h2>Données collectées</h2>
      <p>
        Lorsque vous utilisez le formulaire de contact, nous collectons : nom/prénom, adresse,
        téléphone et/ou email, créneau de rappel préféré, et le message libre que vous nous
        transmettez.
      </p>

      <h2>Finalité</h2>
      <p>
        Ces données sont utilisées exclusivement pour vous recontacter afin d&apos;organiser un
        rendez-vous et établir un devis. Elles ne sont ni revendues, ni transmises à des tiers.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées pendant une durée maximale de 3 ans à compter de notre dernier
        contact, sauf demande de suppression anticipée de votre part.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de
        suppression de vos données. Pour exercer ces droits, contactez-nous à{' '}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site peut utiliser des cookies de mesure d&apos;audience (statistiques de visite). Vous
        pouvez accepter ou refuser ces cookies via le bandeau affiché lors de votre première
        visite. Les cookies strictement nécessaires au fonctionnement du site ne sont pas soumis à
        consentement.
      </p>
    </main>
  );
}
