import React, { useState } from 'react';
import { X, Download, CheckCircle, FolderArchive, FileCode, Server, Sparkles } from 'lucide-react';
import JSZip from 'jszip';

interface CPanelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CPanelExportModal: React.FC<CPanelExportModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const generateAndDownloadZip = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();

      // Readme for cPanel deployment
      const readmeContent = `# SHIMA FM 95.9 — PACK DE DÉPLOIEMENT CPANEL
Nom de domaine : shimafm.org
Fréquence : 95.9 FM Rumonge, Burunga, Burundi 🇧🇮
Slogan : « Ijambo kuri bose »

## GUIDE D'INSTALLATION SUR HÉBERGEMENT CPANEL / APACHE :

1. Connectez-vous à votre interface cPanel (ex: https://shimafm.org:2083)
2. Ouvrez le "Gestionnaire de fichiers" (File Manager).
3. Rendez-vous dans le dossier racine de votre site web :
   normalement \`public_html/\`
4. Cliquez sur "Charger" (Upload) et téléversez ce fichier ZIP.
5. Faites un clic droit sur le ZIP et choisissez "Extraire" (Extract).
6. Vérifiez que les fichiers suivants se trouvent bien à la racine :
   - index.html (Page d'accueil)
   - actualites.html
   - burundi.html
   - societe.html
   - politique.html
   - economie.html
   - culture.html
   - musique.html
   - sports.html
   - videos.html
   - emissions.html
   - animateurs.html
   - contact.html
   - a-propos.html
   - robots.txt
   - sitemap.xml
   - rss.xml
   - .htaccess (règles de redirection et cache)

7. CONFIGURATION DU STREAM RADIO 95.9 FM :
   Dans \`assets/config.js\` ou dans votre template, remplacez la constante :
   RADIO_STREAM_URL = "https://votre-serveur-icecast.com/stream.mp3";

8. CERTIFICAT SSL (HTTPS) :
   Dans cPanel > SSL/TLS Status, activez AutoSSL pour shimafm.org.

Félicitations, votre portail web SHIMA FM 95.9 est en ligne !
`;

      const htaccessContent = `# Redirection HTTPS et compression Apache cPanel
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Optimisation de la mise en cache navigateur
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Protection sécurité basique
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
`;

      // Static HTML templates
      const pages = [
        { name: 'index.html', title: 'SHIMA FM 95.9 — Accueil & Radio en direct' },
        { name: 'actualites.html', title: 'Actualités du Burundi & International — SHIMA FM' },
        { name: 'burundi.html', title: 'Actualités des 18 Provinces du Burundi — SHIMA FM' },
        { name: 'societe.html', title: 'Société & Vie Quotidienne au Burundi — SHIMA FM' },
        { name: 'politique.html', title: 'Politique & Institutions — SHIMA FM' },
        { name: 'economie.html', title: 'Économie, Café & Entreprises — SHIMA FM' },
        { name: 'culture.html', title: 'Culture & Traditions Burundaises — SHIMA FM' },
        { name: 'musique.html', title: 'Musique & Hits 95.9 FM — SHIMA FM' },
        { name: 'sports.html', title: 'Sports & Primus Ligue — SHIMA FM' },
        { name: 'videos.html', title: 'Vidéos & Reportages — SHIMA FM' },
        { name: 'emissions.html', title: 'Grille des Émissions 95.9 FM — SHIMA FM' },
        { name: 'animateurs.html', title: 'Nos Animateurs & Journalistes — SHIMA FM' },
        { name: 'a-propos.html', title: 'À Propos de Radio Shima FM' },
        { name: 'contact.html', title: 'Contactez SHIMA FM 95.9' },
      ];

      const htmlTemplate = (pageTitle: string) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="Radio Shima FM 95.9 - Ijambo kuri bose au Burundi.">
  <link rel="stylesheet" href="assets/style.css">
  <link rel="canonical" href="https://shimafm.org/">
</head>
<body>
  <header class="topbar">
    <div class="container">
      <div class="brand">
        <span class="live-dot"></span>
        <strong>SHIMA FM 95.9 FM</strong> | « Ijambo kuri bose » | Rumonge, Burunga, Burundi 🇧🇮
      </div>
      <div class="socials">
        <a href="https://facebook.com/shimafm">Facebook</a>
        <a href="https://youtube.com/@shimafm">YouTube</a>
        <a href="https://twitter.com/shimafm">X</a>
      </div>
    </div>
  </header>
  <main class="container">
    <h1>${pageTitle}</h1>
    <p>Bienvenue sur le portail officiel de Radio SHIMA FM 95.9 FM.</p>
    <div class="live-player">
      <span class="live-badge">🔴 EN DIRECT (95.9 FM)</span>
      <p>Émission en cours : <strong>Le Grand Matin Shima</strong> (06h - 10h)</p>
      <audio id="radioStream" controls src=""></audio>
      <p class="stream-hint">Pour activer votre flux live, configurez l'URL Icecast dans assets/config.js.</p>
    </div>
  </main>
  <footer>
    <div class="container">
      <p>&copy; 2026 SHIMA FM (shimafm.org) — 95.9 FM Rumonge, Burunga, Burundi. Tous droits réservés.</p>
    </div>
  </footer>
  <script src="assets/config.js"></script>
