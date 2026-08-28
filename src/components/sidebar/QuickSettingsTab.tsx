import { 
  Sparkles, 
  Flame, 
  Coffee, 
  Layers,
  Sun,
  Circle,
  Plus, 
  Minus,
  X
} from 'lucide-react';
import { Switch } from '../Switch';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTimerContext } from '../../context/TimerContext';

interface QuickSettingsTabProps {
  onClose?: () => void;
}

export function QuickSettingsTab({ onClose }: QuickSettingsTabProps) {
  const { 
    activeSettings, 
    updateCustomSetting, 
    smoothProgress, 
    setSmoothProgress, 
    showGlow, 
    setShowGlow, 
    showRing, 
    setShowRing 
  } = useSettings();
  const { colors } = useTheme();
  const { isRunning } = useTimerContext();

  const {
    workMinutes,
    workSeconds,
    breakMinutes,
    breakSeconds,
    iterations,
    requireManualStart
  } = activeSettings;

  const accentColor = colors.accentColor || '#f43f5e';

  const quickTemplates = [
    { name: 'Classic', work: 25, break: 5, iterations: 4 },
    { name: 'Deep Focus', work: 50, break: 10, iterations: 3 },
    { name: 'Sprint', work: 15, break: 3, iterations: 4 },
    { name: 'Ultradian', work: 90, break: 20, iterations: 2 },
  ];

  const adjustWorkMinutes = (delta: number) => {
    updateCustomSetting('workMinutes', Math.max(1, Math.min(120, workMinutes + delta)));
  };

  const adjustBreakMinutes = (delta: number) => {
    updateCustomSetting('breakMinutes', Math.max(1, Math.min(60, breakMinutes + delta)));
  };

  const adjustIterations = (delta: number) => {
    updateCustomSetting('iterations', Math.max(1, Math.min(12, iterations + delta)));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Quick Adjust</h3>
          <p className="text-xs text-neutral-400">Fine-tune your routine and active interval</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Section 1: Quick Routine Templates */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={13} className="text-amber-400 animate-pulse-subtle" />
          Routine Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {quickTemplates.map((tmpl) => {
            const isActive = workMinutes === tmpl.work && breakMinutes === tmpl.break;
            return (
              <button
                key={tmpl.name}
                type="button"
                onClick={() => {
                  updateCustomSetting('workMinutes', tmpl.work);
                  updateCustomSetting('workSeconds', 0);
                  updateCustomSetting('breakMinutes', tmpl.break);
                  updateCustomSetting('breakSeconds', 0);
                  updateCustomSetting('iterations', tmpl.iterations);
                }}
                disabled={isRunning}
                className={`p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-neutral-300'
                }`}
                style={isActive ? {
                  backgroundColor: `${accentColor}20`,
                  borderColor: `${accentColor}80`
                } : {}}
              >
                <div className="text-sm font-semibold text-white">{tmpl.name}</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">{tmpl.work}m / {tmpl.break}m</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Work (Focus) Time Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 hover:border-white/[0.12] transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-neutral-200">
            <Flame size={15} style={{ color: accentColor }} className="animate-flame-flicker" />
            <span className="text-sm font-semibold">Focus Duration</span>
          </div>
          <span className="font-mono text-sm font-bold" style={{ color: accentColor }}>
            {workMinutes}m {workSeconds > 0 ? `${workSeconds}s` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustWorkMinutes(-5)}
              disabled={isRunning || workMinutes <= 5}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Subtract 5 minutes"
            >
              -5m
            </button>
            <button
              type="button"
              onClick={() => adjustWorkMinutes(-1)}
              disabled={isRunning || workMinutes <= 1}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Subtract 1 minute"
            >
              <Minus size={13} />
            </button>
          </div>

          {/* Centered Min/Sec Inputs */}
          <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/[0.1] focus-within:border-white/30 focus-within:bg-black/70 transition-all">
            <input
              id="sidebar-focus-minutes"
              name="workMinutes"
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) => updateCustomSetting('workMinutes', Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
              disabled={isRunning}
              aria-label="Focus Minutes"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Focus Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              id="sidebar-focus-seconds"
              name="workSeconds"
              type="number"
              min="0"
              max="59"
              value={workSeconds}
              onChange={(e) => updateCustomSetting('workSeconds', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
              aria-label="Focus Seconds"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Focus Seconds"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustWorkMinutes(1)}
              disabled={isRunning || workMinutes >= 120}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Add 1 minute"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={() => adjustWorkMinutes(5)}
              disabled={isRunning || workMinutes >= 115}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Add 5 minutes"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Break Time Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 hover:border-white/[0.12] transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-neutral-200">
            <Coffee size={15} className="text-emerald-400 animate-float-gentle" />
            <span className="text-sm font-semibold">Break Duration</span>
          </div>
          <span className="font-mono text-sm font-bold text-emerald-400">
            {breakMinutes}m {breakSeconds > 0 ? `${breakSeconds}s` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustBreakMinutes(-5)}
              disabled={isRunning || breakMinutes <= 5}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Subtract 5 minutes"
            >
              -5m
            </button>
            <button
              type="button"
              onClick={() => adjustBreakMinutes(-1)}
              disabled={isRunning || breakMinutes <= 1}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Subtract 1 minute"
            >
              <Minus size={13} />
            </button>
          </div>

          {/* Centered Min/Sec Inputs */}
          <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/[0.1] focus-within:border-white/30 focus-within:bg-black/70 transition-all">
            <input
              id="sidebar-break-minutes"
              name="breakMinutes"
              type="number"
              min="1"
              max="60"
              value={breakMinutes}
              onChange={(e) => updateCustomSetting('breakMinutes', Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
              disabled={isRunning}
              aria-label="Break Minutes"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Break Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              id="sidebar-break-seconds"
              name="breakSeconds"
              type="number"
              min="0"
              max="59"
              value={breakSeconds}
              onChange={(e) => updateCustomSetting('breakSeconds', Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={isRunning}
              aria-label="Break Seconds"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Break Seconds"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustBreakMinutes(1)}
              disabled={isRunning || breakMinutes >= 60}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Add 1 minute"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={() => adjustBreakMinutes(5)}
              disabled={isRunning || breakMinutes >= 55}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all duration-150"
              title="Add 5 minutes"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Total Rounds Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.12] transition-all duration-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
            <Layers size={16} className="text-neutral-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Total Rounds</span>
            <span className="text-xs text-neutral-400">{iterations} iteration{iterations > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/[0.1]">
          <button
            type="button"
            onClick={() => adjustIterations(-1)}
            disabled={isRunning || iterations <= 1}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white transition-all duration-150"
          >
            <Minus size={13} />
          </button>
          <span className="w-6 text-center font-mono text-sm font-bold text-white">
            {iterations}
          </span>
          <button
            type="button"
            onClick={() => adjustIterations(1)}
            disabled={isRunning || iterations >= 12}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] hover:scale-105 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white transition-all duration-150"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>

      {/* Section 5: Manual Interval Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div>
          <span className="text-sm font-semibold text-white block">Manual Interval</span>
          <span className="text-xs text-neutral-400">Wait for button click to advance</span>
        </div>
        <Switch
          checked={requireManualStart}
          onChange={(val) => updateCustomSetting('requireManualStart', val)}
          disabled={isRunning}
          activeColor={accentColor}
        />
      </div>

      {/* Section 6: Continuous Dial Motion Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div>
          <span className="text-sm font-semibold text-white block">Continuous Dial Motion</span>
          <span className="text-xs text-neutral-400">Smooth millisecond ring vs second-by-second ticks</span>
        </div>
        <Switch
          checked={smoothProgress}
          onChange={setSmoothProgress}
          disabled={isRunning}
          activeColor={accentColor}
        />
      </div>

      {/* Section 7: Circle Glow Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
            <Sun size={16} className="text-amber-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Circle Glow</span>
            <span className="text-xs text-neutral-400">Ambient glow effect around the progress arc</span>
          </div>
        </div>
        <Switch
          checked={showGlow}
          onChange={setShowGlow}
          disabled={isRunning}
          activeColor={accentColor}
        />
      </div>

      {/* Section 8: Background Ring Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
            <Circle size={16} className="text-neutral-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Background Ring</span>
            <span className="text-xs text-neutral-400">Show the track ring behind the progress arc</span>
          </div>
        </div>
        <Switch
          checked={showRing}
          onChange={setShowRing}
          disabled={isRunning}
          activeColor={accentColor}
        />
      </div>
    </div>
  );
}
