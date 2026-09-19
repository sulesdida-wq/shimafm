import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RadioPlayer } from './components/RadioPlayer';
import { VideoModal } from './components/VideoModal';
import { CPanelExportModal } from './components/CPanelExportModal';

// Views
import { HomeView } from './views/HomeView';
import { NewsView } from './views/NewsView';
import { BurundiView } from './views/BurundiView';
import { CategoryView } from './views/CategoryView';
import { MusicView } from './views/MusicView';
import { SportsView } from './views/SportsView';
import { VideosView } from './views/VideosView';
import { ShowsView } from './views/ShowsView';
import { HostsView } from './views/HostsView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { SearchView } from './views/SearchView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

// Data & Types
import { Article, Song, VideoItem } from './types';
import { INITIAL_ARTICLES, INITIAL_SONGS, INITIAL_VIDEOS } from './data/mockData';

export default function App() {
  // Navigation & routing state
  const [currentView, setCurrentView] = useState<string>('accueil');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Content state (can be modified in Admin view)
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [songs] = useState<Song[]>(INITIAL_SONGS);
  const [videos] = useState<VideoItem[]>(INITIAL_VIDEOS);

  // Audio Radio Streaming state
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [radioVolume, setRadioVolume] = useState<number>(80);
  const [isRadioMuted, setIsRadioMuted] = useState<boolean>(false);
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // cPanel ZIP export modal
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedArticle]);

  // Handlers
  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    if (view !== 'article') {
      setSelectedArticle(null);
    }
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    // increment views locally
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, views: a.views + 1 } : a));
  };

  const handleToggleRadio = () => {
    setIsPlayingRadio(prev => !prev);
  };

  const handleRadioVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(100, newVol));
    setRadioVolume(clamped);
    if (clamped > 0 && isRadioMuted) {
      setIsRadioMuted(false);
    } else if (clamped === 0) {
      setIsRadioMuted(true);
    }
  };

  const handleToggleRadioMute = () => {
    setIsRadioMuted(prev => {
      const next = !prev;
      if (!next && radioVolume === 0) {
        setRadioVolume(75);
      }
      return next;
    });
  };

  const handleAddArticle = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleSearchSubmit = (query: string) => {
    setViewParam(query);
    setCurrentView('recherche');
  };

  // Render view router
  const renderView = () => {
    if (currentView === 'article' && selectedArticle) {
      return (
        <ArticleDetailView
          article={selectedArticle}
          articles={articles}
          songs={songs}
          videos={videos}
          isPlayingRadio={isPlayingRadio}
          onToggleRadio={handleToggleRadio}
          onSelectArticle={handleSelectArticle}
          onNavigate={handleNavigate}
          onBack={() => handleNavigate('accueil')}
        />
      );
    }

    switch (currentView) {
      case 'accueil':
        return (
          <HomeView
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
            onSelectVideo={(video) => setActiveVideo(video)}
            onSelectSong={(song) => {
              setActiveSong(song);
              handleNavigate('musique');
            }}
            radioVolume={radioVolume}
            onVolumeChange={handleRadioVolumeChange}
            isRadioMuted={isRadioMuted}
            onToggleMute={handleToggleRadioMute}
          />
        );

      case 'actualites':
        return (
          <NewsView
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );

      case 'burundi':
        return (
          <BurundiView
            articles={articles}
            initialProvince={viewParam || 'Toutes'}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );

      case 'societe':
      case 'politique':
      case 'economie':
      case 'culture':
        return (
          <CategoryView
            category={currentView}
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );

      case 'musique':
        return (
          <MusicView
            songs={songs}
            onSelectSong={(song) => setActiveSong(song)}
            activeSongId={activeSong?.id}
          />
        );

      case 'sports':
        return (
          <SportsView
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );

      case 'videos':
        return (
          <VideosView
            videos={videos}
            onSelectVideo={(video) => setActiveVideo(video)}
          />
        );

      case 'emissions':
        return (
          <ShowsView
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onNavigate={handleNavigate}
          />
        );

      case 'animateurs':
        return (
          <HostsView onNavigate={handleNavigate} />
        );

      case 'recherche':
        return (
          <SearchView
            articles={articles}
            initialQuery={viewParam || ''}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        );

      case 'a-propos':
        return (
          <AboutView onNavigate={handleNavigate} />
        );

      case 'contact':
        return (
          <ContactView />
        );

      case 'admin':
        return (
          <AdminView
            articles={articles}
            onAddArticle={handleAddArticle}
            onDeleteArticle={handleDeleteArticle}
            onSelectArticle={handleSelectArticle}
          />
        );

      default:
        return (
          <HomeView
            articles={articles}
            songs={songs}
            videos={videos}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
            onSelectVideo={(video) => setActiveVideo(video)}
            onSelectSong={(song) => {
              setActiveSong(song);
              handleNavigate('musique');
            }}
            radioVolume={radioVolume}
            onVolumeChange={handleRadioVolumeChange}
            isRadioMuted={isRadioMuted}
            onToggleMute={handleToggleRadioMute}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* 🔴 HEADER OFFICIEL AVEC SEARCH ET LIVE RADIO BAR */}
      <Header
        activeTab={currentView}
        onNavigate={handleNavigate}
        isPlayingRadio={isPlayingRadio}
        onToggleRadio={handleToggleRadio}
        onSearch={handleSearchSubmit}
      />

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {renderView()}
      </main>

      {/* 🔴 LECTEUR RADIO AUDIO (Section 5 & 44) */}
      <RadioPlayer
        isPlaying={isPlayingRadio}
        onTogglePlay={handleToggleRadio}
        volume={radioVolume}
        onVolumeChange={handleRadioVolumeChange}
        isMuted={isRadioMuted}
        onToggleMute={handleToggleRadioMute}
      />

      {/* FOOTER COMPLET AVEC LIENS & CONTACT */}
      <Footer
        onNavigate={handleNavigate}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* MODALE LECTEUR VIDÉO SHIMA TV */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* MODALE EXPORT ARCHIVE ZIP CPANEL */}
      <CPanelExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}
