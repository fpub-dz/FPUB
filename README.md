# FPUB — Site vitrine

Page d'accueil de l'agence **FPUB** (Digital Transformation · AI · Marketing), construite selon le système de design **Lumina Noir** : fond obsidian, accent lime, glassmorphism, typographies Hanken Grotesk / Inter / Geist (+ Cairo pour l'arabe), et un fond animé en WebGL (shader).

Le site est **multilingue (EN / FR / AR)** avec bascule RTL automatique pour l'arabe, et le formulaire de contact est **connecté à Supabase**.

## Structure du projet

```
fpub-site/
├── index.html          # page unique : nav, hero, process, story, équipe, FAQ, contact, footer
├── css/
│   └── style.css        # tous les styles (variables de design, composants, responsive, RTL)
├── js/
│   ├── main.js           # animation du shader WebGL en arrière-plan
│   ├── i18n.js            # dictionnaire de traductions EN/FR/AR + bascule RTL
│   └── contact.js         # envoi du formulaire de contact vers Supabase
├── supabase/
│   └── schema.sql          # script SQL à exécuter une fois dans Supabase
└── README.md
```

Aucune dépendance de build : c'est du HTML/CSS/JS statique. Les polices sont chargées via Google Fonts et Fontshare (CDN), donc une connexion internet est nécessaire à l'affichage.

## Prévisualiser en local

```bash
cd fpub-site
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

## Déployer sur GitHub Pages

1. Créez un nouveau dépôt sur GitHub (par ex. `fpub-site`).
2. Poussez ce dossier tel quel :
   ```bash
   cd fpub-site
   git init
   git add .
   git commit -m "Initial commit — site FPUB"
   git branch -M main
   git remote add origin https://github.com/<votre-utilisateur>/fpub-site.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages**.
4. Sous "Build and deployment", choisissez **Source: Deploy from a branch**, puis **Branch: main** et le dossier **/ (root)**.
5. Le site sera publié après quelques minutes à l'adresse :
   `https://<votre-utilisateur>.github.io/fpub-site/`

## Connexion Supabase (contact + services + réalisations)

Le site est branché sur Supabase à trois endroits, avec la clé publique **anon** déjà intégrée dans `js/contact.js` et `js/data.js` :

- Projet : `lckckfslwvaoyrwtrbhu`
- URL : `https://lckckfslwvaoyrwtrbhu.supabase.co`

**Étape obligatoire avant que le site fonctionne pleinement** : ouvrez votre tableau de bord Supabase → **SQL Editor** → **New query** → collez tout le contenu de [`supabase/schema.sql`](./supabase/schema.sql) → **Run**. Ce script crée trois tables et leurs règles de sécurité (RLS) :

> **Pourquoi le préfixe `fpub_` ?** Votre projet Supabase contient déjà d'autres tables (par ex. `services`, liée à une table `orders` par une clé étrangère, issues d'une autre application). Réutiliser ou vider ces tables aurait risqué de casser cette autre application. Toutes les tables du site FPUB sont donc préfixées `fpub_` pour ne jamais entrer en conflit avec l'existant.

| Table | Utilisée par | Droit accordé au rôle public `anon` | Contenu |
|---|---|---|---|
| `fpub_contact_submissions` | Formulaire "Get in Touch" (`js/contact.js`) | **Insertion uniquement** — personne ne peut lire les messages avec la clé publique | vide au départ, se remplit à chaque envoi du formulaire |
| `fpub_services` | Section "What We Do" (`js/data.js`) | **Lecture uniquement** | pré-rempli avec ~29 services répartis en 4 catégories (Marketing, Web & E-commerce, Créa, Innovation digitale) |
| `fpub_projects` | Section "Selected Work" (`js/data.js`) | **Lecture uniquement** | pré-rempli avec 3 études de cas d'exemple |

Le script utilise `truncate` + `insert` sur `fpub_services` et `fpub_projects` : vous pouvez le ré-exécuter à tout moment pour réinitialiser ces données d'exemple.

