import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  format: '970x90' | '728x90' | '300x250' | '320x100';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ format, className = '' }) => {
  const getDimensions = () => {
    switch (format) {
      case '970x90':
        return 'w-full max-w-[970px] min-h-[90px] hidden lg:flex';
      case '728x90':
        return 'w-full max-w-[728px] min-h-[90px] hidden md:flex';
      case '300x250':
        return 'w-full max-w-[300px] min-h-[250px] mx-auto flex';
      case '320x100':
        return 'w-full max-w-[320px] min-h-[100px] flex md:hidden';
      default:
        return 'w-full min-h-[90px] flex';
    }
  };

  return (
    <aside
      id={`ad-banner-${format}`}
      aria-label={`Espace publicitaire ${format}`}
      className={`my-6 mx-auto flex-col items-center justify-center rounded-lg border border-slate-200 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-3 text-center transition-all hover:border-slate-300 ${getDimensions()} ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <Megaphone className="h-3 w-3 text-amber-500" />
        <span>PUBLICITÉ</span>
      </div>
      <div className="mt-1 flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-700">
          Votre marque sur SHIMA FM 95.9 & shimafm.org
        </span>
        <span className="text-[11px] text-slate-500">
          Contact régie pub : <strong className="text-blue-900">publicite@shimafm.org</strong> | +257 22 25 95 90
        </span>
      </div>
      <div className="mt-1.5 inline-block rounded border border-blue-200 bg-white px-2.5 py-0.5 text-[10px] font-medium text-blue-800 shadow-2xs">
        Format {format}
      </div>
    </aside>
  );
};
