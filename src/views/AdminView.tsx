import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Radio, 
  CheckCircle2, 
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { Article, Category } from '../types';

interface AdminViewProps {
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  articles,
  onAddArticle,
  onDeleteArticle,
  onSelectArticle,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('burundi');
  const [province, setProvince] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Rédaction Shima FM');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) return;

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      summary,
      content,
      category,
      province: province || undefined,
      author,
      date: 'Aujourd’hui',
      time: '12:00',
      image: image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
      views: 120,
      readTime: '3 min',
      tags: ['Burundi', category, 'ShimaFM'],
      isTrending: true,
      isPopular: false
    };

    onAddArticle(newArticle);
    setTitle('');
    setSummary('');
    setContent('');
    setProvince('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>PANNEAU D'ÉDITION & BACKOFFICE</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            ADMINISTRATION & RÉDACTION SHIMA FM
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Gestion du flux des actualités, publication de dépêches et statistiques du portail shimafm.org.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-200">Serveur Live : Opérationnel</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase">Articles publiés</span>
          <p className="font-heading font-black text-2xl text-slate-900 dark:text-white mt-1">
            {articles.length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase">Lectures cumulées</span>
          <p className="font-heading font-black text-2xl text-red-600 mt-1">
            {totalViews.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase">Auditeurs streaming live</span>
          <p className="font-heading font-black text-2xl text-amber-500 mt-1">
            1 482
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs text-slate-400 font-semibold uppercase">Fréquence Hertzienne</span>
          <p className="font-heading font-black text-2xl text-blue-600 mt-1">
            95.9 FM
          </p>
        </div>
      </div>

      {/* Form: Add New Article */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-red-600" />
            <span>Publier une nouvelle dépêche</span>
          </h2>
          <span className="text-xs text-slate-400">Diffusion instantanée</span>
        </div>

        {successMsg && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Article publié avec succès sur le portail et indexé dans le flux d'actualités !</span>
          </div>
        )}

        <form onSubmit={handleCreateArticle} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Titre de l'article *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Le port de Bujumbura renforce ses liaisons lacustres..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Catégorie *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
              >
                <option value="burundi">Burundi</option>
                <option value="actualites">Actualités</option>
                <option value="politique">Politique</option>
                <option value="economie">Économie</option>
                <option value="societe">Société</option>
                <option value="culture">Culture</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Province (si Burundi)</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Ex: Bujumbura, Gitega, Rumonge..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Auteur / Reporter *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nom du journaliste"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">URL Image principale</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600 font-mono text-[11px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Chapeau / Résumé (1-2 phrases) *</label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Résumé percutant pour la page d'accueil..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Corps complet de l'article *</label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez l'article complet ici..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Mettre en ligne l'article</span>
          </button>
        </form>
      </div>

      {/* Existing Articles Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
          Articles en ligne ({articles.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Titre</th>
                <th className="py-2.5 px-3">Catégorie</th>
                <th className="py-2.5 px-3">Auteur</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-center">Vues</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                    {art.title}
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{art.author}</td>
                  <td className="py-3 px-3 text-slate-500">{art.date}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                    {art.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button
                      onClick={() => onSelectArticle(art)}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => onDeleteArticle(art.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
