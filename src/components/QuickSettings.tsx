import { useState } from 'react';
import { Switch } from './Switch';
import { 
  SlidersHorizontal, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Flame, 
  Coffee, 
  Layers, 
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

interface QuickSettingsProps {
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  onWorkMinutesChange: (value: number) => void;
  onWorkSecondsChange: (value: number) => void;
  onBreakMinutesChange: (value: number) => void;
  onBreakSecondsChange: (value: number) => void;
  onIterationsChange: (value: number) => void;
  onRequireManualStartChange: (value: boolean) => void;
  soundEnabled?: boolean;
  volume?: number;
  onToggleSound?: (enabled: boolean) => void;
  onVolumeChange?: (volume: number) => void;
  disabled?: boolean;
}

export function QuickSettings({
  workMinutes,
  workSeconds,
  breakMinutes,
  breakSeconds,
  iterations,
  requireManualStart,
  onWorkMinutesChange,
  onWorkSecondsChange,
  onBreakMinutesChange,
  onBreakSecondsChange,
  onIterationsChange,
  onRequireManualStartChange,
  soundEnabled = true,
  volume = 0.5,
  onToggleSound,
  onVolumeChange,
  disabled = false
}: QuickSettingsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const quickTemplates = [
    { name: 'Classic', work: 25, break: 5, iterations: 4 },
    { name: 'Deep Focus', work: 50, break: 10, iterations: 3 },
    { name: 'Sprint', work: 15, break: 3, iterations: 4 },
    { name: 'Ultradian', work: 90, break: 20, iterations: 2 },
  ];

  const adjustWorkMinutes = (delta: number) => {
    onWorkMinutesChange(Math.max(1, Math.min(120, workMinutes + delta)));
  };

  const adjustBreakMinutes = (delta: number) => {
    onBreakMinutesChange(Math.max(1, Math.min(60, breakMinutes + delta)));
  };

  const adjustIterations = (delta: number) => {
    onIterationsChange(Math.max(1, Math.min(12, iterations + delta)));
  };

  return (
    <div className="fixed right-4 sm:right-6 top-[calc(50%+40px)] -translate-y-1/2 z-30 flex items-center transition-all duration-300">
      {/* Collapse Toggle Tab Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2.5 rounded-l-2xl glass-panel border-r-0 border border-white/10 text-neutral-400 hover:text-white shadow-xl hover:bg-white/[0.08] transition-all duration-200 group flex flex-col items-center gap-1.5"
        title={isCollapsed ? "Expand Quick Adjust" : "Collapse Quick Adjust"}
      >
        <SlidersHorizontal size={15} className="text-rose-400 group-hover:rotate-45 transition-transform" />
        {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Main Floating Glass Panel */}
      <aside 
        aria-label="Quick Settings" 
        className={`w-[303px] max-h-[88vh] overflow-y-auto custom-scrollbar glass-panel rounded-3xl p-4 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 ${
          isCollapsed ? 'hidden' : 'block'
        }`}
      >
        <div className="flex flex-col gap-2.5">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-rose-500/20 to-rose-500/5 text-rose-400 border border-rose-500/30">
                <SlidersHorizontal size={13} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Adjust</h4>
                <span className="text-[10px] text-neutral-400">Fine-tune your routine</span>
              </div>
            </div>
          </div>

          {/* Section 1: Quick Routine Templates */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5 hover:border-white/[0.1] transition-all">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 font-medium text-neutral-300">
                <Sparkles size={12} className="text-amber-400" />
                <span className="text-[11px] font-semibold">Routine Presets</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickTemplates.map((tmpl) => {
                const isActive = workMinutes === tmpl.work && breakMinutes === tmpl.break;
                return (
                  <button
                    key={tmpl.name}
                    type="button"
                    onClick={() => {
                      onWorkMinutesChange(tmpl.work);
                      onWorkSecondsChange(0);
                      onBreakMinutesChange(tmpl.break);
                      onBreakSecondsChange(0);
                      onIterationsChange(tmpl.iterations);
                    }}
                    disabled={disabled}
                    className={`p-1.5 px-2 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-rose-500/15 border-rose-500/40 text-white shadow-sm'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-[11px] font-semibold leading-tight text-neutral-200">{tmpl.name}</div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{tmpl.work}m / {tmpl.break}m</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Work (Focus) Time Stepper */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 hover:border-white/[0.1] transition-all">
            <div className="flex items-center justify-between text-xs px-0.5">
              <div className="flex items-center gap-1.5 font-medium text-neutral-300">
                <Flame size={13} className="text-rose-400" />
                <span className="text-[11px]">Focus Duration</span>
              </div>
              <span className="font-mono text-xs font-bold text-rose-400">
                {workMinutes}m {workSeconds > 0 ? `${workSeconds}s` : ''}
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustWorkMinutes(-5)}
                  disabled={disabled || workMinutes <= 5}
                  className="px-1.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-mono text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Subtract 5 minutes"
                >
                  -5m
                </button>
                <button
                  type="button"
                  onClick={() => adjustWorkMinutes(-1)}
                  disabled={disabled || workMinutes <= 1}
                  className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Subtract 1 minute"
                >
                  <Minus size={11} />
                </button>
              </div>

              {/* Centered Min/Sec Inputs */}
              <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/[0.08]">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={workMinutes}
                  onChange={(e) => onWorkMinutesChange(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
                  disabled={disabled}
                  className="w-7 text-center bg-transparent text-white font-mono text-xs font-bold focus:outline-none"
                  title="Focus Minutes"
                />
                <span className="text-neutral-500 font-mono text-[10px]">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workSeconds}
                  onChange={(e) => onWorkSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  disabled={disabled}
                  className="w-7 text-center bg-transparent text-white font-mono text-xs font-bold focus:outline-none"
                  title="Focus Seconds"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustWorkMinutes(1)}
                  disabled={disabled || workMinutes >= 120}
                  className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Add 1 minute"
                >
                  <Plus size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => adjustWorkMinutes(5)}
                  disabled={disabled || workMinutes >= 115}
                  className="px-1.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-mono text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Add 5 minutes"
                >
                  +5m
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Break Time Stepper */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 hover:border-white/[0.1] transition-all">
            <div className="flex items-center justify-between text-xs px-0.5">
              <div className="flex items-center gap-1.5 font-medium text-neutral-300">
                <Coffee size={13} className="text-emerald-400" />
                <span className="text-[11px]">Break Duration</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {breakMinutes}m {breakSeconds > 0 ? `${breakSeconds}s` : ''}
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustBreakMinutes(-5)}
                  disabled={disabled || breakMinutes <= 5}
                  className="px-1.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-mono text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Subtract 5 minutes"
                >
                  -5m
                </button>
                <button
                  type="button"
                  onClick={() => adjustBreakMinutes(-1)}
                  disabled={disabled || breakMinutes <= 1}
                  className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Subtract 1 minute"
                >
                  <Minus size={11} />
                </button>
              </div>

              {/* Centered Min/Sec Inputs */}
              <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/[0.08]">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={breakMinutes}
                  onChange={(e) => onBreakMinutesChange(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
                  disabled={disabled}
                  className="w-7 text-center bg-transparent text-white font-mono text-xs font-bold focus:outline-none"
                  title="Break Minutes"
                />
                <span className="text-neutral-500 font-mono text-[10px]">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={breakSeconds}
                  onChange={(e) => onBreakSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  disabled={disabled}
                  className="w-7 text-center bg-transparent text-white font-mono text-xs font-bold focus:outline-none"
                  title="Break Seconds"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustBreakMinutes(1)}
                  disabled={disabled || breakMinutes >= 60}
                  className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Add 1 minute"
                >
                  <Plus size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => adjustBreakMinutes(5)}
                  disabled={disabled || breakMinutes >= 55}
                  className="px-1.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-mono text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                  title="Add 5 minutes"
                >
                  +5m
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Total Rounds Stepper */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-neutral-400" />
              <div>
                <span className="text-xs font-medium text-neutral-200 block">Total Rounds</span>
                <span className="text-[10px] text-neutral-400">{iterations} iteration{iterations > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
              <button
                type="button"
                onClick={() => adjustIterations(-1)}
                disabled={disabled || iterations <= 1}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition-all"
              >
                <Minus size={11} />
              </button>
              <span className="w-5 text-center font-mono text-xs font-bold text-white">
                {iterations}
              </span>
              <button
                type="button"
                onClick={() => adjustIterations(1)}
                disabled={disabled || iterations >= 12}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white transition-all"
              >
                <Plus size={11} />
              </button>
            </div>
          </div>

          {/* Section 5: Audio Chimes & Volume */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5 hover:border-white/[0.1] transition-all">
            <div className="flex items-center justify-between text-xs px-0.5">
              <div className="flex items-center gap-2 font-medium text-neutral-300">
                {soundEnabled ? (
                  <Volume2 size={13} className="text-rose-400" />
                ) : (
                  <VolumeX size={13} className="text-neutral-500" />
                )}
                <span className="text-xs">Audio Chimes</span>
              </div>
              {onToggleSound && (
                <Switch
                  checked={soundEnabled}
                  onChange={onToggleSound}
                  disabled={disabled}
                />
              )}
            </div>
            {soundEnabled && onVolumeChange && (
              <div className="flex items-center gap-2 pt-0.5 px-0.5">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-rose-500"
                  disabled={disabled}
                  title="Adjust chime volume"
                />
                <span className="text-[10px] font-mono text-neutral-400 w-7 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Section 6: Manual Interval Toggle */}
          <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
            <div>
              <span className="text-xs font-medium text-neutral-200 block">Manual Interval</span>
              <span className="text-[10px] text-neutral-400">Wait for click to advance</span>
            </div>
            <Switch
              checked={requireManualStart || false}
              onChange={onRequireManualStartChange}
              disabled={disabled}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}