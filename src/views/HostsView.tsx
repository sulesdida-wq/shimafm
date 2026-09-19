import React from 'react';
import { User, Radio, Mic, Award, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react';
import { HOSTS_DATA } from '../data/mockData';

interface HostsViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const HostsView: React.FC<HostsViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Mic className="w-4 h-4" />
          <span>LA RÉDACTION & L'ANTENNE 95.9 FM</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
          🎙️ NOS JOURNALISTES & ANIMATEURS
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Rencontrez les voix familières qui vous informent, vous divertissent et donnent la parole aux citoyens burundais chaque jour sur Radio Shima FM.
        </p>
      </div>

      {/* Grid of Hosts (Req #18) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOSTS_DATA.map((host) => (
          <div
            key={host.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo & Role */}
              <div className="relative aspect-4/3 bg-slate-800 overflow-hidden">
                <img
                  src={host.photo}
                  alt={host.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {host.role}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white mt-1">
                    {host.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Shows */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {host.bio}
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5 tracking-wider">
                    Émission(s) présentée(s) :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(host.shows || (host.show ? [host.show] : ['Émission 95.9 FM'])).map((showName, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                      >
                        <Radio className="w-3 h-3 text-red-600" />
                        <span>{showName}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
              <span className="text-xs font-mono text-slate-400">
                {host.socials?.twitter || host.social?.twitter || '@shimafm'}
              </span>
              <button
                onClick={() => onNavigate('emissions')}
                className="text-xs font-bold text-red-600 hover:text-red-700 uppercase flex items-center gap-1"
              >
                <span>Programmes</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
