import { memo, useEffect } from 'react';
import { Play, Pause, RotateCcw, Save, Flame, Coffee } from 'lucide-react';
import { formatTime } from '../utils/timeFormat';
import { getClockStyleDefinition } from './styles/registry';
import { useTimerContext } from '../context/TimerContext';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';

interface TimerDisplayProps {
  onOpenPresetForm?: () => void;
}

export const TimerDisplay = memo(function TimerDisplay({ onOpenPresetForm }: TimerDisplayProps) {
  const {
    isBreak,
    timeLeft,
    isRunning,
    progress,
    currentIteration,
    waitingForManualStart,
    toggleTimer,
    reset
  } = useTimerContext();

  const {
    selectedPreset,
    isCustom,
    activeSettings,
    clockStyle,
    showGlow,
    showRing,
    setShowPresetForm
  } = useSettings();

  const { colors } = useTheme();

  const activeColor = isBreak ? colors.breakColor : colors.workColor;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const mode = isBreak ? 'break' : 'work';
  const totalIterations = activeSettings.iterations;

  // Synchronize browser tab title dynamically with active countdown & state
  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(timeLeft)} • ${isBreak ? 'Break' : 'Focus'} | Modo`;
    } else {
      document.title = 'Modo';
    }
    return () => {
      document.title = 'Modo';
    };
  }, [isRunning, timeLeft, isBreak]);

  const handleSaveAsPreset = () => {
    setShowPresetForm(true);
    if (onOpenPresetForm) {
      onOpenPresetForm();
    }
  };

  const styleDefinition = getClockStyleDefinition(clockStyle);
  const SceneComponent = styleDefinition.component;

  return (
    <section 
      aria-label="Pomodoro Focus Timer Stage"
      className="flex flex-col items-center gap-5 my-auto relative z-10 w-full max-w-2xl px-4 select-none"
    >
      {/* Hidden Semantic Context for Search Indexers and Assistive Technology */}
      <div className="sr-only" aria-live="polite">
        <h2>Modo Focus Timer Stage</h2>
        <p>Current Routine: {isCustom ? 'Custom Timer' : selectedPreset.name}</p>
        <p>Current Status: {isRunning ? 'Running' : 'Paused'}</p>
        <p>Interval Mode: {isBreak ? 'Restorative Break' : 'Deep Work Focus'}</p>
        <p>Time Left: {minutes} minutes and {seconds} seconds</p>
        <p>Session Progress: Round {currentIteration} of {totalIterations}</p>
      </div>

      {/* Top Preset and Pause Status */}
      <div className="flex flex-col items-center gap-2">
        {waitingForManualStart && (
          <div 
            role="status" 
            aria-live="polite"
            className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse"
          >
            Paused: Press Start to continue
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="px-3.5 py-1 rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-200 font-medium tracking-wide shadow-sm">
            {isCustom ? 'Custom Timer' : selectedPreset.name}
          </span>
          {isCustom && (
            <button
              type="button"
              onClick={handleSaveAsPreset}
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium hover:underline transition-all"
              title="Save custom timer as a preset"
              aria-label="Save custom timer as a preset"
            >
              <Save size={12} aria-hidden="true" />
              Save preset
            </button>
          )}
        </div>
      </div>

      {/* Render Active Clock Style Scene */}
      <SceneComponent
        minutes={minutes}
        seconds={seconds}
        mode={mode}
        progress={progress}
        isRunning={isRunning}
        themeColor={activeColor}
        accentColor={colors.accentColor}
        showGlow={showGlow}
        showRing={showRing}
      >
        {clockStyle === 'minimal' && (
          <div className="flex flex-col items-center gap-2 text-center px-4">
            {/* Status Icon inside the circle */}
            <div 
              aria-hidden="true"
              className="p-2.5 rounded-2xl border transition-all duration-500 shadow-lg -translate-y-[48px] -mb-[28px] hover:scale-105"
              style={{
                backgroundColor: `${activeColor}18`,
                borderColor: `${activeColor}35`,
                color: activeColor,
                boxShadow: `0 0 25px -5px ${activeColor}55`
              }}
              title={isBreak ? 'Break Session' : 'Focus Session'}
            >
              {isBreak ? (
                <Coffee size={22} className={isRunning ? "animate-float-gentle" : ""} />
              ) : (
                <Flame size={22} className={isRunning ? "animate-flame-flicker" : ""} />
              )}
            </div>

            {/* Time digits */}
            <div 
              role="timer"
              aria-label={`${minutes} minutes and ${seconds} seconds remaining in ${isBreak ? 'break' : 'focus'} mode`}
              aria-live="polite"
              aria-atomic="true"
              className="text-7xl sm:text-8xl font-mono font-bold tracking-tighter text-white tabular-nums drop-shadow-lg -my-1 transition-all duration-200"
            >
              {formatTime(timeLeft)}
            </div>
            
            {/* Dual Action Controls inside circle */}
            <div className="flex items-center gap-3 mt-1 translate-y-[26px] -mb-[12px]">
              {/* Reset Button */}
              <button
                type="button"
                onClick={reset}
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] hover:scale-105 active:scale-90 text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2] shadow-sm transition-all duration-200 flex items-center justify-center group"
                title="Reset timer"
                aria-label="Reset timer"
              >
                <RotateCcw size={15} aria-hidden="true" className="group-hover:-rotate-45 group-active:-rotate-180 transition-transform duration-300 ease-out" />
              </button>

              {/* Start / Pause Button */}
              <button
                type="button"
                onClick={toggleTimer}
                className="w-10 h-10 rounded-xl hover:scale-105 active:scale-95 shadow-md flex items-center justify-center transition-all duration-200 group"
                style={{
                  background: isRunning 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : `linear-gradient(135deg, ${activeColor}, ${activeColor}dd)`,
                  color: '#ffffff',
                  border: isRunning ? '1px solid rgba(255, 255, 255, 0.14)' : `1px solid ${activeColor}`,
                  boxShadow: isRunning ? 'none' : `0 0 20px -3px ${activeColor}66`
                }}
                title={isRunning ? "Pause timer" : "Start timer"}
                aria-label={isRunning ? "Pause timer" : "Start timer"}
              >
                {isRunning ? (
                  <Pause size={16} aria-hidden="true" className="fill-current group-hover:scale-110 transition-transform" />
                ) : (
                  <Play size={16} aria-hidden="true" className="fill-current ml-0.5 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>
        )}
      </SceneComponent>

      {/* External Action Controls for Non-Minimal Styles */}
      {clockStyle !== 'minimal' && (
        <div className="flex items-center gap-3 mt-1">
          <button
            type="button"
            onClick={reset}
            className="w-11 h-11 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] hover:scale-105 active:scale-90 text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2] shadow-sm transition-all duration-200 flex items-center justify-center group"
            title="Reset timer"
            aria-label="Reset timer"
          >
            <RotateCcw size={16} aria-hidden="true" className="group-hover:-rotate-45 group-active:-rotate-180 transition-transform duration-300 ease-out" />
          </button>

          <button
            type="button"
            onClick={toggleTimer}
            className="px-6 h-11 rounded-2xl hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 transition-all duration-200 group text-sm font-semibold"
            style={{
              background: isRunning 
                ? 'rgba(255, 255, 255, 0.08)' 
                : `linear-gradient(135deg, ${activeColor}, ${activeColor}dd)`,
              color: '#ffffff',
              border: isRunning ? '1px solid rgba(255, 255, 255, 0.14)' : `1px solid ${activeColor}`,
              boxShadow: isRunning ? 'none' : `0 0 20px -3px ${activeColor}66`
            }}
            title={isRunning ? "Pause timer" : "Start timer"}
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? (
              <>
                <Pause size={16} aria-hidden="true" className="fill-current group-hover:scale-110 transition-transform" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={16} aria-hidden="true" className="fill-current ml-0.5 group-hover:scale-110 transition-transform" />
                <span>Start</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Outside Elements: Session Iteration Status */}
      <div 
        role="group" 
        aria-label={`Session progress: Round ${currentIteration} of ${totalIterations}`}
        className="flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl"
      >
        <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold transition-colors duration-300">
          Session {currentIteration} of {totalIterations}
        </span>
        
        {/* Visual session dot indicators */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: totalIterations }).map((_, idx) => {
            const isCompleted = idx + 1 < currentIteration;
            const isCurrent = idx + 1 === currentIteration;
            return (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-6 bg-white shadow-sm animate-pulse-subtle'
                    : isCompleted
                    ? 'w-2.5 bg-neutral-400'
                    : 'w-2 bg-neutral-700/60'
                }`}
                style={isCurrent ? { 
                  backgroundColor: activeColor,
                  boxShadow: `0 0 10px ${activeColor}80`
                } : {}}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});