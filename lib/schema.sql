-- ReStyle Studio Cover - site vitrine
-- Tables dediees au site, independantes du CRM. A executer dans Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- Reglages generaux (ligne unique, id fixe)
create table if not exists site_settings (
  id int primary key default 1,
  telephone text not null default '+33 7 85 96 53 47',
  email text not null default 'ReStyleStudioCover@gmail.com',
  zone_intervention text not null default 'Moselle & Luxembourg',
  villes text not null default 'Metz, Thionville, Moselle, Luxembourg',
  horaires text not null default 'Du lundi au vendredi, 9h - 18h',
  instagram_url text default 'https://instagram.com/ReStyleStudio.cover',
  facebook_url text default '',
  avis_google_actif boolean not null default false,
  avis_google_lien text default '',
  compteur_actif boolean not null default false,
  compteur_valeur int not null default 0,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- Section "Qui sommes-nous"
create table if not exists hero_content (
  id int primary key default 1,
  titre text not null default 'ReStyle Studio Cover',
  devise text not null default 'PRECISION. INNOVATION. TRANSFORMATION.',
  texte text not null default 'ReStyle Studio Cover transforme vos cuisines, meubles, salles de bain et interieurs grace au covering architectural haut de gamme.',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into hero_content (id) values (1) on conflict (id) do nothing;

-- Ligne actu (bandeau ponctuel)
create table if not exists ligne_actu (
  id int primary key default 1,
  texte text not null default 'L''ete arrive, preparez-vous avec nos films solaires pour vitrages.',
  actif boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into ligne_actu (id) values (1) on conflict (id) do nothing;

-- Prestations (4 piliers)
create table if not exists prestations (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text not null,
  icone text not null default 'sparkles',
  ordre int not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now()
);

-- Realisations avant/apres - photos (slider)
create table if not exists realisations_photos (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  photo_avant_url text not null,
  photo_apres_url text not null,
  texte_alt text not null default '',
  ordre int not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now()
);

-- Realisations avant/apres - videos (defilement simple)
create table if not exists realisations_videos (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  video_url text not null,
  texte_alt text not null default '',
  ordre int not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now()
);

-- FAQ
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  reponse text not null,
  ordre int not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now()
);

-- Sauvegarde optionnelle des demandes de contact (en plus de l'email envoye aux commerciaux)
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  adresse text,
  telephone text,
  email text,
  creneau text,
  message text,
  consentement boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS : lecture publique des contenus publies, aucune ecriture cote client (tout passe par server actions avec la cle service_role)
alter table site_settings enable row level security;
alter table hero_content enable row level security;
alter table ligne_actu enable row level security;
alter table prestations enable row level security;
alter table realisations_photos enable row level security;
alter table realisations_videos enable row level security;
alter table faq enable row level security;
alter table contacts enable row level security;

create policy "lecture publique site_settings" on site_settings for select using (true);
create policy "lecture publique hero_content" on hero_content for select using (true);
create policy "lecture publique ligne_actu" on ligne_actu for select using (true);
create policy "lecture publique prestations" on prestations for select using (publie = true);
create policy "lecture publique realisations_photos" on realisations_photos for select using (publie = true);
create policy "lecture publique realisations_videos" on realisations_videos for select using (publie = true);
create policy "lecture publique faq" on faq for select using (publie = true);
-- Pas de policy select/insert sur "contacts" pour le role anon : uniquement accessible via la cle service_role cote serveur.

-- Storage : bucket public pour les images/videos des realisations
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "lecture publique bucket media" on storage.objects for select using (bucket_id = 'media');
