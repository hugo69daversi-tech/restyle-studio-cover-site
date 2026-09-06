# ReStyle Studio Cover — Site vitrine

Site public one-page + back-office admin, construit avec :
- **Next.js 14** (App Router) — pages publiques + back-office
- **Supabase** — base de données, authentification admin, stockage des images/vidéos
- **Netlify** — hébergement
- **Gmail SMTP** — envoi de l'email de contact aux commerciaux

Le site utilise son **propre projet Supabase**, complètement indépendant de celui du CRM.

---

## Étape 0 — Nettoyer le projet Supabase du CRM (si déjà fait par erreur)

Si tu as déjà exécuté `lib/schema.sql` dans le projet Supabase du CRM avant qu'on décide de
séparer les deux, annule ça d'abord :

1. Va sur [supabase.com](https://supabase.com) → ouvre le projet Supabase **du CRM**.
2. Menu de gauche → **SQL Editor** → **New query**.
3. Ouvre le fichier [`lib/schema-rollback.sql`](lib/schema-rollback.sql), copie tout son contenu,
   colle-le dans l'éditeur, puis clique **Run**.
4. Ça supprime les tables que le script du site avait créées (`site_settings`, `hero_content`,
   `ligne_actu`, `prestations`, `realisations_photos`, `realisations_videos`, `faq`, `contacts`)
   — **rien d'autre n'est touché**, aucune table ni donnée du CRM n'est affectée.
5. Le bucket de stockage `media` ne peut pas être supprimé par une requête SQL (Supabase bloque
   ça depuis peu). Supprime-le à la main : menu de gauche → **Storage** → clique sur `media` →
   bouton **Delete bucket** en haut à droite.

Si tu n'as encore rien exécuté sur le projet du CRM, passe directement à l'étape 1.

---

## Étape 1 — Créer un projet Supabase pour le site

1. Sur [supabase.com](https://supabase.com), connecte-toi (ou crée un compte gratuit).
2. Clique **New project**.
3. Nom : par exemple `restyle-studio-cover-site`. Choisis un mot de passe de base de données
   (à conserver de côté, tu n'en auras normalement pas besoin au quotidien) et une région proche
   (ex : Frankfurt/EU).
4. Attends 1-2 minutes que le projet soit prêt.

## Étape 2 — Créer les tables du site

1. Dans ce nouveau projet, menu de gauche → **SQL Editor** → **New query**.
2. Ouvre le fichier [`lib/schema.sql`](lib/schema.sql) de ce dossier, copie tout son contenu,
   colle-le dans l'éditeur Supabase.
3. Clique **Run**. Ça crée toutes les tables du site, active la sécurité (RLS), et crée le bucket
   de stockage `media` pour les photos/vidéos.

## Étape 3 — Créer ton compte admin

1. Menu de gauche → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Renseigne ton email et un mot de passe (celui avec lequel tu te connecteras à `/admin`).
3. Décoche "Auto Confirm User" seulement si tu veux confirmer par email — sinon laisse coché pour
   pouvoir te connecter tout de suite.

## Étape 4 — Récupérer les clés Supabase

1. Menu de gauche → **Project Settings** (icône ⚙️ en bas) → **API**.
2. Note ces 3 valeurs, tu en auras besoin à l'étape 7 :
   - **Project URL**
   - **anon public** (clé publique)
   - **service_role** (clé secrète — ne jamais la partager ni la mettre dans du code visible)

---

## Étape 5 — Configurer l'envoi d'email (Gmail)

1. Connecte-toi sur le compte Google `ReStyleStudioCover@gmail.com`.
2. Va sur [myaccount.google.com/security](https://myaccount.google.com/security).
3. Active la **validation en 2 étapes** si ce n'est pas déjà fait (obligatoire pour l'étape
   suivante).
4. Cherche **"Mots de passe des applications"** (ou va directement sur
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
5. Crée un mot de passe d'application (nom libre, ex : "Site ReStyle"). Google affiche un code à
   16 caractères — copie-le, il ne sera plus jamais réaffiché.

---

## Étape 6 — Installer Node.js (si pas déjà fait)

Ouvre un terminal et tape :

```bash
node -v
```

Si tu as une erreur "commande introuvable" : télécharge et installe la version **LTS** depuis
[nodejs.org](https://nodejs.org), puis relance ton terminal et refais `node -v` pour vérifier.

## Étape 7 — Configurer le projet

1. Ouvre un terminal dans ce dossier (`ReStyleStudioCover-Site`).
2. Installe les dépendances :

```bash
npm install
```

3. Copie le fichier d'exemple des variables d'environnement :

```bash
cp .env.example .env.local
```

4. Ouvre `.env.local` dans un éditeur de texte et remplis chaque valeur avec ce que tu as
   récupéré aux étapes précédentes :

| Variable | Où la trouver |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Étape 4 — Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Étape 4 — anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Étape 4 — service_role |
| `GMAIL_USER` | `ReStyleStudioCover@gmail.com` |
| `GMAIL_APP_PASSWORD` | Étape 5 — le code à 16 caractères |
| `CONTACT_RECIPIENTS` | Email(s) des commerciaux à notifier, séparés par des virgules |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` pour l'instant (à changer plus tard) |

## Étape 8 — Lancer le site en local pour tester

```bash
npm run dev
```

- Site public : [http://localhost:3000](http://localhost:3000)
- Back-office : [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — connecte-toi
  avec le compte créé à l'étape 3.

Vérifie que : le formulaire de contact t'envoie bien un email, et que modifier un texte dans
l'admin (ex : "Ligne actu") le met bien à jour sur la page publique après rechargement.

---

## Étape 9 — Mettre le code sur GitHub

Netlify a besoin d'un dépôt Git pour déployer automatiquement.

1. Crée un compte sur [github.com](https://github.com) si tu n'en as pas.
2. Crée un nouveau dépôt (par exemple `restyle-studio-cover-site`), vide, sans README.
3. Dans le terminal, toujours dans ce dossier :

```bash
git init
git add -A
git commit -m "Site vitrine ReStyle Studio Cover"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/restyle-studio-cover-site.git
git push -u origin main
```

(Remplace l'URL par celle de ton dépôt GitHub.)

## Étape 10 — Déployer sur Netlify

1. Va sur [app.netlify.com](https://app.netlify.com), connecte-toi.
2. **Add new site** → **Import an existing project** → choisis **GitHub** → sélectionne le dépôt
   créé à l'étape 9.
3. Netlify détecte Next.js automatiquement (grâce à `@netlify/plugin-nextjs`) — laisse les
   réglages de build par défaut.
4. Avant de cliquer "Deploy", va dans **Add environment variables** et ajoute exactement les
   mêmes variables que dans ton `.env.local` (sauf `NEXT_PUBLIC_SITE_URL`, à mettre à l'adresse
   Netlify provisoire pour l'instant, ex : `https://ton-site.netlify.app`).
5. Clique **Deploy site**. Au bout de 1-2 minutes, le site est en ligne sur une adresse en
   `.netlify.app`.

## Étape 11 — Rattacher le nom de domaine

1. Réserve `restylestudiocover.fr` et/ou `.com` chez un registrar (OVH, Gandi...) si ce n'est pas
   déjà fait.
2. Dans Netlify : **Site settings** → **Domain management** → **Add a domain**.
3. Suis les instructions Netlify pour pointer ton domaine (soit en transférant les DNS chez
   Netlify, soit en ajoutant les enregistrements indiqués chez ton registrar).
4. Une fois le domaine actif, mets à jour la variable `NEXT_PUBLIC_SITE_URL` dans Netlify avec
   l'adresse finale (ex : `https://www.restylestudiocover.fr`), puis redéploie (**Deploys** →
   **Trigger deploy**).
5. Le HTTPS est automatique sur Netlify — vérifie juste le petit cadenas dans le navigateur une
   fois le domaine branché.

---

## Étape 12 — Après la mise en ligne

- **Google Search Console** : va sur [search.google.com/search-console](https://search.google.com/search-console),
  ajoute ton domaine, puis soumets `https://ton-domaine/sitemap.xml` dans la section Sitemaps.
- **Mentions légales** : complète les champs `[À COMPLÉTER]` dans
  [`app/mentions-legales/page.tsx`](app/mentions-legales/page.tsx) (capital social, adresse du
  siège, SIRET/RCS, TVA intracommunautaire).
- **Logo / visuels** : quand tu as les fichiers de marque définitifs, remplace le monogramme
  placeholder (`components/ui/Logo.tsx` et `app/icon.svg`) par tes vrais visuels.
- **Google Business Profile** : crée/optimise la fiche (nom "ReStyle Studio SARL", photos,
  horaires, zone) — elle alimentera le futur module Avis Google.
- **Avis Google / Compteur de réalisations** : restent désactivés par défaut. Active-les depuis
  `/admin/avis` et `/admin/compteur` le moment venu (avis dispo, ou après 20-30 chantiers).

---

## Utiliser le back-office au quotidien

Une fois connecté sur `/admin`, chaque section du site a sa propre page :

| Page admin | Modifie |
|---|---|
| Qui sommes-nous | Titre, devise, texte de présentation |
| Ligne actu | Bandeau ponctuel en haut du site |
| Prestations | Les 4 piliers de la marque |
| Réalisations photos | Avant/après avec slider (upload direct des photos) |
| Réalisations vidéos | Vidéos avant/après (upload ou lien externe) |
| FAQ | Questions fréquentes |
| Avis Google | Active/désactive le module + lien vers la fiche Google |
| Compteur | Active/désactive + fixe le nombre de chantiers affiché |
| Paramètres | Téléphone, email, zone, villes, horaires, réseaux sociaux |

Toute modification est visible sur le site public en moins d'une minute, sans redéploiement.

---

## En cas de souci

- **Le site ne démarre pas en local** : vérifie que `.env.local` existe et que toutes ses valeurs
  sont remplies (pas de `xxx` restant).
- **Le formulaire de contact n'envoie pas d'email** : vérifie `GMAIL_APP_PASSWORD` (pas le mot de
  passe normal du compte Google, un mot de passe d'application dédié) et que la validation en 2
  étapes est bien active sur le compte Gmail.
- **Impossible de se connecter à `/admin`** : vérifie que l'utilisateur existe bien dans
  Authentication → Users du projet Supabase **du site** (pas celui du CRM), et que son email est
  confirmé.
