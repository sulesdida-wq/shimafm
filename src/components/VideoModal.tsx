import React from 'react';
import { X, Play, Clock, Share2, Youtube, ExternalLink } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const youtubeWatchUrl = video.youtubeId 
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : 'https://www.youtube.com/@RadioShimaFM';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full text-white overflow-hidden shadow-2xl animate-in zoom-in-95">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase flex items-center gap-1">
              <Youtube className="w-3 h-3 fill-current" />
              {video.category}
            </span>
            <span className="text-xs text-slate-400">Radio Shima FM • @RadioShimaFM</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-red-600 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors font-medium"
              title="Regarder sur YouTube"
            >
              <Youtube className="w-3.5 h-3.5 text-red-400 group-hover:text-white fill-current" />
              <span className="hidden sm:inline">Sur YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl mb-3">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="text-sm font-semibold text-white">Lecture vidéo HD SHIMA FM</p>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  Reportage exclusif filmé par les correspondants de Radio Shima FM au Burundi.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info & Description */}
        <div className="p-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
              {video.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-red-400 font-semibold">
              <Youtube className="w-3.5 h-3.5 fill-current" />
              Chaîne @RadioShimaFM
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Durée : {video.duration}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            {video.description}
          </p>

          <div className="pt-2 flex justify-end">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Regarder et s'abonner sur YouTube (@RadioShimaFM)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
