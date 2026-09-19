import React from 'react';
import { 
  Radio, 
  RadioTower, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Rss, 
  Download, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { RADIO_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenExportModal }) => {
  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'burundi', label: 'Burundi' },
    { id: 'societe', label: 'Société' },
    { id: 'politique', label: 'Politique' },
    { id: 'economie', label: 'Économie' },
    { id: 'culture', label: 'Culture' },
    { id: 'musique', label: 'Musique' },
    { id: 'sports', label: 'Sports' },
    { id: 'videos', label: 'Vidéos' },
    { id: 'emissions', label: 'Émissions' },
    { id: 'animateurs', label: 'Animateurs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-10 sm:pt-12 pb-12 sm:pb-16 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div 
              onClick={() => onNavigate('accueil')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 to-red-600 flex items-center justify-center text-white shadow-md">
                <RadioTower className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-2xl tracking-tighter text-white">
                    SHIMA<span className="text-red-500">FM</span>
                  </span>
                  <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                    95.9 FM
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Burundi 🇧🇮
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
              « {RADIO_INFO.slogan} »
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              SHIMA FM 95.9 est la radio de référence pour l'information, la culture burundaise, la musique moderne et les débats citoyens au Burundi et dans la diaspora.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href={RADIO_INFO.socials.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                FB
              </a>
              <a href={RADIO_INFO.socials.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                YT
              </a>
              <a href={RADIO_INFO.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                IG
              </a>
              <a href={RADIO_INFO.socials.tiktok} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                TT
              </a>
              <a href={RADIO_INFO.socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                X
              </a>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              RUBRIQUES DU SITE
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-400">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Informations & Déontologie */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              INFORMATIONS & LIENS
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('a-propos')} className="hover:text-white transition-colors">
                  À propos de Radio Shima FM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('animateurs')} className="hover:text-white transition-colors">
                  Nos Journalistes & Animateurs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('emissions')} className="hover:text-white transition-colors">
                  Grille des programmes 95.9
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Régie publicitaire & Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Panneau d'administration</span>
                </button>
              </li>
              <li className="pt-2">
                <a href="/rss.xml" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-amber-400 hover:underline font-mono text-[11px]">
                  <Rss className="w-3.5 h-3.5" />
                  <span>Flux RSS / Google News</span>
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:underline font-mono text-[11px]">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Plan du site (sitemap.xml)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio & Fréquence */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              STUDIO & COORDONNÉES
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{RADIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct antenne : <strong className="text-white">{RADIO_INFO.phone}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Rédaction : <strong className="text-white">{RADIO_INFO.redactionEmail}</strong></span>
              </p>

              {/* cPanel Pack Download Button (Req #46) */}
              <div className="pt-3">
                <button
                  onClick={onOpenExportModal}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-white rounded-xl p-2.5 flex items-center justify-center gap-2 text-xs font-semibold transition-all group shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Pack ZIP prêt pour cPanel</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 <strong>SHIMA FM</strong> (shimafm.org). Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Fréquence : 95.9 FM</span>
            <span>•</span>
            <span className="text-slate-600">Rumonge, Burunga, Burundi</span>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white">
              Mentions légales & Confidentialité
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
