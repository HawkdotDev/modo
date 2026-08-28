import { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Keyboard, 
  Heart, 
  Github, 
  Brain, 
  Layers, 
  Radio, 
  Clock, 
  Waves,
  Zap
} from 'lucide-react';
import { PomodoroIcon } from './Navbar';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

export function AboutModal({ isOpen, onClose, accentColor = '#f43f5e' }: AboutModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modo-title"
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-neutral-900/95 border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-3xl text-white space-y-6 overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Radial Glow */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div 
              style={{ color: accentColor, filter: `drop-shadow(0 0 14px ${accentColor}90)` }}
              className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.1]"
            >
              <PomodoroIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="about-modo-title" className="text-xl font-bold tracking-tight text-white m-0">
                  Modo
                </h2>
                <span 
                  className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border"
                  style={{ 
                    backgroundColor: `${accentColor}20`,
                    borderColor: `${accentColor}40`,
                    color: accentColor 
                  }}
                >
                  v1.1.0 • Deep Work Studio
                </span>
              </div>
              <p className="text-xs text-neutral-400 m-0 mt-0.5">Aesthetic Interval Timer & Cognitive Flow Environment</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all duration-150"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Philosophy & Executive Summary */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs leading-relaxed text-neutral-300">
          <p className="font-medium text-neutral-100 flex items-center gap-1.5 text-sm">
            <Zap size={15} style={{ color: accentColor }} />
            Zero-Distraction Flow State
          </p>
          <p className="text-neutral-300">
            <strong>Modo</strong> is engineered for developers, students, writers, and deep work practitioners. It merges precision timekeeping with psychoacoustic soundscapes, cinematic 4K backdrops, and harmonic audio alerts to protect your focus from digital fatigue.
          </p>
        </div>

        {/* The Science Section */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Brain size={14} style={{ color: accentColor }} />
            The Science of Cognitive Stamina
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <Clock size={13} className="text-rose-400" />
                Pomodoro & Ultradian Rhythms
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                By segmenting tasks into 25/5 or 50/10 intervals, Modo aligns with natural neurobiological energy cycles, reducing mental fatigue and context switching.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <Radio size={13} className="text-cyan-400" />
                432Hz & Alpha Binaural Beats
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Modo generates real-time 10Hz binaural differentials over a 432Hz tuning fork carrier, stimulating alpha brain waves associated with relaxed alertness.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <Waves size={13} className="text-amber-400" />
                Brownian Noise Masking
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Deep Brownian noise mimics natural low-frequency soundscapes (waterfalls, rain), dampening sudden ambient room noise without abrasive highs.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                <Layers size={13} className="text-emerald-400" />
                Routine & Preset Chaining
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                String together customized multi-step deep work and rest sequences with automatic transition delays for seamless marathon study blocks.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
              <Sparkles size={14} style={{ color: accentColor }} />
              Audio Synthesis & 4K Video
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Web Audio oscillators for Zen bells, singing bowls, and marimbas with audio ducking and custom video backgrounds.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
              <ShieldCheck size={14} className="text-emerald-400" />
              100% Offline & Private
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Zero telemetry, no user accounts, and zero cookies. All presets, chains, and themes live exclusively in your local storage.
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Keyboard size={13} style={{ color: accentColor }} />
            Keyboard Shortcuts
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300 text-[11px]">Start / Pause</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">Space</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300 text-[11px]">Reset Timer</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">R</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300 text-[11px]">Fullscreen</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">F</kbd>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300 text-[11px]">Close Panel</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">Esc</kbd>
            </div>
          </div>
        </div>

        {/* Footer Info & Attribution */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by <strong className="text-neutral-200">HawkdotDev</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-[11px]">MIT Licensed</span>
            <a
              href="https://github.com/HawkdotDev/modo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
            >
              <Github size={13} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
