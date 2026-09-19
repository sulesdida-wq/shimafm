import React, { useState } from 'react';
import { 
  Newspaper, 
  Flame, 
  TrendingUp, 
  Calendar, 
  User, 
  Eye, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Article, Category } from '../types';
import { Sidebar } from '../components/Sidebar';
import { Song, VideoItem } from '../types';

interface NewsViewProps {
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'trending' | Category>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filtering
  const filteredArticles = articles.filter((art) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'popular') return art.isPopular;
    if (selectedFilter === 'trending') return art.isTrending;
    return art.category === selectedFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const displayedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const heroTop = articles.find(a => a.isHero) || articles[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" />
              <span>LE FIL CONTINU</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              📰 ACTUALITÉS DU BURUNDI & DU MONDE
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              L'information vérifiée, rigoureuse et en temps réel par la rédaction de SHIMA FM 95.9.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'trending', label: '🔥 Tendances' },
              { id: 'popular', label: '⭐ Populaires' },
              { id: 'burundi', label: 'Burundi' },
              { id: 'politique', label: 'Politique' },
              { id: 'economie', label: 'Économie' },
              { id: 'societe', label: 'Société' },
              { id: 'sports', label: 'Sports' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setSelectedFilter(pill.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedFilter === pill.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Articles + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* News Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* List of articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayedArticles.map((art) => (
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
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {art.category}
                    </span>
                    {art.isTrending && (
                      <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                        Trend
                      </span>
                    )}
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

                    <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {art.readTime} • {art.views.toLocaleString()} vues
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400 text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Lire la suite →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {displayedArticles.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">Aucun article trouvé dans cette sélection pour le moment.</p>
            </div>
          )}

          {/* ==================================================
              PAGINATION (Req #8: 1 2 3 4 5 →)
              ================================================== */}
          <nav aria-label="Pagination des actualités" className="pt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              ← Précédent
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(5, p + 1))}
              disabled={currentPage === 5}
              className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Suivant →
            </button>
          </nav>

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
