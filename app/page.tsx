import { getPublicContent } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { LigneActu } from '@/components/sections/LigneActu';
import { Prestations } from '@/components/sections/Prestations';
import { AvantApresPhotos } from '@/components/sections/AvantApresSlider';
import { AvantApresVideos } from '@/components/sections/AvantApresVideos';
import { CtaBand } from '@/components/sections/CtaBand';
import { QuiSommesNous } from '@/components/sections/QuiSommesNous';
import { CompteurRealisations } from '@/components/sections/CompteurRealisations';
import { AvisGoogle } from '@/components/sections/AvisGoogle';
import { ZoneIntervention } from '@/components/sections/ZoneIntervention';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { CookieBanner } from '@/components/sections/CookieBanner';
import { DevisWizard } from '@/components/sections/DevisWizard';
import { MobileCtaBar } from '@/components/sections/MobileCtaBar';

export const revalidate = 60;

export default async function HomePage() {
  const { settings, hero, ligneActu, prestations, photos, videos, faqItems } =
    await getPublicContent();

  return (
    <>
      <Header settings={settings} />
      <LigneActu ligneActu={ligneActu} />
      <main>
        <Hero />
        <AvantApresPhotos photos={photos} />
        <CtaBand titre="Et si c'était votre cuisine ?" />
        <Prestations prestations={prestations} />
        <AvantApresVideos videos={videos} />
        <CtaBand titre="Un projet en tête ? Estimez-le en 1 minute." />
        <QuiSommesNous hero={hero} />
        <CompteurRealisations settings={settings} />
        <AvisGoogle settings={settings} />
        <ZoneIntervention settings={settings} />
        <FAQ items={faqItems} />
        <FinalCTA settings={settings} />
      </main>
      <Footer settings={settings} />
      <MobileCtaBar phone={settings?.telephone || '+33 7 85 96 53 47'} />
      <DevisWizard />
      <CookieBanner />
    </>
  );
}