Pour **modifier ou ajouter vos vrais services et projets**, deux options :
1. Depuis le tableau de bord Supabase → **Table Editor** → table `fpub_services` ou `fpub_projects` → ajoutez/éditez des lignes directement (aucune connaissance SQL nécessaire).
2. Ou en ré-exécutant une variante du bloc `insert into ...` du script.

Le site relit ces tables à chaque chargement de page — pas besoin de republier le site après une modification dans Supabase, seulement de rafraîchir la page.

La clé `anon` est faite pour être visible côté client (c'est son rôle) — la sécurité vient des politiques RLS ci-dessus, pas du secret de la clé. Ne mettez jamais la clé `service_role` dans le code du site.

### Canaux de contact (WhatsApp / Messenger / Instagram / Facebook)

Les boutons de la section contact pointent actuellement vers des liens de démonstration (`wa.me/15551234567`, `fpub.agency` sur Instagram/Facebook/Messenger). Remplacez-les par vos vrais comptes dans `index.html` (recherchez `channel-btn`) — sinon ils ouvriront des comptes qui n'existent pas.

## Multilingue (EN / FR / AR)

Un sélecteur **EN | FR | AR** est disponible dans la barre de navigation. Cliquer dessus :
- traduit tout le texte du site instantanément (`js/i18n.js`) ;
- passe automatiquement la page en RTL (`dir="rtl"`) et charge la police Cairo pour l'arabe ;
- mémorise le choix dans le navigateur (`localStorage`) pour la prochaine visite.

Pour modifier ou ajouter du texte traduit : tout le contenu textuel est centralisé dans l'objet `translations` en haut de `js/i18n.js`, organisé par section (`hero`, `process`, `story`, `contact`, `footer`, ...). Chaque élément HTML traduisible porte un attribut `data-i18n="section.cle"` (ou `data-i18n-html` / `data-i18n-placeholder`) qui pointe vers cette clé.

## Personnalisation

- **Couleurs / typographies / espacements** : variables CSS en haut de `css/style.css` (`:root { ... }`), dérivées de `DESIGN.md`.
- **Images** : les photos (équipe, étapes du process, culture d'agence) sont actuellement des images libres de droits (Unsplash) en attendant vos propres visuels.
- **Coordonnées de contact** : l'email, le téléphone et l'adresse affichés dans la section "Get in Touch" sont des exemples — remplacez-les par vos vraies coordonnées dans `index.html`.

## Pistes d'amélioration (suggestions)

Quelques idées pour faire évoluer le site plus tard :

1. **Pages dédiées** : construire les pages "Services", "Work / Case Studies" et "Agency" vues dans les captures d'écran d'origine (actuellement condensées dans la page unique).
2. **Notification email** : brancher une Supabase Edge Function (ou Zapier/Make) déclenchée à l'insertion pour vous envoyer un e-mail à chaque nouvelle demande de contact.
3. **Anti-spam** : ajouter un champ "honeypot" caché ou un reCAPTCHA/Turnstile avant l'envoi du formulaire.
4. **Portfolio dynamique** : stocker les études de cas dans Supabase (au lieu du HTML statique) pour les gérer sans toucher au code.
5. **Blog / Intelligence** : la section "Intelligence" vue dans les captures (articles Marketing, IA, Branding...) pourrait être une vraie table Supabase + une page de liste.
6. **SEO** : ajouter des meta tags Open Graph, un `sitemap.xml`, un `robots.txt` et des données structurées (JSON-LD) pour l'agence.
7. **Analytics** : brancher Plausible ou Google Analytics pour suivre le trafic une fois en ligne.
8. **RTL avancé** : le mode arabe traduit et passe en RTL tout le texte ; la ligne du temps "Our Process" pourrait être affinée pour mieux inverser visuellement l'alternance gauche/droite.
9. **Accessibilité** : audits Lighthouse/axe pour vérifier les contrastes, l'ordre de tabulation et les libellés ARIA sur le formulaire.
10. **Domaine personnalisé** : une fois sur GitHub Pages, vous pouvez brancher un nom de domaine (ex. `fpub.agency`) depuis Settings → Pages → Custom domain.
