# 📻 SHIMA FM 95.9 — SITE WEB OFFICIEL & PORTAIL MÉDIA

**Nom :** Radio Shima FM  
**Fréquence :** 95.9 FM  
**Domaine :** shimafm.org  
**Pays :** Burundi 🇧🇮 (Rumonge, Burunga)  
**Slogan :** « Ijambo kuri bose »  
**Positionnement :** Radio en direct + Actualités + Culture + Musique + Société + Sports

---

## 🌟 Fonctionnalités Implémentées

1. **🔴 Lecteur Radio en Direct (95.9 FM) :**
   - Lecteur audio fixe en bas d'écran avec play/pause, gestion du volume, mute et statut live.
   - Égaliseur animé synchronisé.
   - Synthétiseur audio Web Audio API en démonstration si l'URL de flux n'est pas encore renseignée.
   - Emplacement dédié pour votre serveur Icecast / Shoutcast (`RADIO_STREAM_URL`).

2. **📰 Journalisme & Fil d'Actualité :**
   - **Section Hero :** 1 grand article à la une + 3 articles secondaires en vitrine.
   - **Dernières actualités :** Affichage chronologique avec pagination active (`1 2 3 4 5 →`).
   - **Pages thématiques complètes :**
     - `/burundi` (Filtres interactifs par province : Bujumbura, Gitega, Rumonge, Ngozi, etc.).
     - `/societe` (Éducation, Santé, Jeunesse, Environnement).
     - `/politique` (Institutions, Parlement, Gouvernement).
     - `/economie` (Café & thé, Entrepreneuriat, Commerce).
     - `/culture` (Tambours de Gishora, Patrimoine, Arts).
     - `/sports` (Primus Ligue, Résultats, Classement officiel, Calendrier des matchs).
     - `/videos` (SHIMA TV, lecteur vidéo intégré avec reportages et interviews).
     - `/emissions` (Grille complète des programmes du Lundi au Dimanche 24h/24).
     - `/animateurs` (Fiches journalistes et animateurs vedettes).
     - `/article/:slug` (Page article complet, boutons de partage WhatsApp/Facebook/X, temps de lecture, commentaires).
     - `/recherche` (Moteur de recherche temps réel par mots-clés, rubriques et dates).
     - `/a-propos` (Histoire, mission, vision, valeurs et couverture).
     - `/contact` (Coordonnées du studio, WhatsApp auditeurs, régie pub et formulaire).
     - `/admin` (Backoffice de rédaction : publication instantanée d'articles et statistiques).

3. **📢 Monétisation & Espaces Publicitaires :**
   - Formats standards intégrés : 728x90 (Leaderboard) et 300x250 (Pavé sidebar).

4. **🚀 Prêt pour Hébergement cPanel (Bouton d'export ZIP) :**
   - Un bouton dans le pied de page permet de télécharger instantanément une archive ZIP complète (`SHIMA_FM_95.9_cPanel_Package.zip`) contenant tous les fichiers HTML, CSS, JavaScript, `.htaccess`, `sitemap.xml` et `robots.txt`.

---

## 📡 Configuration du Flux Radio (Icecast / Shoutcast)

Le flux direct en direct est configuré sur :
`/src/data/mockData.ts`

```typescript
export const RADIO_STREAM_URL: string = "http://5.189.189.39:8000/shimafm.mp3";
```

---

## 🌐 Déploiement sur Hébergement Web cPanel

1. **Via le générateur d'archive inclus dans le site :**
   - Cliquez sur **« Pack ZIP prêt pour cPanel »** dans le pied de page du site.
   - Téléchargez le fichier `SHIMA_FM_95.9_cPanel_Package.zip`.
   - Connectez-vous à votre **cPanel** > **Gestionnaire de fichiers**.
   - Ouvrez le dossier `public_html/`.
   - Cliquez sur **Charger (Upload)** puis extrayez l'archive à la racine.

2. **Via compilation de production Vite :**
   ```bash
   npm run build
   ```
   - Le dossier généré `dist/` contient l'ensemble des fichiers prêts à être téléversés sur votre serveur web Apache, Nginx ou cPanel.

---

## 🔍 Référencement & Google News

- `robots.txt` : accessible à `/robots.txt`
- `sitemap.xml` : accessible à `/sitemap.xml`
- `rss.xml` : flux de syndication accessible à `/rss.xml`
- Données structurées Schema.org (`RadioStation`, `NewsMediaOrganization`, `WebSite`) configurées dans `index.html`.

© 2026 **SHIMA FM 95.9** (shimafm.org) — Burundi.
