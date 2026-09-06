import { getPublicContent } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { LigneActu } from '@/components/sections/LigneActu';
import { Prestations } from '@/components/sections/Prestations';
import { AvantApresPhotos } from '@/components/sections/AvantApresSlider';
import { AvantApresVideos } from '@/components/sections/AvantApresVideos';
import { CompteurRealisations } from '@/components/sections/CompteurRealisations';
import { AvisGoogle } from '@/components/sections/AvisGoogle';
import { ZoneIntervention } from '@/components/sections/ZoneIntervention';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { CookieBanner } from '@/components/sections/CookieBanner';

export const revalidate = 60;

export default async function HomePage() {
  const { settings, hero, ligneActu, prestations, photos, videos, faqItems } =
    await getPublicContent();

  return (
    <>
      <Header settings={settings} />
      <LigneActu ligneActu={ligneActu} />
      <main>
        <Hero hero={hero} />
        <Prestations prestations={prestations} />
        <AvantApresPhotos photos={photos} />
        <AvantApresVideos videos={videos} />
        <CompteurRealisations settings={settings} />
        <AvisGoogle settings={settings} />
        <ZoneIntervention settings={settings} />
        <FAQ items={faqItems} />
        <FinalCTA settings={settings} />
      </main>
      <Footer settings={settings} />
      <CookieBanner />
    </>
  );
}
