import React, { useState } from 'react';
import { Play, Clock, Youtube, ExternalLink, Maximize2 } from 'lucide-react';
import { VideoItem } from '../types';

interface VideosViewProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({ videos, onSelectVideo }) => {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const filteredVideos = videos;
  const featuredVideo = videos[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner avec la chaîne officielle YouTube @RadioShimaFM */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-red-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Youtube className="w-4 h-4 fill-current" />
              <span>CHAÎNE OFFICIELLE YOUTUBE • @RadioShimaFM</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              🎬 LES VIDÉOS & REPORTAGES DE RADIO SHIMA FM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Retrouvez l'intégralité des reportages exclusifs, enquêtes locales, interviews et éditions spéciales filmées par l'équipe de Radio Shima FM 95.9 FM à Rumonge et à travers tout le Burundi. Survolez une vidéo avec la souris pour lancer la lecture directe !
            </p>
          </div>

          {/* Bouton d'accès direct à la chaîne YouTube */}
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <a
              href="https://www.youtube.com/@RadioShimaFM"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/30 transition-all active:scale-95 group"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>S'abonner @RadioShimaFM</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-[11px] text-slate-400 text-center font-mono">
              Lecture directe au survol de la souris
            </span>
          </div>
        </div>
      </div>

      {/* Featured Video (Top Big Card) avec lecture directe au survol de la souris */}
      {featuredVideo && (
        <div
          className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group transition-all hover:border-red-300 dark:hover:border-red-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div 
              onMouseEnter={() => setHoveredVideoId(featuredVideo.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              className="lg:col-span-7 relative aspect-video bg-black overflow-hidden cursor-pointer"
            >
              {hoveredVideoId === featuredVideo.id && featuredVideo.youtubeId ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${featuredVideo.youtubeId}&controls=1&modestbranding=1&rel=0`}
                    title={featuredVideo.title}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute top-3 right-3 pointer-events-none bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg z-20">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>EN COURS DE LECTURE</span>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => onSelectVideo(featuredVideo)}
                  className="w-full h-full relative"
                >
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/85 text-white text-xs font-mono font-bold px-2 py-1 rounded">
                    {featuredVideo.duration}
                  </span>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                      À LA UNE • YOUTUBE
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-red-600">
                    {featuredVideo.category}
                  </span>
                  <span className="text-xs text-slate-400">• Chaîne @RadioShimaFM</span>
                </div>
                <h2 
                  onClick={() => onSelectVideo(featuredVideo)}
                  className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-red-600 transition-colors leading-snug cursor-pointer"
                >
                  {featuredVideo.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {featuredVideo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                    @RadioShimaFM
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredVideo.duration}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectVideo(featuredVideo)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>REGARDER EN GRAND</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid avec lecture directe au survol de la souris */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 group transition-all flex flex-col justify-between"
          >
            <div 
              onMouseEnter={() => setHoveredVideoId(video.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
            >
              {hoveredVideoId === video.id && video.youtubeId ? (
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
                    <Youtube className="w-3 h-3 text-red-500 fill-current" />
                    {video.category}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 
                  onClick={() => onSelectVideo(video)}
                  className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
                >
                  {video.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                    @RadioShimaFM
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {video.duration}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectVideo(video)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 uppercase flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>AGRANDIR</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
