import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Share2, 
  MessageSquare, 
  ChevronLeft, 
  Copy, 
  Check, 
  Send, 
  Flame, 
  Bookmark,
  ThumbsUp,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { Article, Comment, Song, VideoItem } from '../types';
import { Sidebar } from '../components/Sidebar';
import { AdBanner } from '../components/AdBanner';

interface ArticleDetailViewProps {
  article: Article;
  articles: Article[];
  songs: Song[];
  videos: VideoItem[];
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: string, param?: string) => void;
  onBack: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  articles,
  songs,
  videos,
  isPlayingRadio,
  onToggleRadio,
  onSelectArticle,
  onNavigate,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Eulade Ndayishimiye',
      date: 'Aujourd’hui à 11:24',
      content: 'Excellent reportage de Shima FM. Cette précision sur le terrain fait la différence avec les autres médias.',
      likes: 8
    },
    {
      id: 'c2',
      author: 'Claverie Niyonzima',
      date: 'Hier à 19:45',
      content: 'Merci à la rédaction pour cette analyse impartiale. Nous attendons la suite des mesures gouvernementales.',
      likes: 4
    }
  ]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Related articles (same category, different id)
  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.province === article.province))
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(l => l + 1);
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorName.trim() && commentText.trim()) {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: authorName.trim(),
        date: 'À l’instant',
        content: commentText.trim(),
        likes: 0
      };
      setComments([newComment, ...comments]);
      setAuthorName('');
      setAuthorEmail('');
      setCommentText('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 4000);
    }
  };

  // Social share URLs
  const articleUrl = encodeURIComponent(`https://shimafm.org/article/${article.slug}`);
  const articleTitle = encodeURIComponent(article.title);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux actualités</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Rubrique :</span>
          <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase">
            {article.category}
          </span>
          {article.province && (
            <span className="bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded">
              {article.province}
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Article + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Article Content (8 cols) */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Header Metadata (Req #19) */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-red-600 font-bold uppercase tracking-wider">
              <span>{article.category}</span>
              {article.subcategory && (
                <>
                  <span>•</span>
                  <span className="text-slate-500 dark:text-slate-400">{article.subcategory}</span>
                </>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-red-600 pl-4 py-1">
              {article.summary}
            </p>

            {/* Author, Date, Views, Read Time */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                  {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{article.author}</span>
                  <span className="text-[11px] text-slate-400">Journaliste Rédaction Shima FM</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date} à {article.time}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-red-600">
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString()} lectures
                </span>
              </div>
            </div>
          </header>

          {/* Social Share Buttons (Req #19) */}
          <div className="py-3 px-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-red-600" />
              <span>Partager cet article :</span>
            </span>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${articleTitle}%20${articleUrl}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                X (Twitter)
              </a>
              <button
                onClick={handleCopyLink}
                className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-100"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Lien'}</span>
              </button>
            </div>
          </div>

          {/* Featured Image with Caption */}
          <div className="space-y-2">
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-slate-900">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-slate-500 italic text-center">
              Photo : Agence Shima Média / Correspondant de presse à {article.province || 'Bujumbura'}.
            </p>
          </div>

          {/* Full Article Text Body */}
          <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-5">
            <p className="font-semibold text-slate-900 dark:text-white">
              Bujumbura — {article.summary}
            </p>

            {Array.isArray(article.content) ? (
              article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{article.content}</p>
            )}

            {/* In-article Advertisement Slot (Req #19) */}
            <div className="my-6">
              <AdBanner format="728x90" />
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              Des répercussions directes sur les communautés
            </h3>

            <p>
              Sur le terrain, les acteurs de la société civile et les autorités locales saluent ces dynamiques qui redonnent un nouvel élan aux initiatives burundaises. Les citoyens interrogés par nos correspondants expriment leur volonté d'accompagner durablement ces progrès.
            </p>

            {/* Blockquote journalistique */}
            <blockquote className="my-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-600 text-slate-800 dark:text-slate-200 italic font-medium">
              « Notre priorité absolue demeure d'informer avec la plus grande rigueur chaque Burundais, afin que les voix de l'intérieur comme de la capitale trouvent un écho fidèle à la radio. »
              <span className="block not-italic text-xs font-bold text-red-600 mt-2">
                — Rédaction Radio Shima FM 95.9
              </span>
            </blockquote>

            <p>
              Radio Shima FM continuera d'assurer le suivi de ce dossier dans ses prochains journaux parlés de 12h00 et 19h30 sur la fréquence 95.9 FM ainsi que sur ses plateformes numériques officielles.
            </p>
          </div>

          {/* Likes and reaction */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                hasLiked
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Utile ({likes})</span>
            </button>

            {/* Tags (Req #19) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {article.tags.map(t => (
                <span
                  key={t}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* ==================================================
              ARTICLES SIMILAIRES (Req #19)
              ================================================== */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-600" />
              <span>SUR LE MÊME SUJET</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group cursor-pointer bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200 dark:border-slate-700/60 space-y-2 hover:border-red-400"
                >
                  <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-900">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-[10px] font-bold text-red-600 uppercase">{rel.category}</span>
                  <h4 className="font-heading text-xs font-bold text-slate-800 dark:text-white line-clamp-2 group-hover:text-red-600">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              ESPACE COMMENTAIRES (Req #19)
              ================================================== */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>COMMENTAIRES ({comments.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Modération par Radio Shima FM</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Laisser un commentaire :
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Votre nom complet *"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="Votre e-mail (ne sera pas publié) *"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <textarea
                required
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Exprimez votre point de vue avec courtoisie..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              ></textarea>

              <div className="flex items-center justify-between pt-1">
                {commentSubmitted ? (
                  <span className="text-xs text-emerald-600 font-semibold">
                    ✓ Votre commentaire a été publié avec succès !
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Respectez la charte éditoriale de Shima FM.</span>
                )}

                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>

            {/* Comments list */}
            <div className="space-y-3">
              {comments.map((com) => (
                <div key={com.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{com.author}</span>
                    <span className="text-slate-400 text-[11px]">{com.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {com.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </article>

        {/* Sidebar (4 cols) */}
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
