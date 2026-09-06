-- ReStyle Studio Cover - annulation du script schema.sql
-- A executer dans le SQL Editor du projet Supabase du CRM, pour retirer les tables du
-- site qui y avaient ete creees par erreur. Sans danger pour le CRM : ne touche a
-- aucune table ni donnee du CRM lui-meme.

-- 1) Tables du site (cascade supprime aussi leurs policies RLS automatiquement)
drop table if exists contacts cascade;
drop table if exists faq cascade;
drop table if exists realisations_videos cascade;
drop table if exists realisations_photos cascade;
drop table if exists prestations cascade;
drop table if exists ligne_actu cascade;
drop table if exists hero_content cascade;
drop table if exists site_settings cascade;

-- 2) Policy de lecture publique sur le bucket "media" (metadonnee, suppression autorisee en SQL)
drop policy if exists "lecture publique bucket media" on storage.objects;

-- Note : l'extension "pgcrypto" n'est pas supprimee volontairement (elle etait tres
-- probablement deja utilisee par le CRM avant ce script, ou peut l'etre par d'autres
-- tables) - la laisser installee est sans consequence.

-- Le bucket de stockage "media" lui-meme NE PEUT PAS etre supprime par une requete SQL
-- (Supabase bloque les DELETE directs sur storage.objects/storage.buckets depuis une
-- mise a jour recente : "Direct deletion from storage tables is not allowed"). Pour le
-- supprimer, va dans le Dashboard Supabase du CRM > Storage > selectionne le bucket
-- "media" > Delete bucket (bouton en haut a droite). C'est l'etape manuelle qui remplace
-- les anciennes lignes "delete from storage.objects / storage.buckets" de ce script.
