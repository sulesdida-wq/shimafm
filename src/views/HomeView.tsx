import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Eye, 
  Radio, 
  Flame, 
  Newspaper, 
  Sparkles,
  TrendingUp,
  Volume2,
  Volume1,
  VolumeX,
  Minus,
  Plus,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Article, Song, VideoItem } from '../types';
import { Sidebar } from '../components/Sidebar';
import { AdBanner } from '../components/AdBanner';
import { RADIO_INFO } from '../data/mockData';

interface HomeViewProps {
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
  onSelectVideo: (video: VideoItem) => void;
  onSelectSong: (song: Song) => void;
  radioVolume?: number;
  onVolumeChange?: (vol: number) => void;
  isRadioMuted?: boolean;
  onToggleMute?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
  onSelectVideo,
  onSelectSong,
  radioVolume = 80,
  onVolumeChange,
  isRadioMuted = false,
  onToggleMute,
}) => {
  // 2 Derniers articles publiés pour "À LA UNE" (défilent de droite vers la gauche)
  const heroArticles = React.useMemo(() => {
    return articles.slice(0, 2);
  }, [articles]);

  const [currentHeroIndex, setCurrentHeroIndex] = React.useState(0);
  const [isHeroPaused, setIsHeroPaused] = React.useState(false);
  const [hoveredHomeVideoId, setHoveredHomeVideoId] = React.useState<string | null>(null);

  // Défilement automatique de droite vers la gauche toutes les 5 secondes
  React.useEffect(() => {
    if (heroArticles.length <= 1 || isHeroPaused) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroArticles.length, isHeroPaused]);

  // Navigation manuelle précédente / suivante
  const handleNextHero = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentHeroIndex(prev => (prev + 1) % heroArticles.length);
  };

  const handlePrevHero = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentHeroIndex(prev => (prev - 1 + heroArticles.length) % heroArticles.length);
  };

  // Article actuellement affiché à la une
  const currentHeroArticle = heroArticles[currentHeroIndex] || heroArticles[0] || articles[0];

  // 3 Articles secondaires (en excluant les 2 articles à la une pour éviter les doublons)
  const secondaryHeroes = React.useMemo(() => {
    const heroIds = heroArticles.map(a => a.id);
    const remaining = articles.filter(a => !heroIds.includes(a.id));
    return remaining.slice(0, 3);
  }, [articles, heroArticles]);

  // Derniers articles (en excluant les 2 articles à la une)
  const latestArticles = React.useMemo(() => {
    const heroIds = heroArticles.map(a => a.id);
    const remaining = articles.filter(a => !heroIds.includes(a.id));
    return remaining.slice(0, 6);
  }, [articles, heroArticles]);

  // Reference for volume container mouse wheel listener
  const volumeContainerRef = React.useRef<HTMLDivElement>(null);

  // Mouse wheel listener: non-passive to allow smooth volume adjustment with mouse wheel
  React.useEffect(() => {
    const el = volumeContainerRef.current;
    if (!el) return;

    const onWheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const current = isRadioMuted ? 0 : radioVolume;
      const step = 5;
      if (e.deltaY < 0) {
        // Molette vers le haut -> Augmenter le volume avec la souris
        onVolumeChange && onVolumeChange(Math.min(100, current + step));
      } else if (e.deltaY > 0) {
        // Molette vers le bas -> Diminuer le volume avec la souris
        onVolumeChange && onVolumeChange(Math.max(0, current - step));
      }
    };

    el.addEventListener('wheel', onWheelHandler, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheelHandler);
    };
  }, [radioVolume, isRadioMuted, onVolumeChange]);

  // Handlers for Volume Moderation (Minus / Plus buttons)
  const handleDecreaseVolume = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!onVolumeChange) return;
    const current = (isRadioMuted && radioVolume === 0) ? 50 : radioVolume;
    const next = Math.max(0, current - 10);
    onVolumeChange(next);
  };

  const handleIncreaseVolume = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!onVolumeChange) return;
    const current = (isRadioMuted && radioVolume === 0) ? 0 : radioVolume;
    const next = Math.min(100, current + 10);
    onVolumeChange(next);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 🔴 BANDEAU ÉCOUTE LIVE FLASH PROMINENT (Req #5 & #44) */}
      <section 
        id="live-radio-hero-banner" 
        className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 text-white p-4 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="flex items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Radio className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full animate-ping"></span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"></span>
                  🔴 EN DIRECT
                </span>
                <span className="font-mono text-amber-400 font-bold text-xs sm:text-sm">95.9 FM</span>
              </div>
              <h2 className="font-heading text-lg sm:text-2xl font-bold text-white mt-0.5 truncate">
                « Écoutez votre radio en direct »
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-between sm:justify-end">
            {/* Bouton Play / Pause avec lecture directe au survol de la souris ou au clic */}
            <button
              id="hero-radio-play-btn"
              onClick={onToggleRadio}
              onMouseEnter={() => {
                if (!isPlayingRadio) {
                  onToggleRadio();
                }
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse' && !isPlayingRadio) {
                  onToggleRadio();
                }
              }}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-3 sm:py-3.5 min-h-[44px] rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                isPlayingRadio
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-300 shadow-amber-400/20'
                  : 'bg-red-600 text-white hover:bg-red-700 ring-2 ring-red-500/40 shadow-red-600/30'
              }`}
              aria-label={isPlayingRadio ? "Mettre la radio en pause" : "Lancer la radio en direct (survolez ou cliquez)"}
              title={isPlayingRadio ? "Cliquer pour mettre en pause" : "Survolez avec la souris ou cliquez pour écouter en direct"}
            >
              {isPlayingRadio ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span className="whitespace-nowrap">ÉCOUTER DIRECT</span>
                </>
              )}
            </button>

            {/* Curseur et module de modulation du volume synchronisé avec le flux streaming */}
            <div 
              ref={volumeContainerRef}
              id="hero-radio-volume-container"
              className={`flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2.5 bg-slate-900/95 rounded-2xl px-3 sm:px-4 py-1.5 min-h-[44px] select-none transition-all shadow-inner border ${
                isRadioMuted || radioVolume === 0
                  ? 'border-slate-800 text-slate-500 shadow-none'
                  : radioVolume > 70
                    ? 'border-red-500/50 shadow-red-500/10 text-white'
                    : radioVolume > 35
                      ? 'border-amber-500/50 shadow-amber-500/10 text-slate-200'
                      : 'border-emerald-500/40 shadow-emerald-500/10 text-slate-300'
              }`}
              title="Modulation du volume sonore en direct (boutons -, +, curseur ou molette de la souris)"
            >
              {/* Bouton Mute / Unmute synchronisé */}
              <button
                type="button"
                id="hero-radio-mute-btn"
                onClick={onToggleMute}
                className="text-slate-400 hover:text-white transition-colors p-1.5 shrink-0 min-w-[32px] min-h-[32px] rounded-xl hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                aria-label={isRadioMuted || radioVolume === 0 ? "Réactiver le son" : "Couper le son"}
                title={isRadioMuted || radioVolume === 0 ? "Cliquer pour réactiver le son" : "Cliquer pour couper le son"}
              >
                {isRadioMuted || radioVolume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : radioVolume < 40 ? (
                  <Volume1 className="w-4 h-4 text-slate-300" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-300 hover:text-white" />
                )}
              </button>

              {/* Bouton Moins (-) pour moduler le volume à la baisse */}
              <button
                type="button"
                id="hero-radio-vol-down-btn"
                onClick={handleDecreaseVolume}
                className="text-slate-200 hover:text-white bg-slate-800 hover:bg-red-600 active:bg-red-700 transition-all p-1 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-slate-700 hover:border-red-500 flex items-center justify-center font-bold cursor-pointer shadow-xs active:scale-95"
                aria-label="Diminuer le volume (-10%)"
                title="Diminuer le volume (-10%)"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Curseur de modulation directe du volume */}
              <div className="relative flex items-center">
                <input
                  id="hero-radio-volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={isRadioMuted ? 0 : radioVolume}
                  onChange={(e) => onVolumeChange && onVolumeChange(Number(e.target.value))}
                  onInput={(e) => onVolumeChange && onVolumeChange(Number((e.target as HTMLInputElement).value))}
                  onWheel={(e) => {
                    e.stopPropagation();
                    const current = isRadioMuted ? 0 : radioVolume;
                    if (e.deltaY < 0) {
                      onVolumeChange && onVolumeChange(Math.min(100, current + 5));
                    } else if (e.deltaY > 0) {
                      onVolumeChange && onVolumeChange(Math.max(0, current - 5));
                    }
                  }}
                  style={{
                    background: `linear-gradient(to right, ${
                      radioVolume > 70 ? '#ef4444' : radioVolume > 35 ? '#f59e0b' : '#10b981'
                    } 0%, ${
                      radioVolume > 70 ? '#ef4444' : radioVolume > 35 ? '#f59e0b' : '#10b981'
                    } ${isRadioMuted ? 0 : radioVolume}%, #334155 ${
                      isRadioMuted ? 0 : radioVolume
                    }%, #334155 100%)`
                  }}
                  className="w-16 sm:w-24 md:w-28 h-2 rounded-full cursor-pointer accent-red-500 transition-all"
                  aria-label="Curseur de modulation du volume"
                  title="Glissez avec la souris pour moduler le volume"
                />
              </div>

              {/* Bouton Plus (+) pour moduler le volume à la hausse */}
              <button
                type="button"
                id="hero-radio-vol-up-btn"
                onClick={handleIncreaseVolume}
                className="text-slate-200 hover:text-white bg-slate-800 hover:bg-red-600 active:bg-red-700 transition-all p-1 shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-slate-700 hover:border-red-500 flex items-center justify-center font-bold cursor-pointer shadow-xs active:scale-95"
                aria-label="Augmenter le volume (+10%)"
                title="Augmenter le volume (+10%)"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Visualiseur de modulation sonore dynamique (barres égaliseur proportionnelles au volume) */}
              <div 
                className="hidden md:flex items-end gap-0.5 h-4 px-1" 
                title={`Niveau de modulation sonore : ${isRadioMuted ? 0 : radioVolume}%`}
              >
                {[0.25, 0.5, 0.75, 1.0].map((threshold, idx) => {
                  const effectiveVol = isRadioMuted ? 0 : radioVolume / 100;
                  const isActive = effectiveVol >= threshold * 0.75;
                  const heightPercent = isRadioMuted
                    ? 15
                    : Math.max(20, Math.min(100, Math.round(effectiveVol * 100 * (0.5 + idx * 0.2))));
                  return (
                    <span
                      key={idx}
                      style={{ height: `${heightPercent}%` }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isActive
                          ? isPlayingRadio
                            ? radioVolume > 70
                              ? 'bg-red-500 animate-pulse'
                              : radioVolume > 35
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                            : 'bg-slate-400'
                          : 'bg-slate-700/60'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Badge du pourcentage cliquable pour Mute/Unmute */}
              <button
                type="button"
                onClick={onToggleMute}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-lg border transition-all w-11 text-center select-none shrink-0 cursor-pointer font-bold ${
                  isRadioMuted || radioVolume === 0
                    ? 'bg-red-950/40 text-red-400 border-red-800/50'
                    : radioVolume > 70
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-xs'
                      : radioVolume > 35
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
                title={isRadioMuted ? "Son coupé (0%) - Cliquer pour réactiver" : `Volume modulé à ${radioVolume}% - Cliquer pour couper`}
              >
                {isRadioMuted ? '0%' : `${radioVolume}%`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION HERO (Req #6: Grande actualité + 3 secondaires)
          ================================================== */}
      <section id="hero-section" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CARROUSEL À LA UNE (2 derniers articles publiés qui défilent de droite vers la gauche) */}
          <div 
            id="hero-slider-container"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
            className="lg:col-span-7 xl:col-span-8 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between transition-all relative group"
          >
            {/* Zone de contenu avec animation de défilement sans transition blanche */}
            <div className="relative overflow-hidden w-full flex-1 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] bg-slate-950">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.article
                  key={currentHeroArticle.id}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onSelectArticle(currentHeroArticle)}
                  className="w-full h-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-between cursor-pointer relative overflow-hidden bg-slate-950 select-none"
                >
                  {/* Photo de couverture couvrant toute la surface */}
                  <img 
                    src={currentHeroArticle.image} 
                    alt={currentHeroArticle.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Dégradés sombres superposés pour lisibilité parfaite du texte sans fond blanc */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 via-45% to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                  {/* Haut : Badges À LA UNE + Catégorie + Indicateur 1/2 */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-red-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        À LA UNE
                      </span>
                      <span className="bg-slate-900/85 text-blue-200 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/10">
                        {currentHeroArticle.subcategory || currentHeroArticle.category}
                      </span>
                    </div>

                    {/* Indicateur de position (1/2 et 2/2) */}
                    <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/15 shadow-md">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {currentHeroIndex + 1}/{heroArticles.length}
                      </span>
                      <span className="text-[11px] text-slate-300 hidden sm:inline">
                        {isHeroPaused ? '⏸ Pause' : 'Défilement →'}
                      </span>
                    </div>
                  </div>

                  {/* Bas : Titre et résumé placés DIRECTEMENT SUR LA PHOTO DE COUVERTURE EN BAS */}
                  <div className="relative z-10 p-5 sm:p-8 space-y-3 pt-12">
                    <div>
                      <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold text-white group-hover:text-red-400 transition-colors leading-tight drop-shadow-md">
                        {currentHeroArticle.title}
                      </h1>
                      
                      <p className="text-sm sm:text-base text-slate-200 mt-2.5 leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow-xs max-w-3xl">
                        {currentHeroArticle.summary}
                      </p>
                    </div>

                    {/* Métadonnées sur la photo */}
                    <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 font-medium text-white">
                          <User className="w-3.5 h-3.5 text-red-500" />
                          <span>{currentHeroArticle.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{currentHeroArticle.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-slate-300">
                          <Eye className="w-3.5 h-3.5 text-red-400" />
                          <span>{currentHeroArticle.views.toLocaleString()} vues</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-transform">
                        Lire l'article →
                      </span>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Barre de contrôle et pagination du carrousel (fond sombre, sans transition blanche) */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md flex items-center justify-between gap-4 z-20">
              {/* Indicateurs interactifs pour les 2 articles */}
              <div className="flex items-center gap-2">
                {heroArticles.map((art, idx) => {
                  const isActive = idx === currentHeroIndex;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentHeroIndex(idx);
                      }}
                      className={`transition-all rounded-full cursor-pointer h-2 ${
                        isActive 
                          ? 'w-8 bg-red-600 shadow-sm' 
                          : 'w-3 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Aller à l'article ${idx + 1}`}
                      title={`Article ${idx + 1} : ${art.title}`}
                    />
                  );
                })}
                <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
                  {currentHeroIndex === 0 ? 'Dernier article publié' : 'Deuxième article récent'}
                </span>
              </div>

              {/* Boutons flèches précédent / suivant */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="hero-prev-btn"
                  onClick={handlePrevHero}
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Article précédent"
                  title="Article précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="hero-next-btn"
                  onClick={handleNextHero}
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Article suivant (défiler de droite vers la gauche)"
                  title="Article suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3 ACTUALITÉS SECONDAIRES (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-4">
            {secondaryHeroes.map((art) => (
              <article
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer transition-all flex gap-3.5 flex-1"
              >
                <div className="relative w-28 sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                    {art.category}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400">
                      {art.province || art.subcategory || 'Burundi'}
                    </span>
                    <h2 className="font-heading text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{art.date}</span>
                    <span className="font-bold text-red-600 dark:text-red-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                      Lire →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 📢 ESPACE PUBLICITAIRE HEADER (728x90) */}
      <AdBanner format="728x90" />

      {/* ==================================================
          SECTION PRINCIPALE : CONTENU + SIDEBAR (Req #7 & #23)
          ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLONNE GAUCHE : DERNIÈRES ACTUALITÉS (8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* SECTION DERNIÈRES ACTUALITÉS (Req #7) */}
          <section id="dernieres-actualites" className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 dark:border-slate-100">
              <div className="flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-red-600" />
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                  📰 DERNIÈRES ACTUALITÉS
                </h2>
              </div>
              <button
                onClick={() => onNavigate('actualites')}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 uppercase"
              >
                <span>Toutes les actualités</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grille des derniers articles du plus récent au plus ancien */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-800">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                        <span className="font-semibold text-blue-800 dark:text-blue-400 uppercase">
                          {art.province || art.subcategory}
                        </span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>Par {art.author}</span>
                        <span>•</span>
                        <span>{art.views.toLocaleString()} vues</span>
                      </div>

                      <span className="font-bold text-red-600 dark:text-red-400 text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Lire la suite →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION BURUNDI EN DIRECT (Aperçu provinces) */}
          <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">FOCUS RÉGIONS</span>
                <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                  <span>🇧🇮 ACTUALITÉS DU BURUNDI</span>
                </h3>
              </div>
              <button
                onClick={() => onNavigate('burundi')}
                className="self-start sm:self-auto bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors"
              >
                Explorer les 18 Provinces
              </button>
            </div>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              De Bujumbura à Gitega, de Ngozi à Rumonge, nos correspondants locaux sillonnent les collines pour vous informer en direct sur les réalisations communautaires, l'agriculture et la vie citoyenne.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {['Bujumbura', 'Gitega', 'Rumonge', 'Kayanza', 'Ngozi', 'Bururi', 'Muyinga', 'Kirundo'].map((prov) => (
                <button
                  key={prov}
                  onClick={() => onNavigate('burundi', prov)}
                  className="bg-slate-800/80 hover:bg-red-600 text-slate-200 hover:text-white p-2.5 rounded-xl text-xs font-semibold transition-all border border-slate-700/60"
                >
                  {prov}
                </button>
              ))}
            </div>
          </section>

          {/* SECTION VIDÉOS EN VEDETTE (Req #16) */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-slate-900 dark:border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-red-600 text-white">
                  <Youtube className="w-4 h-4 fill-current" />
                </span>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                  VIDÉOS & REPORTAGES (@RadioShimaFM)
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@RadioShimaFM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-900/50"
                  title="Ouvrir la chaîne YouTube officielle"
                >
                  <Youtube className="w-3.5 h-3.5 fill-current" />
                  <span>Chaîne YouTube</span>
                </a>
                <button
                  onClick={() => onNavigate('videos')}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 uppercase"
                >
                  Toutes les vidéos →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.slice(0, 2).map((video) => (
                <div
                  key={video.id}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-red-400 dark:hover:border-red-700 transition-all flex flex-col justify-between"
                >
                  <div 
                    onMouseEnter={() => setHoveredHomeVideoId(video.id)}
                    onMouseLeave={() => setHoveredHomeVideoId(null)}
                    className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
                  >
                    {hoveredHomeVideoId === video.id && video.youtubeId ? (
                      <div className="w-full h-full relative">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1&rel=0`}
                          title={video.title}
                          className="w-full h-full object-cover border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute top-2 right-2 pointer-events-none bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md z-20">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>LECTURE</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => onSelectVideo(video)}
                        className="w-full h-full relative"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          {video.duration}
                        </span>
                        <span className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                          <Youtube className="w-2.5 h-2.5 text-red-500 fill-current" />
                          {video.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-red-600">@RadioShimaFM</span>
                    <h3 
                      onClick={() => onSelectVideo(video)}
                      className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 mt-1 leading-snug cursor-pointer"
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* COLONNE DROITE : SIDEBAR DESKTOP (4 cols) (Req #23) */}
        <aside className="lg:col-span-4 space-y-6">
          <Sidebar
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={onToggleRadio}
            onSelectArticle={onSelectArticle}
            onNavigate={onNavigate}
            onSelectVideo={onSelectVideo}
            onSelectSong={onSelectSong}
          />
        </aside>

      </div>

    </div>
  );
};
