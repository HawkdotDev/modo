import { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Keyboard, 
  Heart, 
  Github, 
  Headphones
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
        className="relative w-full max-w-xl rounded-3xl bg-neutral-900/95 border border-white/15 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl text-white space-y-7 overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3.5">
            <div 
              style={{ color: accentColor, filter: `drop-shadow(0 0 16px ${accentColor}90)` }}
              className="p-3 rounded-2xl bg-white/[0.05] border border-white/[0.1]"
            >
              <PomodoroIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 id="about-modo-title" className="text-2xl font-bold tracking-tight text-white m-0">
                  Modo
                </h2>
                <span 
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{ 
                    backgroundColor: `${accentColor}18`,
                    borderColor: `${accentColor}40`,
                    color: accentColor 
                  }}
                >
                  v1.1.0
                </span>
              </div>
              <p className="text-sm text-neutral-400 m-0 mt-0.5">Aesthetic Pomodoro & Deep Work Studio</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all duration-150"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Introduction */}
        <div className="space-y-3">
          <p className="text-base text-neutral-200 leading-relaxed font-normal">
            <strong>Modo</strong> is designed to remove digital noise and cultivate deep, uninterrupted focus. By blending precision timing with ambient soundscapes and harmonic audio cues, it helps you enter and sustain your flow state.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Built upon the principles of the Pomodoro Technique and biological ultradian cycles, Modo breaks intense cognitive work into focused sprints followed by restorative pauses.
          </p>
        </div>

        {/* Key Features / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-neutral-200">
              <Headphones size={16} style={{ color: accentColor }} />
              Soundscapes
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              432Hz alpha binaural beats, brown noise, rain, and synthesized acoustic bell chimes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-neutral-200">
              <Sparkles size={16} style={{ color: accentColor }} />
              Studio Tools
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              4K cinematic backdrops, custom routine chains, and automated recurring schedules.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-neutral-200">
              <ShieldCheck size={16} className="text-emerald-400" />
              100% Private
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero trackers, no account needed, completely free and saved locally in your browser.
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            <Keyboard size={14} style={{ color: accentColor }} />
            Keyboard Shortcuts
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs text-neutral-300 font-medium">Start / Pause</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white/[0.1] border border-white/15 font-mono text-xs font-semibold text-white shadow-sm">Space</kbd>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs text-neutral-300 font-medium">Reset Timer</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white/[0.1] border border-white/15 font-mono text-xs font-semibold text-white shadow-sm">R</kbd>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs text-neutral-300 font-medium">Fullscreen</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white/[0.1] border border-white/15 font-mono text-xs font-semibold text-white shadow-sm">F</kbd>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs text-neutral-300 font-medium">Close Panel</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white/[0.1] border border-white/15 font-mono text-xs font-semibold text-white shadow-sm">Esc</kbd>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by <strong className="text-neutral-200">HawkdotDev</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-xs">MIT Licensed</span>
            <a
              href="https://github.com/HawkdotDev/modo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group"
            >
              <Github size={15} className="group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