</body>
</html>`;

      // Add each page
      pages.forEach(p => {
        zip.file(p.name, htmlTemplate(p.title));
      });

      // Assets folder
      const assetsFolder = zip.folder('assets');
      assetsFolder?.file('config.js', `// Configuration officielle du flux streaming SHIMA FM
// En HTTPS, utilise le proxy stream.php pour contourner le blocage Mixed Content du navigateur
const isHttps = window.location.protocol === 'https:';
const RADIO_STREAM_URL = isHttps ? "stream.php" : "http://5.189.189.39:8000/shimafm.mp3";
console.log("SHIMA FM 95.9 initialisé. Stream:", RADIO_STREAM_URL);
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('radioStream');
  if (audio) audio.src = RADIO_STREAM_URL;
});
`);
      assetsFolder?.file('style.css', `/* Styles généraux cPanel SHIMA FM 95.9 */
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
.container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
.topbar { background: #0f172a; color: #fff; padding: 0.5rem 0; font-size: 0.85rem; }
.topbar .container { display: flex; justify-content: space-between; align-items: center; }
.live-dot { display: inline-block; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; margin-right: 5px; }
.live-player { background: #1e293b; color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; }
.live-badge { background: #ef4444; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }
.stream-hint { font-size: 0.8rem; color: #94a3b8; }
footer { background: #020617; color: #64748b; padding: 2rem 0; margin-top: 3rem; text-align: center; font-size: 0.85rem; }
`);

      // Stream proxy for cPanel with SSL
      const streamPhpContent = `<?php
/**
 * SHIMA FM 95.9 — Proxy de flux direct Icecast
 * Permet de diffuser le flux audio http://5.189.189.39:8000/shimafm.mp3
 * sur un site cPanel avec certificat SSL (HTTPS) sans blocage Mixed Content.
 */
header("Content-Type: audio/mpeg");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Access-Control-Allow-Origin: *");

$streamUrl = "http://5.189.189.39:8000/shimafm.mp3";
$fp = @fopen($streamUrl, "rb");

if ($fp) {
    while (!feof($fp) && connection_status() == 0) {
        echo fread($fp, 8192);
        flush();
    }
    fclose($fp);
} else {
    http_response_code(502);
    echo "Impossible de joindre le serveur de streaming Icecast 5.189.189.39:8000";
}
?>`;

      // Config files
      zip.file('stream.php', streamPhpContent);
      zip.file('README.md', readmeContent);
      zip.file('.htaccess', htaccessContent);
      zip.file('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://shimafm.org/sitemap.xml\n`);
      zip.file('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://shimafm.org/</loc></url>\n</urlset>\n`);

      // Generate the zip blob
      const content = await zip.generateAsync({ type: 'blob' });

      // Trigger automatic browser download
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'SHIMA_FM_95.9_cPanel_Package.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setIsGenerating(false);
      setDownloadSuccess(true);
    } catch (err) {
      console.error('Error creating ZIP:', err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full text-white p-6 shadow-2xl animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                PACK HÉBERGEMENT CPANEL
              </h3>
              <p className="text-xs text-slate-400">SHIMA FM 95.9 — shimafm.org</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-slate-300">
          <p className="leading-relaxed">
            Ce générateur prépare et télécharge directement un fichier <strong>ZIP complet</strong> contenant tous les fichiers HTML, feuilles de style, script de stream radio, <code className="text-amber-400">sitemap.xml</code>, <code className="text-amber-400">robots.txt</code>, <code className="text-amber-400">.htaccess</code> et un guide d'installation étape par étape pour <strong>cPanel</strong>.
          </p>

          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Contenu de l'archive prête pour cPanel :</span>
            </div>
            <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 pl-6 list-disc">
              <li>index.html (Accueil)</li>
              <li>actualites.html</li>
              <li>burundi.html (18 prov.)</li>
              <li>societe.html</li>
              <li>politique.html</li>
              <li>economie.html</li>
              <li>culture.html</li>
              <li>musique.html</li>
              <li>sports.html</li>
              <li>videos.html</li>
              <li>emissions.html</li>
              <li>animateurs.html</li>
              <li>contact.html</li>
              <li>.htaccess & robots.txt</li>
            </ul>
          </div>

          {downloadSuccess && (
            <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-3 flex items-center gap-2 text-emerald-300">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>
                <strong>Téléchargement réussi !</strong> Le fichier <code>SHIMA_FM_95.9_cPanel_Package.zip</code> a été généré et sauvegardé.
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={generateAndDownloadZip}
            disabled={isGenerating}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Génération du ZIP...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Télécharger l'archive ZIP cPanel</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
