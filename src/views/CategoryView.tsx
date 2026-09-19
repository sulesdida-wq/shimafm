import React, { useState } from 'react';
import { 
  Users2, 
  Landmark, 
  TrendingUp, 
  Palette, 
  Calendar, 
  User, 
  Eye, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Article, Category, Song, VideoItem } from '../types';
import { Sidebar } from '../components/Sidebar';

interface CategoryViewProps {
  category: 'societe' | 'politique' | 'economie' | 'culture';
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
}) => {
  const getCategoryMeta = () => {
    switch (category) {
      case 'societe':
        return {
          title: '🧑🤝🧑 SOCIÉTÉ',
          subtitle: 'Éducation, Santé, Jeunesse, Environnement et Vie quotidienne au Burundi',
          icon: Users2,
          color: 'from-emerald-950 to-slate-900',
          badgeColor: 'bg-emerald-600',
          subcategories: [
            'Toutes',
            'Éducation',
            'Santé',
            'Jeunesse',
            'Emploi',
            'Environnement',
            'Vie quotidienne',
            'Communautés',
            'Développement'
          ]
        };
      case 'politique':
        return {
          title: '🏛️ POLITIQUE',
          subtitle: 'Actualités institutionnelles, Parlement, Gouvernement et Déclarations publiques',
          icon: Landmark,
          color: 'from-blue-950 to-slate-900',
          badgeColor: 'bg-blue-700',
          subcategories: [
            'Toutes',
            'Actualités politiques',
            'Institutions',
            'Gouvernement',
            'Parlement',
            'Collectivités',
            'Déclarations publiques'
          ]
        };
      case 'economie':
        return {
          title: '💰 ÉCONOMIE',
          subtitle: 'Entrepreneuriat, Café & Thé, Commerce, Agriculture, Finance et Technologie',
          icon: TrendingUp,
          color: 'from-amber-950 to-slate-900',
          badgeColor: 'bg-amber-600',
          subcategories: [
            'Toutes',
            'Entrepreneuriat',
            'Commerce',
            'Agriculture',
            'Finance',
            'Technologie',
            'Investissement',
            'Emploi',
            'Développement'
          ]
        };
      case 'culture':
        return {
          title: '🎭 CULTURE',
          subtitle: 'Tambours sacrés, Arts, Cinéma, Traditions, Danse, Mode et Littérature burundaise',
          icon: Palette,
          color: 'from-purple-950 to-slate-900',
          badgeColor: 'bg-purple-600',
          subcategories: [
            'Toutes',
            'Arts',
            'Cinéma',
            'Traditions',
            'Patrimoine',
            'Danse',
            'Mode',
            'Littérature',
            'Événements culturels'
          ]
        };
    }
  };

  const meta = getCategoryMeta();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('Toutes');

  const catArticles = articles.filter(a => a.category === category);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className={`bg-gradient-to-r ${meta.color} text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-amber-400">
          <meta.icon className="w-4 h-4" />
          <span>RUBRIQUE THÉMATIQUE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
          {meta.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {meta.subtitle}
        </p>

        {/* Subcategories */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Sous-thématiques :</span>
          <div className="flex flex-wrap gap-2">
            {meta.subcategories.map((sub) => {
              const isSelected = selectedSubcat.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcat(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Articles + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Les publications récentes
            </h2>
            <span className="text-xs text-slate-400">
              {catArticles.length} article(s)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {catArticles.map((art) => (
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
                  <span className={`absolute top-3 left-3 ${meta.badgeColor} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                    {art.subcategory || art.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {art.date}
                      </span>
                      <span>•</span>
                      <span>{art.readTime}</span>
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

          {catArticles.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">Aucun article dans cette catégorie pour le moment.</p>
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
