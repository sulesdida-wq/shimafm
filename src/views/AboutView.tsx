import React from 'react';
import { RadioTower, Heart, Target, Compass, Globe2, ShieldCheck, Award, Users } from 'lucide-react';
import { RADIO_INFO } from '../data/mockData';

interface AboutViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-red-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <RadioTower className="w-4 h-4" />
          <span>PORTRAIT D'UN GRAND MÉDIA BURUNDAIS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
          À PROPOS DE RADIO SHIMA FM 95.9
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed italic">
          « {RADIO_INFO.slogan} »
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Histoire & Identité */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center">
            <RadioTower className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Notre Histoire & Notre Identité
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Fondée à Rumonge (quartier Burunga), <strong>Radio Shima FM</strong> s'est rapidement imposée comme la référence radiophonique et médiatique incontournable au Burundi. Émettant sur la fréquence modulée <strong>95.9 FM</strong>, la station s'adresse à toutes les générations à travers une programmation riche, vivante et accessible en Kirundi et en Français.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Avec le développement de son portail web <strong>shimafm.org</strong>, Radio Shima FM connecte aujourd'hui les citoyens des 18 provinces burundaises et la diaspora répartie à travers le monde entier.
          </p>
        </div>

        {/* Ligne Éditoriale */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Ligne Éditoriale & Déontologie
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Radio Shima FM pratique un journalisme indépendant, rigoureux, vérifié et constructif. Notre rédaction s'interdit toute diffusion de rumeurs et met un point d'honneur à vérifier chaque information auprès des sources directes avant sa diffusion.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Nous donnons la parole aux citoyens, valorisons les initiatives de paix, le vivre-ensemble et le développement socio-économique durable de nos communautés.
          </p>
        </div>

      </div>

      {/* 3 Pillars: Mission, Vision, Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Notre Mission
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Informer avec exactitude, éduquer par des débats ouverts et divertir sainement la jeunesse et les familles avec le meilleur de la musique et de la culture.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Notre Vision
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Être le premier groupe de presse multimédia moderne et indépendant du Burundi, rayonnant en Afrique de l'Est et dans la région des Grands Lacs.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Nos Valeurs
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Vérité, neutralité, respect de la dignité humaine, promotion du patrimoine culturel burundais et proximité indéfectible avec nos auditeurs.
          </p>
        </div>

      </div>

      {/* Couverture & Fréquence */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-red-500 font-bold text-xs uppercase tracking-wider">COUVERTURE TERRITORIALE</span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold">
            95.9 FM : Couverture de Rumonge, Burunga et des rives du Lac Tanganyika
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Nos émetteurs principaux situés sur les hauteurs stratégiques arrosent la plaine de l'Imbo, le lac Tanganyika et s'étendent vers les provinces centrales. Le streaming HD mondial prend le relais sur shimafm.org.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => onNavigate('emissions')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors"
          >
            Découvrir la grille
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-slate-700 transition-colors"
          >
            Nous contacter
          </button>
        </div>
      </div>

    </div>
  );
};
