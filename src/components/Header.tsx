import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Menu, 
  X, 
  Volume2, 
  Share2, 
  Moon, 
  Sun,
  Globe,
  RadioTower,
  Play
} from 'lucide-react';
import { RADIO_INFO } from '../data/mockData';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isPlayingRadio,
  onToggleRadio,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navItems = [
    { id: 'accueil', label: 'ACCUEIL' },
    { id: 'actualites', label: 'ACTUALITÉS' },
    { id: 'burundi', label: 'BURUNDI' },
    { id: 'politique', label: 'POLITIQUE' },
    { id: 'economie', label: 'ÉCONOMIE' },
    { id: 'culture', label: 'CULTURE' },
    { id: 'sports', label: 'SPORTS' },
    { id: 'videos', label: 'VIDÉOS' },
    { id: 'emissions', label: 'ÉMISSIONS' },
    { id: 'a-propos', label: 'À PROPOS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onNavigate('recherche', quickSearch.trim());
      setShowSearchModal(false);
      setQuickSearch('');
    }
  };

  const todayDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="w-full shadow-xs">
      {/* PARTIE SUPÉRIEURE (Top bar) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Radio info & slogan */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-red-500 tracking-wide uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              SHIMA FM 95.9 FM
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden md:inline italic text-slate-400 font-medium">
              « {RADIO_INFO.slogan} »
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              {RADIO_INFO.location}
            </span>
          </div>

          {/* Date & Social networks */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden md:inline capitalize text-slate-400 font-medium">
              {todayDate}
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-700">
              <a 
                href={RADIO_INFO.socials.facebook} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook Shima FM"
                className="hover:text-blue-400 transition-colors"
              >
                <span className="font-bold text-[11px]">FB</span>
              </a>
              <a 
                href={RADIO_INFO.socials.youtube} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube Shima FM"
                className="hover:text-red-400 transition-colors"
              >
                <span className="font-bold text-[11px]">YT</span>
              </a>
              <a 
                href={RADIO_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram Shima FM"
                className="hover:text-pink-400 transition-colors"
              >
                <span className="font-bold text-[11px]">IG</span>
              </a>
              <a 
                href={RADIO_INFO.socials.tiktok} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="TikTok Shima FM"
                className="hover:text-cyan-400 transition-colors"
              >
                <span className="font-bold text-[11px]">TT</span>
              </a>
              <a 
                href={RADIO_INFO.socials.twitter} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X Twitter Shima FM"
                className="hover:text-white transition-colors"
              >
                <span className="font-bold text-[11px]">X</span>
              </a>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="header-theme-toggle"
              onClick={onToggleDarkMode}
              className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              aria-label="Basculer le thème"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* PARTIE PRINCIPALE (Main Sticky Header) */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo SHIMA FM */}
          <div 
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
            role="button"
            tabIndex={0}
            aria-label="Retour à l'accueil Shima FM"
          >
            {/* Original African Radio Station Emblem */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform shrink-0">
              <RadioTower className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-blue-950 dark:text-white font-heading">
                  SHIMA<span className="text-red-600">FM</span>
                </span>
                <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-bold px-1 sm:px-1.5 py-0.2 rounded font-mono tracking-tight shadow-2xs">
                  95.9
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase -mt-0.5 truncate max-w-[140px] sm:max-w-none">
                IJAMBO KURI BOSE
              </span>
            </div>
          </div>

          {/* Bouton Écouter en direct (très visible pour desktop + mobile) & Search */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Search Trigger Button */}
            <button
              id="header-search-btn"
              onClick={() => setShowSearchModal(true)}
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-xs font-semibold"
              title="Rechercher"
              aria-label="Recherche sur le site"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Recherche</span>
            </button>

            {/* 🔴 BOUTON ÉCOUTER EN DIRECT (Adapté mobile iPhone) */}
            <button
              id="header-listen-live-btn"
              onClick={onToggleRadio}
              className={`relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 min-h-[40px] rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0 ${
                isPlayingRadio
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-400/50'
                  : 'bg-red-600 text-white hover:bg-red-700 ring-4 ring-red-500/20'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlayingRadio ? 'bg-emerald-200' : 'bg-white'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 ${isPlayingRadio ? 'bg-emerald-100' : 'bg-white'}`}></span>
              </span>

              <span className="font-extrabold flex items-center gap-1 text-[11px] sm:text-xs">
                {isPlayingRadio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="sm:hidden">DIRECT</span>
                    <span className="hidden sm:inline">À L'ANTENNE</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="sm:hidden">DIRECT</span>
                    <span className="hidden sm:inline">ÉCOUTER EN DIRECT</span>
                  </>
                )}
              </span>

              <span className="hidden xs:inline bg-black/20 text-[10px] px-1.5 py-0.5 rounded font-mono">
                95.9 FM
              </span>
            </button>

            {/* Hamburger Mobile Toggle */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* NAVIGATION DESKTOP BAR */}
        <nav className="hidden lg:block bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
            <ul className="flex items-center space-x-1 py-1 text-[13px] font-bold tracking-tight whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <li key={item.id}>
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 rounded-md transition-all uppercase ${
                        isActive
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'text-slate-200 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Quick Live Tag on Right */}
            <div className="flex items-center gap-2 py-1 pl-4 text-xs font-semibold text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden xl:inline text-slate-300">En ce moment :</span>
              <span className="truncate max-w-[200px] text-white font-medium">{RADIO_INFO.currentShow}</span>
            </div>
          </div>
        </nav>
      </div>

      {/* SEARCH MODAL */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-xl w-full p-5 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Recherche sur SHIMA FM</h3>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Rechercher un article, artiste, émission, vidéo, animateur..."
                  autoFocus
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  Chercher
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Suggestions :</span>
                {['Bujumbura', 'Primus Ligue', 'Gitega', 'Café', 'Tambours', 'Afrobeat'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      onNavigate('recherche', tag);
                      setShowSearchModal(false);
                    }}
                    className="hover:text-red-600 hover:underline bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 text-white w-full h-[90dvh] max-h-[90dvh] rounded-t-3xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto border-t border-slate-800 shadow-2xl pb-[calc(1.5rem+env(safe-area-inset-bottom,20px))]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Header in Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-lg text-white font-heading">SHIMA FM 95.9</span>
                    <p className="text-[11px] text-slate-400">« {RADIO_INFO.slogan} »</p>
                  </div>
                </div>
                <button 
                  id="mobile-close-menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Quick Listen Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    onToggleRadio();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full py-3.5 px-4 min-h-[44px] rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
                    isPlayingRadio
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>{isPlayingRadio ? 'À L\'ANTENNE (95.9 FM)' : '🔴 ÉCOUTER EN DIRECT (95.9 FM)'}</span>
                </button>
              </div>

              {/* Search input in Drawer */}
              <form onSubmit={handleSearchSubmit} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Recherche dans les actualités..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs placeholder:text-slate-400 focus:outline-hidden focus:border-red-500 min-h-[44px]"
                  />
                  <button type="submit" className="absolute right-3 top-3 text-slate-400 p-1" aria-label="Lancer la recherche">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation List */}
              <ul className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-4 py-3 min-h-[44px] rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom info in Drawer */}
            <div className="pt-5 border-t border-slate-800 text-xs text-slate-400 space-y-1.5 mt-6">
              <p className="flex items-center gap-1.5 text-slate-300">
                <RadioTower className="w-4 h-4 text-red-500 shrink-0" />
                <span>Fréquence : <strong>95.9 FM Rumonge, Burunga</strong></span>
              </p>
              <p>Standard radio : +257 22 25 95 90</p>
              <p className="text-[11px] text-slate-500">© 2026 SHIMA FM — Tous droits réservés.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
