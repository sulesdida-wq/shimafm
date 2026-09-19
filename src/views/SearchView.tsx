import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';
import { Article, Category } from '../types';

interface SearchViewProps {
  articles: Article[];
  initialQuery?: string;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  articles,
  initialQuery = '',
  onSelectArticle,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const categories = ['Toutes', 'burundi', 'actualites', 'politique', 'economie', 'societe', 'culture', 'sports', 'musique'];

  const results = articles.filter(art => {
    const matchesSearch = 
      !searchTerm.trim() ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.province && art.province.toLowerCase().includes(searchTerm.toLowerCase())) ||
      art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'Toutes' || art.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views;
    return 0; // already sorted by recent
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Search Box (Req #21) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Search className="w-6 h-6 text-red-500" />
          <span>RECHERCHE D'INFORMATIONS SHIMA FM</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Recherchez parmi l'ensemble des dépêches, reportages, chroniques culturelles et émissions de Radio Shima FM 95.9.
        </p>

        {/* Input bar */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par mot-clé, ville (Bujumbura, Gitega...), artiste, personnalité..."
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 shadow-inner"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Filters (Req #21: Catégorie, Tri) */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Rubrique :</span>
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-hidden"
            >
              <option value="recent">Plus récents</option>
              <option value="popular">Plus consultés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {searchTerm ? `Résultats pour « ${searchTerm} »` : 'Toutes les archives disponibles'}
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            {results.length} résultat(s)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 group cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 bg-slate-800 overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {art.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase">
                    {art.province || art.subcategory}
                  </span>
                  <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 mt-1">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{art.date}</span>
                  <span className="font-bold text-red-600 text-xs">Lire →</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <Search className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white">
              Aucun résultat pour cette recherche
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Essayez avec d'autres mots-clés comme "Bujumbura", "Café", "Primus", "Culture" ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Toutes');
              }}
              className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl uppercase"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
