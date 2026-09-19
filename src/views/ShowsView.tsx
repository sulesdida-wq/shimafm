import React, { useState } from 'react';
import { 
  Radio, 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  RadioTower, 
  Volume2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Show } from '../types';
import { SHOWS_DATA, RADIO_INFO } from '../data/mockData';

interface ShowsViewProps {
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const ShowsView: React.FC<ShowsViewProps> = ({
  isPlayingRadio,
  onToggleRadio,
  onNavigate,
}) => {
  const [selectedDayGroup, setSelectedDayGroup] = useState<string>('lundi');
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const scheduleLundi = [
    { time: '06h - 10h', show: 'Le Grand Matin Shima (Édition Lundi)', host: 'Jean-Claude Nizigiyimana & Chantal', genre: 'Matinée & Revue de la Semaine' },
    { time: '10h - 12h', show: 'Société & Débats Politiques', host: 'Aimé Nkurunziza', genre: 'Débats citoyens' },
    { time: '12h - 14h', show: 'Le Journal de Midi 95.9', host: 'Rédaction Centrale', genre: 'Information' },
    { time: '14h - 17h', show: 'Hit Music Shima (Top Départ)', host: 'Aline Hakizimana', genre: 'Musique & Nouveautés' },
    { time: '17h - 18h', show: 'Actualités Régionales & Provinces', host: 'Correspondants Rumonge & Burundi', genre: 'Provinces' },
    { time: '18h - 19h30', show: 'Shima Sport (Débrief Primus Ligue)', host: 'Faustin Ndikumana', genre: 'Sports' },
    { time: '19h30 - 20h', show: 'Grand Journal du Soir', host: 'Rédaction Centrale', genre: 'Grand Journal' },
    { time: '20h - 22h', show: 'Libre Antenne / Parole Citoyenne', host: 'Diane Nduwimana', genre: 'Débats' },
    { time: '22h - 00h', show: 'Nuit Douce Shima', host: 'Sélection Musicale', genre: 'Nocturne' },
  ];

  const scheduleMardi = [
    { time: '06h - 10h', show: 'Le Grand Matin Shima (Santé & Vie Pratique)', host: 'Jean-Claude & Invités Santé', genre: 'Santé & Matinale' },
    { time: '10h - 12h', show: 'Économie, Marchés & Agro-Business', host: 'Aimé Nkurunziza', genre: 'Économie locale' },
    { time: '12h - 14h', show: 'Le Journal de Midi 95.9', host: 'Rédaction Centrale', genre: 'Information' },
    { time: '14h - 17h', show: 'Hit Music Shima (Spécial Afrobeat)', host: 'Aline Hakizimana', genre: 'Hits Africains' },
    { time: '17h - 18h', show: 'Écho des Collines & Développement', host: 'Correspondants', genre: 'Société' },
    { time: '18h - 19h30', show: 'Shima Sport (Focus Basket & Athlétisme)', host: 'Faustin Ndikumana', genre: 'Sports' },
    { time: '19h30 - 20h', show: 'Grand Journal du Soir', host: 'Rédaction Centrale', genre: 'Grand Journal' },
    { time: '20h - 22h', show: 'Culture & Racines du Burundi', host: 'Diane Nduwimana', genre: 'Histoire' },
    { time: '22h - 00h', show: 'Nuit Douce Shima', host: 'Sélection Douceur', genre: 'Nocturne' },
  ];

  const scheduleMercredi = [
    { time: '06h - 10h', show: 'Le Grand Matin Shima (Jeunesse & Éducation)', host: 'Chantal & Jean-Claude', genre: 'Éducation' },
    { time: '10h - 12h', show: 'Génération Entreprendre Burundi', host: 'Aimé Nkurunziza', genre: 'Innovation' },
    { time: '12h - 14h', show: 'Le Journal de Midi 95.9', host: 'Rédaction Centrale', genre: 'Information' },
    { time: '14h - 17h', show: 'Hit Music Shima (Dédicaces en Direct)', host: 'Aline Hakizimana', genre: 'Dédicaces' },
    { time: '17h - 18h', show: 'Focus Femmes & Société', host: 'Diane Nduwimana', genre: 'Société' },
    { time: '18h - 19h30', show: 'Shima Sport (Coupes Continentales & Ligue des Champions)', host: 'Faustin Ndikumana', genre: 'Sports' },
    { time: '19h30 - 20h', show: 'Grand Journal du Soir', host: 'Rédaction Centrale', genre: 'Grand Journal' },
    { time: '20h - 22h', show: 'Soirée Acoustique & Poésie Burundaise', host: 'Diane Nduwimana', genre: 'Art & Musique' },
    { time: '22h - 00h', show: 'Nuit Douce Shima', host: 'Sélection Musicale', genre: 'Nocturne' },
  ];

  const scheduleJeudi = [
    { time: '06h - 10h', show: 'Le Grand Matin Shima (Environnement & Pêche Lac Tanganyika)', host: 'Jean-Claude Nizigiyimana', genre: 'Écologie & Matinale' },
    { time: '10h - 12h', show: 'Le Grand Débat Citoyen', host: 'Aimé Nkurunziza', genre: 'Débats de fond' },
    { time: '12h - 14h', show: 'Le Journal de Midi 95.9', host: 'Rédaction Centrale', genre: 'Information' },
    { time: '14h - 17h', show: 'Hit Music Shima (Rétro & Soukous)', host: 'Aline Hakizimana', genre: 'Nostalgie & Rythmes' },
    { time: '17h - 18h', show: 'La Voix des Communes', host: 'Correspondants', genre: 'Décentralisation' },
    { time: '18h - 19h30', show: 'Shima Sport (Avant-Match du Week-end)', host: 'Faustin Ndikumana', genre: 'Sports' },
    { time: '19h30 - 20h', show: 'Grand Journal du Soir', host: 'Rédaction Centrale', genre: 'Grand Journal' },
    { time: '20h - 22h', show: 'Le Club de la Presse 95.9', host: 'Journalistes invités', genre: 'Analyse Médias' },
    { time: '22h - 00h', show: 'Nuit Douce Shima', host: 'Sélection Musicale', genre: 'Nocturne' },
  ];

  const scheduleVendredi = [
    { time: '06h - 10h', show: 'Le Grand Matin Shima (Culture & Préparation Week-end)', host: 'Jean-Claude & Chantal', genre: 'Fête & Matinale' },
    { time: '10h - 12h', show: 'Sortir au Burundi : Guides & Événements', host: 'Diane Nduwimana', genre: 'Agenda Culturel' },
    { time: '12h - 14h', show: 'Le Journal de Midi 95.9', host: 'Rédaction Centrale', genre: 'Information' },
    { time: '14h - 17h', show: 'Hit Music Shima (Top 20 Hebdomadaire)', host: 'Aline Hakizimana', genre: 'Classement Officiel' },
    { time: '17h - 18h', show: 'Chronique Paix, Cohésion & Espoir', host: 'Aimé Nkurunziza', genre: 'Société' },
    { time: '18h - 19h30', show: 'Shima Sport (Le Grand Week-end Sportif)', host: 'Faustin Ndikumana', genre: 'Sports' },
    { time: '19h30 - 20h', show: 'Grand Journal du Soir', host: 'Rédaction Centrale', genre: 'Grand Journal' },
    { time: '20h - 22h', show: 'Vendredi Ambiance : Mix Live en Studio', host: 'DJ Bryan & Invités', genre: 'Mix DJ' },
    { time: '22h - 01h', show: 'Shima Clubbing Party', host: 'DJ Résidents 95.9', genre: 'Clubbing' },
  ];

  const scheduleWeekend = [
    { time: '07h - 10h', show: 'Le Réveil du Week-end', host: 'Chantal & Invités', genre: 'Détente' },
    { time: '10h - 13h', show: 'Gospel & Spiritualité', host: 'Pasteurs & Chorales', genre: 'Gospel' },
    { time: '13h - 15h', show: 'La Tribune Culturelle', host: 'Diane Nduwimana', genre: 'Traditions' },
    { time: '15h - 18h', show: 'Multiplex Primus Ligue & Sports', host: 'Faustin Ndikumana', genre: 'Direct Stade' },
    { time: '18h - 21h', show: 'Top 50 Hits Africains', host: 'Aline Hakizimana', genre: 'Classement' },
    { time: '21h - 00h', show: 'Shima Clubbing & Afrobeat Mix', host: 'DJ Résidents 95.9', genre: 'Mix DJ' },
  ];

  const getScheduleForDay = () => {
    switch (selectedDayGroup) {
      case 'lundi': return scheduleLundi;
      case 'mardi': return scheduleMardi;
      case 'mercredi': return scheduleMercredi;
      case 'jeudi': return scheduleJeudi;
      case 'vendredi': return scheduleVendredi;
      case 'samedi':
      case 'dimanche': return scheduleWeekend;
      default: return scheduleLundi;
    }
  };

  const activeSchedule = getScheduleForDay();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <RadioTower className="w-4 h-4" />
              <span>GRILLE OFFICIELLE 95.9 FM</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              🎙️ LES ÉMISSIONS DE RADIO SHIMA FM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              De l'aube au cœur de la nuit, 24h/24 et 7j/7, notre grille de programmes accompagne les Burundais avec rigueur, bonne humeur, proximité et amour de notre culture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleRadio}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
                isPlayingRadio ? 'bg-amber-400 text-slate-950' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingRadio ? 'Pause Radio' : 'Écouter en direct'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          GRILLE DES PROGRAMMES (Req #17)
          ================================================== */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase text-red-600">HORAIRES D'ANTENNE</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              📅 GRILLE DES PROGRAMMES 95.9 FM
            </h2>
          </div>

          {/* Day selection */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'lundi', label: 'Lundi' },
              { id: 'mardi', label: 'Mardi' },
              { id: 'mercredi', label: 'Mercredi' },
              { id: 'jeudi', label: 'Jeudi' },
              { id: 'vendredi', label: 'Vendredi' },
              { id: 'samedi', label: 'Samedi' },
              { id: 'dimanche', label: 'Dimanche' },
            ].map(tab => (
              <button
                key={tab.id}
                id={`schedule-tab-${tab.id}`}
                onClick={() => setSelectedDayGroup(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDayGroup === tab.id
                    ? 'bg-red-600 text-white shadow-md ring-2 ring-red-500/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activeSchedule.map((slot, index) => (
            <div
              key={index}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-28 font-mono font-bold text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg text-center">
                  {slot.time}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {slot.show}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Animé par {slot.host}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                  {slot.genre}
                </span>
                <span className="text-xs font-bold text-red-600 flex items-center">
                  95.9 FM
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          FICHES DÉTAILLÉES DES ÉMISSIONS (Req #17)
          ================================================== */}
      <section className="space-y-6">
        <div className="pb-3 border-b-2 border-slate-900 dark:border-slate-100">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
            🎙️ TOUTES LES ÉMISSIONS PHARES DE SHIMA FM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWS_DATA.map((show) => (
            <div
              key={show.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 bg-slate-800 overflow-hidden">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {show.category}
                </span>
                {show.isOnAirNow && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 animate-pulse">
                    ● En direct
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-mono font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{show.schedule}</span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {show.title}
                  </h3>

                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1.5 mt-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Avec {show.host}</span>
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {show.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {show.days}
                  </span>
                  <button
                    onClick={() => setSelectedShow(show)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 uppercase flex items-center gap-1"
                  >
                    <span>En savoir plus</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Show Detail Modal */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full text-white p-6 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                {selectedShow.category}
              </span>
              <button
                onClick={() => setSelectedShow(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕ Fermer
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img src={selectedShow.image} alt={selectedShow.title} className="w-full h-full object-cover" />
            </div>

            <h3 className="font-heading text-xl font-bold">{selectedShow.title}</h3>
            <p className="text-xs text-amber-400 font-mono">
              Diffusé {selectedShow.days} • {selectedShow.schedule} (95.9 FM)
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedShow.description}
            </p>
            <p className="text-xs text-slate-400">
              🎙️ Présenté par : <strong className="text-white">{selectedShow.host}</strong>
            </p>

            <button
              onClick={() => {
                setSelectedShow(null);
                onToggleRadio();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              Écouter l'antenne maintenant
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
