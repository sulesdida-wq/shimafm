import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Flame, 
  ChevronRight, 
  Award,
  ArrowRight,
  TrendingUp,
  User
} from 'lucide-react';
import { Article, Song, VideoItem } from '../types';
import { SPORTS_MATCHES, SPORTS_STANDINGS } from '../data/mockData';
import { Sidebar } from '../components/Sidebar';

interface SportsViewProps {
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SportsView: React.FC<SportsViewProps> = ({
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'tous' | 'resultats' | 'classement' | 'calendrier'>('tous');
  
  const sportsArticles = articles.filter(a => a.category === 'sports');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" />
              <span>SHIMA SPORT EXPRESS</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              ⚽ TOUT LE SPORT AU BURUNDI & DANS LE MONDE
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Primus Ligue, Intamba mu Rugamba, basketball bujumburois, athlétisme, compétitions CAF et grands championnats avec l'équipe des reporters sportifs de 95.9 FM.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              ⚽
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Émission quotidienne :</span>
              <strong className="text-sm text-white">Shima Sport (18h-19h30)</strong>
            </div>
          </div>
        </div>

        {/* Section Tabs (Req #15) */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
          {[
            { id: 'tous', label: '📰 Dernières nouvelles' },
            { id: 'resultats', label: '🏆 Résultats Primus Ligue' },
            { id: 'classement', label: '📊 Classement officiel' },
            { id: 'calendrier', label: '📅 Calendrier des matchs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Sport Matches / Standings + Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-8">
          
          {/* Matchs en direct & derniers scores (Req #15: Résultats) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>RÉSULTATS & RENCONTRES — PRIMUS LIGUE BURUNDI</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-400">J12 / J13</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPORTS_MATCHES.map((match) => (
                <div
                  key={match.id}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-semibold text-emerald-600">{match.league}</span>
                    <span className="font-mono">{match.date} • {match.time}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1 text-right font-bold text-xs sm:text-sm text-slate-800 dark:text-white truncate">
                      {match.homeTeam}
                    </div>

                    <div className="px-4 py-1 mx-2 rounded-lg bg-slate-900 text-white font-mono font-black text-sm tracking-wider">
                      {match.status === 'Terminé' ? `${match.homeScore} - ${match.awayScore}` : 'VS'}
                    </div>

                    <div className="flex-1 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-white truncate">
                      {match.awayTeam}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px]">
                    <span className={`font-bold uppercase ${match.status === 'Terminé' ? 'text-slate-500' : 'text-emerald-500'}`}>
                      ● {match.status}
                    </span>
                    <span className="text-slate-400">Stade Intwari</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classement officiel (Req #15: Classements) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>CLASSEMENT PROVISOIRE PRIMUS LIGUE</span>
              </h3>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Rang</th>
                  <th className="py-2.5 px-3">Club</th>
                  <th className="py-2.5 px-3 text-center">J</th>
                  <th className="py-2.5 px-3 text-center">V</th>
                  <th className="py-2.5 px-3 text-center">N</th>
                  <th className="py-2.5 px-3 text-center">D</th>
                  <th className="py-2.5 px-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {SPORTS_STANDINGS.map((team) => (
                  <tr key={team.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-bold text-slate-500">{team.rank}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{team.team}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{team.played}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{team.won}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{team.draw}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{team.lost}</td>
                    <td className="py-3 px-3 text-right font-black text-emerald-600 text-sm font-mono">
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Articles de sport */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              📰 CHRONIQUES & REPORTAGES SPORTIFS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sportsArticles.map((art) => (
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
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {art.subcategory || 'Sports'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">
                        {art.date} • {art.views.toLocaleString()} vues
                      </span>
                      <span className="font-bold text-emerald-600 text-xs group-hover:translate-x-1 transition-transform">
                        Lire →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

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
