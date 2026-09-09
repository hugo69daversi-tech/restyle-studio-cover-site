export interface SiteSettings {
  id: 1;
  telephone: string;
  email: string;
  zone_intervention: string;
  villes: string;
  horaires: string;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  avis_google_actif: boolean;
  avis_google_lien: string | null;
  compteur_actif: boolean;
  compteur_valeur: number;
}

export interface HeroContent {
  id: 1;
  titre: string;
  devise: string;
  texte: string;
}

export interface LigneActu {
  id: 1;
  texte: string;
  actif: boolean;
}

export interface Prestation {
  id: string;
  titre: string;
  description: string;
  icone: string;
  ordre: number;
  publie: boolean;
}

export interface RealisationPhoto {
  id: string;
  titre: string;
  photo_avant_url: string;
  photo_apres_url: string;
  texte_alt: string;
  ordre: number;
  publie: boolean;
}

export interface RealisationVideo {
  id: string;
  titre: string;
  video_url: string;
  texte_alt: string;
  ordre: number;
  publie: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  reponse: string;
  ordre: number;
  publie: boolean;
}

export type BlogStatut = 'brouillon' | 'publie' | 'rejete';

export interface BlogArticle {
  id: string;
  slug: string;
  titre: string;
  extrait: string;
  contenu: string;
  mot_cle_cible: string;
  statut: BlogStatut;
  created_at: string;
  published_at: string | null;
}
