import { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Keyboard, 
  Heart, 
  Github, 
  Headphones, 
  Brain, 
  Clock, 
  Radio, 
  Waves, 
  Layers, 
  Zap, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { PomodoroIcon } from './Navbar';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

type AboutTab = 'overview' | 'science' | 'features' | 'shortcuts';

export function AboutModal({ isOpen, onClose, accentColor = '#f43f5e' }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>('overview');

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
        className="relative w-full max-w-2xl rounded-3xl bg-neutral-900/95 border border-white/15 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl text-white flex flex-col max-h-[88vh] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 shrink-0">
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

        {/* Elegant Tab Navigation */}
        <div className="flex items-center gap-1.5 pt-4 pb-2 border-b border-white/[0.06] overflow-x-auto custom-scrollbar shrink-0" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'overview'
                ? 'text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
            style={activeTab === 'overview' ? {
              backgroundColor: `${accentColor}25`,
              borderColor: `${accentColor}60`,
              color: '#ffffff'
            } : {}}
          >
            <BookOpen size={15} style={activeTab === 'overview' ? { color: accentColor } : {}} />
            Overview
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'science'}
            onClick={() => setActiveTab('science')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'science'
                ? 'text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
            style={activeTab === 'science' ? {
              backgroundColor: `${accentColor}25`,
              borderColor: `${accentColor}60`,
              color: '#ffffff'
            } : {}}
          >
            <Brain size={15} style={activeTab === 'science' ? { color: accentColor } : {}} />
            The Science
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'features'}
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'features'
                ? 'text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
            style={activeTab === 'features' ? {
              backgroundColor: `${accentColor}25`,
              borderColor: `${accentColor}60`,
              color: '#ffffff'
            } : {}}
          >
            <Sparkles size={15} style={activeTab === 'features' ? { color: accentColor } : {}} />
            Capabilities
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'shortcuts'}
            onClick={() => setActiveTab('shortcuts')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'shortcuts'
                ? 'text-white shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
            style={activeTab === 'shortcuts' ? {
              backgroundColor: `${accentColor}25`,
              borderColor: `${accentColor}60`,
              color: '#ffffff'
            } : {}}
          >
            <Keyboard size={15} style={activeTab === 'shortcuts' ? { color: accentColor } : {}} />
            Shortcuts & FAQ
          </button>
        </div>

        {/* Scrollable Tab Body with Spacious Typography */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 pr-1.5 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-base font-semibold text-white">
                  <Zap size={18} style={{ color: accentColor }} />
                  Zero-Distraction Flow State
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  <strong>Modo</strong> was created to solve digital fatigue and context fragmentation. By combining minimalist visuals with psychoacoustic soundscapes and harmonic audio cues, Modo establishes an immersive environment where deep focus feels effortless.
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Whether you are engineering software, writing essays, studying for exams, or conducting research, Modo provides a structured framework that respects your brain&apos;s natural energy rhythms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Headphones size={16} style={{ color: accentColor }} />
                    Soundscapes
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Synthesized Brownian noise, gentle rain, ocean surf, and 432Hz alpha binaural beats.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Layers size={16} style={{ color: accentColor }} />
                    Preset Chaining
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Build automated multi-step sequences that transition smoothly between focus and rest blocks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    100% Private
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    No sign-up, zero telemetry, and zero tracking cookies. All data lives on your device.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE SCIENCE */}
          {activeTab === 'science' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock size={15} className="text-rose-400" />
                  The Pomodoro Principle & Attention Economics
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique optimizes cognitive performance by breaking work into 25-minute intervals separated by short 5-minute rests. This rhythm prevents executive brain fatigue and sustains motivation over long sessions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Brain size={15} className="text-amber-400" />
                  Ultradian Biological Rhythms (90/20)
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  Human brain alertness operates in 90-minute biological cycles. Modo includes an Ultradian 90/20 preset that aligns with natural peak-performance windows, giving your prefrontal cortex adequate time to recharge after intense cognitive expenditure.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Radio size={15} className="text-cyan-400" />
                  432Hz Carrier & 10Hz Alpha Wave Entrainment
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  Alpha brainwaves (8 to 12 Hz) correlate with relaxed yet sharp mental concentration. Modo delivers a 10Hz frequency differential across a harmonic 432Hz carrier tone, fostering auditory brainwave entrainment to block internal mind-wandering.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Waves size={15} className="text-emerald-400" />
                  Brownian Noise Distraction Masking
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  Brownian noise features a 1/f² spectral power density, emphasizing soothing low frequencies like deep waterfalls. Unlike harsh white noise, it dampens abrupt environmental noise spikes without causing auditory fatigue.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CAPABILITIES */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-sm font-semibold text-white">Zero-Jitter Wall Clock Engine</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Uses precision timestamp differentials with 60 FPS animation loop in the foreground and a background tab heartbeat interval. Stays 100% accurate down to the millisecond.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-sm font-semibold text-white">Synthesized Audio & Auto-Ducking</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Web Audio oscillator bells (Zen, Tibetan Singing Bowl, Marimba, Digital) with smart audio ducking that softens soundscapes during chime alerts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-sm font-semibold text-white">Automated Focus Schedules</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Create recurring daily, weekly, or custom scheduled alarms that automatically launch your preferred focus routine and chains.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-sm font-semibold text-white">Cinematic 4K Video Backdrops</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Curated atmospheric video scenes (rainy Tokyo, cozy study cafe, fireplace) with custom video upload and blur adjustments.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHORTCUTS & FAQ */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-5 animate-fade-in">
              {/* Keyboard Grid */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Global Keyboard Hotkeys
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

              {/* FAQ Accordions */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  <HelpCircle size={14} style={{ color: accentColor }} />
                  Frequently Asked Questions
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <span className="text-xs sm:text-sm font-semibold text-white block">Does the timer work in background tabs?</span>
                  <span className="text-xs text-neutral-400 leading-relaxed block">
                    Yes. Modo uses a wall-clock differential engine that calculates real elapsed time even when the tab is sleeping, guaranteeing prompt notifications and sound triggers.
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                  <span className="text-xs sm:text-sm font-semibold text-white block">Where are my presets and schedules saved?</span>
                  <span className="text-xs text-neutral-400 leading-relaxed block">
                    Everything is persisted locally inside your browser via LocalStorage. No server databases, no analytics trackers, and zero account dependencies.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-400 shrink-0">
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
