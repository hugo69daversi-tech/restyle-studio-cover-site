import { createSupabaseAdminClient } from '@/lib/supabase/server';
import type {
  SiteSettings,
  HeroContent,
  LigneActu,
  Prestation,
  RealisationPhoto,
  RealisationVideo,
  FaqItem,
} from '@/lib/types';

/**
 * Lecture groupee de tout le contenu public pour la page one-page.
 * Utilise la cle service_role cote serveur pour eviter tout probleme de RLS
 * (les policies publiques limitent deja aux lignes "publie = true").
 */
export async function getPublicContent() {
  const supabase = createSupabaseAdminClient();

  const [settings, hero, ligneActu, prestations, photos, videos, faqItems] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('hero_content').select('*').eq('id', 1).single(),
    supabase.from('ligne_actu').select('*').eq('id', 1).single(),
    supabase.from('prestations').select('*').eq('publie', true).order('ordre'),
    supabase.from('realisations_photos').select('*').eq('publie', true).order('ordre'),
    supabase.from('realisations_videos').select('*').eq('publie', true).order('ordre'),
    supabase.from('faq').select('*').eq('publie', true).order('ordre'),
  ]);

  return {
    settings: settings.data as SiteSettings | null,
    hero: hero.data as HeroContent | null,
    ligneActu: ligneActu.data as LigneActu | null,
    prestations: (prestations.data ?? []) as Prestation[],
    photos: (photos.data ?? []) as RealisationPhoto[],
    videos: (videos.data ?? []) as RealisationVideo[],
    faqItems: (faqItems.data ?? []) as FaqItem[],
  };
}

export type PublicContent = Awaited<ReturnType<typeof getPublicContent>>;
