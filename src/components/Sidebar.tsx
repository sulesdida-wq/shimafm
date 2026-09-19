import React, { useState } from 'react';
import { 
  Radio, 
  Flame, 
  Newspaper, 
  Music, 
  Film, 
  Mail, 
  Send, 
  Play, 
  RadioTower, 
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Article, Song, VideoItem } from '../types';
import { RADIO_INFO, SHOWS_DATA } from '../data/mockData';
import { AdBanner } from './AdBanner';

interface SidebarProps {
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
  onSelectVideo?: (video: VideoItem) => void;
  onSelectSong?: (song: Song) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
  onSelectVideo,
  onSelectSong,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [hoveredSidebarVideoId, setHoveredSidebarVideoId] = useState<string | null>(null);

  // Popular sorted by views
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  // Latest articles
  const latestArticles = [...articles].slice(0, 4);
  // Popular songs
  const topSongs = [...songs].slice(0, 3);
  // Popular videos
  const topVideos = [...videos].slice(0, 2);

  const currentShow = SHOWS_DATA.find(s => s.isOnAirNow) || SHOWS_DATA[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 🔴 WIDGET RADIO EN DIRECT */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-red-950 text-white p-5 shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 bg-red-600/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">EN DIRECT</span>
          </div>
          <span className="bg-red-600/30 text-red-200 border border-red-500/40 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
            95.9 FM
          </span>
        </div>

        <h4 className="font-heading text-lg font-bold text-white leading-tight">
          {currentShow.title}
        </h4>
        <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
          <span>🎙️</span>
          <span>{currentShow.host}</span>
        </p>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={onToggleRadio}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              isPlayingRadio
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>{isPlayingRadio ? 'Mettre en pause' : 'Écouter en direct'}</span>
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-400 text-center italic">
          « {RADIO_INFO.slogan} »
        </p>
      </div>

      {/* 🔥 LES PLUS LUS / CLASSEMENT NUMÉROTÉ 01-05 (Section 20) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight">
              LES PLUS LUS
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Top vues</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
          {popularArticles.map((art, index) => (
            <div 
              key={art.id} 
              onClick={() => onSelectArticle(art)}
              className="py-3 flex items-start gap-3 group cursor-pointer"
            >
              <span className="font-heading text-xl font-bold text-red-600/70 group-hover:text-red-600 transition-colors shrink-0 w-7">
                0{index + 1}
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400">
                  {art.subcategory || art.category}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {art.views.toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📢 ESPACE PUBLICITAIRE SIDEBAR (300x250) */}
      <AdBanner format="300x250" />

      {/* 📰 DERNIÈRES NOUVELLES EXPRESS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight">
              FLASH ACTUALITÉS
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('actualites')}
            className="text-xs font-semibold text-red-600 hover:underline flex items-center"
          >
            Tout voir
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {latestArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                <span className="font-bold text-red-600 uppercase font-mono">{art.time}</span>
                <span>•</span>
                <span className="capitalize">{art.province || art.category}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-red-600 line-clamp-2 leading-snug">
                {art.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🎵 MUSIQUE POPULAIRE / TOP BURUNDI */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-purple-600" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight">
              TOP BURUNDI
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('musique')}
            className="text-xs font-semibold text-purple-600 hover:underline"
          >
            Hits 95.9
          </button>
        </div>

        <div className="mt-3 space-y-2.5">
          {topSongs.map((song, i) => (
            <div 
              key={song.id} 
              onClick={() => onSelectSong ? onSelectSong(song) : onNavigate('musique')}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate group-hover:text-purple-600">
                  {song.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {song.artist}
                </p>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                #{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🎬 VIDÉOS POPULAIRES */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-red-600" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white uppercase tracking-tight">
              SHIMA TV & VIDÉOS
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('videos')}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Vidéos
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {topVideos.map((video) => (
            <div 
              key={video.id} 
              className="group"
            >
              <div 
                onMouseEnter={() => setHoveredSidebarVideoId(video.id)}
                onMouseLeave={() => setHoveredSidebarVideoId(null)}
                className="relative rounded-xl overflow-hidden aspect-video bg-slate-800 cursor-pointer"
              >
                {hoveredSidebarVideoId === video.id && video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=1&modestbranding=1&rel=0`}
                    title={video.title}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => onSelectVideo ? onSelectVideo(video) : onNavigate('videos')}
                    className="w-full h-full relative"
                  >
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-mono px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                )}
              </div>
              <h4 
                onClick={() => onSelectVideo ? onSelectVideo(video) : onNavigate('videos')}
                className="text-xs font-bold text-slate-800 dark:text-white mt-1.5 group-hover:text-red-600 line-clamp-2 leading-snug cursor-pointer"
              >
                {video.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 📧 NEWSLETTER SHIMA FM (Section 25) */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 border border-blue-800 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-amber-400" />
          <h3 className="font-heading font-bold text-base uppercase tracking-tight">
            NEWSLETTER SHIMA FM
          </h3>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed">
          « Recevez les dernières actualités du Burundi et les informations de Radio Shima FM directement dans votre boîte mail. »
        </p>

        {newsletterSubscribed ? (
          <div className="mt-4 bg-emerald-600/20 border border-emerald-500/50 rounded-xl p-3 flex items-center gap-2 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Merci ! Vous êtes désormais inscrit à notre lettre d'information quotidienne.</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-white placeholder:text-blue-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>S'abonner</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
