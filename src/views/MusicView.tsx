import React, { useState } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Heart, 
  Plus, 
  Flame, 
  Headphones, 
  Disc, 
  Mic2, 
  Check, 
  Volume2,
  Share2
} from 'lucide-react';
import { Song } from '../types';

interface MusicViewProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
  activeSongId?: string;
}

export const MusicView: React.FC<MusicViewProps> = ({ songs, onSelectSong, activeSongId }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('Tous');
  const [likedSongIds, setLikedSongIds] = useState<Record<string, boolean>>({});
  const [playlistSongIds, setPlaylistSongIds] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'sorties' | 'trending' | 'top-burundi' | 'artistes'>('sorties');

  const genres = [
    'Tous',
    'Burundi',
    'Afrobeat',
    'Amapiano',
    'Hip-Hop',
    'Gospel',
    'R&B',
    'Afro-Fusion',
    'Reggae',
    'Zouk'
  ];

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSongIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlaylist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaylistSongIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSongs = songs.filter(s => {
    if (selectedGenre === 'Tous') return true;
    return s.genre.toLowerCase() === selectedGenre.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Platform Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Headphones className="w-4 h-4" />
              <span>SHIMA MUSIC PLATFORM</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              🎵 HIT MUSIC BURUNDI & AFROBEAT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Découvrez les dernières sorties musicales, les pépites de la scène burundaise et le classement hebdomadaire diffusé dans l'émission <strong>Hit Music Shima (14h-17h)</strong> sur 95.9 FM.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center">
              <span className="text-xl font-heading font-black text-amber-400">95.9</span>
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Top Hit Radio</p>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
          {[
            { id: 'sorties', label: '🎵 Dernières sorties' },
            { id: 'trending', label: '🔥 Musique tendance' },
            { id: 'top-burundi', label: '🇧🇮 Top Burundi' },
            { id: 'artistes', label: '🎤 Artistes & Albums' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filters (Req #14) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Genres :
        </span>
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedGenre === g
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map((song, index) => {
          const isLiked = likedSongIds[song.id];
          const isAdded = playlistSongIds[song.id];
          const isCurrentlyActive = activeSongId === song.id;

          return (
            <div
              key={song.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border transition-all p-4 flex flex-col justify-between shadow-xs hover:border-purple-300 dark:hover:border-purple-800 group ${
                isCurrentlyActive
                  ? 'border-purple-600 ring-2 ring-purple-400/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex gap-4">
                {/* Cover with Play Overlay */}
                <div 
                  onClick={() => onSelectSong(song)}
                  className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800 cursor-pointer shadow-md"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {song.isTopBurundi && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded uppercase">
                      Top BI
                    </span>
                  )}
                </div>

                {/* Song info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md inline-block">
                    {song.genre}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate mt-1 group-hover:text-purple-600 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {song.artist}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    ⏱ {song.duration} • {song.plays.toLocaleString()} écoutes
                  </p>
                </div>
              </div>

              {/* Action Buttons (Req #14: Écouter, J'aime, Playlist) */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectSong(song)}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                    isCurrentlyActive
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Écouter</span>
                </button>

                <button
                  onClick={(e) => toggleLike(song.id, e)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isLiked
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-800'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-600'
                  }`}
                  title="J'aime cette chanson"
                  aria-label="Aimer"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={(e) => togglePlaylist(song.id, e)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isAdded
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/40'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-emerald-600'
                  }`}
                  title="Ajouter à la playlist"
                  aria-label="Ajouter à la playlist"
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
