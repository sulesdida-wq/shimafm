import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Minimize2, 
  RadioTower, 
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
  User
} from 'lucide-react';
import { RADIO_STREAM_URL, DIRECT_STREAM_URL, RADIO_INFO, SHOWS_DATA } from '../data/mockData';

interface RadioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const RadioPlayer: React.FC<RadioPlayerProps> = ({ 
  isPlaying, 
  onTogglePlay,
  volume: controlledVolume,
  onVolumeChange: controlledOnVolumeChange,
  isMuted: controlledIsMuted,
  onToggleMute: controlledOnToggleMute
}) => {
  const [internalVolume, setInternalVolume] = useState<number>(80);
  const [internalIsMuted, setInternalIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);

  const volume = controlledVolume !== undefined ? controlledVolume : internalVolume;
  const isMuted = controlledIsMuted !== undefined ? controlledIsMuted : internalIsMuted;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isTonePlayingRef = useRef<boolean>(false);

  const currentShow = SHOWS_DATA.find(s => s.isOnAirNow) || SHOWS_DATA[0];

  // Handle Play/Pause logic with audio element or synthetic ambiance generator
  useEffect(() => {
    if (isPlaying) {
      setStreamError(null);

      // Détecter l'URL du flux audio appropriée avec chaîne de repli robuste pour cPanel / Node
      const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
      const streamCandidates: string[] = isHttps
        ? ['/api/stream', 'stream.php', './stream.php', DIRECT_STREAM_URL]
        : [DIRECT_STREAM_URL, '/api/stream', 'stream.php'];

      let currentStreamIndex = 0;

      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
      audio.src = streamCandidates[currentStreamIndex];

      audio.onerror = () => {
        currentStreamIndex++;
        if (currentStreamIndex < streamCandidates.length) {
          const nextUrl = streamCandidates[currentStreamIndex];
          console.warn(`Tentative de connexion au flux alternatif (${currentStreamIndex + 1}/${streamCandidates.length}): ${nextUrl}`);
          audio.src = nextUrl;
          audio.load();
          audio.play().catch((err) => {
            console.warn(`Erreur tentative ${nextUrl}:`, err);
          });
        } else {
          setStreamError("Flux temporairement indisponible.");
        }
      };

      audio.onplaying = () => {
        setStreamError(null);
      };

      audio.volume = isMuted ? 0 : volume / 100;
      audio.muted = isMuted || volume === 0;
      audio.play().catch((err) => {
        console.warn("Audio play error (en attente d'interaction):", err);
      });

      audioRef.current = audio;
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
        audioRef.current = null;
      }
    }

    return () => {
      stopDemoChime();
    };
  }, [isPlaying]);

  // Handle Volume and Mute
  useEffect(() => {
    const actualVol = isMuted ? 0 : volume / 100;
    if (audioRef.current) {
      audioRef.current.volume = actualVol;
      audioRef.current.muted = isMuted || volume === 0;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = actualVol * 0.15; // Keep synthesizer soft and pleasant
    }
  }, [volume, isMuted]);

  // Gentle acoustic radio chime generator using Web Audio API
  const startDemoChime = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (isTonePlayingRef.current) return;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : (volume / 100) * 0.1, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      // Soft radio drone oscillator (warm musical 432Hz ambient note)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4 warm pitch
      osc.connect(gain);
      osc.start();
      oscillatorRef.current = osc;
      isTonePlayingRef.current = true;
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const stopDemoChime = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      isTonePlayingRef.current = false;
    } catch {
      // ignore
    }
  };

  const setVolumeValue = (newVol: number) => {
    const clamped = Math.max(0, Math.min(100, newVol));
    if (controlledOnVolumeChange) {
      controlledOnVolumeChange(clamped);
    } else {
      setInternalVolume(clamped);
      if (clamped > 0 && internalIsMuted) {
        setInternalIsMuted(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolumeValue(newVol);
  };

  const toggleMute = () => {
    if (controlledOnToggleMute) {
      controlledOnToggleMute();
    } else {
      setInternalIsMuted(!internalIsMuted);
    }
  };

  return (
    <>
      {/* EXPANDED LIVE STUDIO MODAL / DRAWER */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full text-white overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-red-950 p-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg">
                  <RadioTower className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      EN DIRECT
                    </span>
                    <span className="text-amber-400 font-bold font-mono text-sm">95.9 FM</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">SHIMA FM — STUDIO LIVE</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800 shadow-md group">
                  <img 
                    src={currentShow.image} 
                    alt={currentShow.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="text-xs text-red-400 font-bold uppercase tracking-wider">{currentShow.category}</span>
                      <h4 className="text-lg font-bold text-white leading-tight">{currentShow.title}</h4>
                      <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {currentShow.host}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Horaire de diffusion</span>
                    </div>
                    <p className="font-bold text-white text-sm">{currentShow.time} • {currentShow.days}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{currentShow.description}</p>
                  </div>

                  {/* Equalizer animation when playing */}
                  <div className="bg-slate-800/60 rounded-xl p-4 flex items-center justify-between border border-slate-700/60">
                    <div className="flex items-center gap-1.5 h-8">
                      <span className={`w-1.5 bg-red-500 rounded-full ${isPlaying ? 'animate-eq-1' : 'h-2'}`}></span>
                      <span className={`w-1.5 bg-amber-400 rounded-full ${isPlaying ? 'animate-eq-2' : 'h-3'}`}></span>
                      <span className={`w-1.5 bg-blue-500 rounded-full ${isPlaying ? 'animate-eq-3' : 'h-4'}`}></span>
                      <span className={`w-1.5 bg-emerald-400 rounded-full ${isPlaying ? 'animate-eq-4' : 'h-2'}`}></span>
                      <span className={`w-1.5 bg-red-400 rounded-full ${isPlaying ? 'animate-eq-5' : 'h-5'}`}></span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {isPlaying ? 'FLUX AUDIO ACTIF • 128 KBPS' : 'LECTEUR EN PAUSE'}
                    </span>
                  </div>

                  {/* Direct Contact Studio */}
                  <div className="flex items-center gap-2">
                    <a 
                      href={`tel:${RADIO_INFO.phone}`} 
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Standard Studio</span>
                    </a>
                    <a 
                      href={`https://wa.me/${RADIO_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Large Controls */}
              <div className="bg-slate-950 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
                <button
                  onClick={onTogglePlay}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95 ${
                    isPlaying 
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                      : 'bg-red-600 text-white hover:bg-red-500'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{isPlaying ? 'Mettre en pause' : 'Lancer le direct 95.9 FM'}</span>
                </button>

                {/* Volume Slider */}
                <div 
                  className="flex items-center gap-3 select-none"
                  onWheel={(e) => {
                    e.preventDefault();
                    const current = isMuted ? 0 : volume;
                    if (e.deltaY < 0) {
                      setVolumeValue(Math.min(100, current + 5));
                    } else if (e.deltaY > 0) {
                      setVolumeValue(Math.max(0, current - 5));
                    }
                  }}
                  title="Utilisez la molette de la souris pour régler le volume"
                >
                  <button onClick={toggleMute} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onInput={(e) => setVolumeValue(Number((e.target as HTMLInputElement).value))}
                    className="w-28 accent-red-600 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-400 w-8 text-right">{isMuted ? '0%' : `${volume}%`}</span>
                </div>
              </div>

              {/* Note about real stream url */}
              <div className="text-[11px] text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Note technique administrateur :</strong> Pour connecter le flux audio réel de votre émetteur Icecast ou Shoutcast, configurez la constante <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">RADIO_STREAM_URL</code> dans le fichier de configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
