import { useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Keyboard, Heart, Github } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modo-title"
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-neutral-900/90 border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white space-y-6 overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Radial Glow */}
        <div 
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              style={{ color: accentColor, filter: `drop-shadow(0 0 14px ${accentColor}90)` }}
              className="p-2 rounded-2xl bg-white/[0.05] border border-white/[0.1]"
            >
              <PomodoroIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 id="about-modo-title" className="text-xl font-bold tracking-tight text-white m-0">
                About Modo
              </h2>
              <p className="text-xs text-neutral-400 m-0">Minimalist Deep Work & Interval Studio</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mission Statement */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs leading-relaxed text-neutral-300">
          <p className="font-medium text-neutral-200">
            <strong>Modo</strong> is engineered to eliminate cognitive friction and help you reach deep flow state with precision timing, harmonic chimes, and ambient noise.
          </p>
          <p className="text-neutral-400">
            Based on the science of the <em>Pomodoro Technique</em> and <em>ultradian rhythm cycles</em>, Modo provides zero-jitter time tracking that runs reliably in foreground and background tabs.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
              <Sparkles size={14} style={{ color: accentColor }} />
              Audio & Visuals
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Synthesized Zen chimes, Brown noise, 432Hz alpha beats, and 4K aesthetic video backdrops.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
              <ShieldCheck size={14} className="text-emerald-400" />
              100% Private
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Zero tracking, no account required, and all presets/schedules remain securely in your local browser.
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Keyboard size={13} style={{ color: accentColor }} />
            Keyboard Shortcuts
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300">Start / Pause</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">Space</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300">Reset Timer</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">R</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300">Fullscreen</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">F</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <span className="text-neutral-300">Close Panel</span>
              <kbd className="px-2 py-0.5 rounded-md bg-white/[0.1] border border-white/15 font-mono text-[10px] text-neutral-200">Esc</kbd>
            </div>
          </div>
        </div>

        {/* Footer info & Links */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by <strong className="text-neutral-200">Dwaipayan Dutta</strong></span>
          </div>

          <a
            href="https://github.com/HawkdotDev/modo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
