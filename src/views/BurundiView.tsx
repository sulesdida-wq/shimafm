import React, { useState } from 'react';
import { MapPin, Building2, Flame, Eye, Calendar, User, ChevronRight, Globe2 } from 'lucide-react';
import { Article, Song, VideoItem } from '../types';
import { BURUNDI_PROVINCES } from '../data/mockData';
import { Sidebar } from '../components/Sidebar';

interface BurundiViewProps {
  articles: Article[];
  initialProvince?: string;
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const BurundiView: React.FC<BurundiViewProps> = ({
  articles,
  initialProvince = 'Toutes',
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>(initialProvince);

  const burundiArticles = articles.filter(a => {
    if (selectedProvince === 'Toutes') return a.category === 'burundi' || a.province;
    return a.province?.toLowerCase() === selectedProvince.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Globe2 className="w-4 h-4" />
          <span>PORTAIL RÉGIONAL DU BURUNDI</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <span>🇧🇮 ACTUALITÉS DU BURUNDI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Suivez en continu l'actualité des 18 provinces du Burundi : développement communautaire, agriculture, éducation, infrastructures, culture et société.
        </p>

        {/* 18 PROVINCES SELECTOR (Req #9) */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-xs font-bold text-amber-400 block mb-3 uppercase tracking-wider">
            Sélectionnez une province :
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {BURUNDI_PROVINCES.map((prov) => {
              const isSelected = selectedProvince.toLowerCase() === prov.toLowerCase();
              return (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md font-bold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                  }`}
                >
                  {prov === 'Toutes' ? '🌍 Toutes les provinces' : prov}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Province Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>
                {selectedProvince === 'Toutes'
                  ? 'Toutes les dépêches provinciales'
                  : `Actualités : Province de ${selectedProvince}`}
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {burundiArticles.length} article(s) trouvé(s)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {burundiArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 bg-slate-800 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {art.province || 'Burundi'}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                      <span className="font-semibold text-blue-800 dark:text-blue-400 uppercase">
                        {art.subcategory || art.category}
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
                    <span className="text-[11px] text-slate-400">
                      Par {art.author}
                    </span>
                    <span className="font-bold text-red-600 text-xs group-hover:translate-x-1 transition-transform">
                      Lire la suite →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {burundiArticles.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="font-heading font-bold text-base text-slate-800 dark:text-white">
                Dépêche en cours de rédaction pour la province de {selectedProvince}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Nos correspondants régionaux sont sur le terrain. Consultez les autres provinces ou l'accueil.
              </p>
              <button
                onClick={() => setSelectedProvince('Toutes')}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase"
              >
                Voir toutes les provinces
              </button>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={onToggleRadio}
            onSelectArticle={onSelectArticle}
            onNavigate={onNavigate}
          />
        </div>
      </div>

    </div>
  );
};
