import { Play, Pause, RotateCcw, Save, Flame, Coffee } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { formatTime } from '../utils/timeFormat';
import { ClockStyle } from '../types/timer';
import { LofiScene } from './styles/LofiScene';
import { FlipClockScene } from './styles/FlipClockScene';
import { CyberScene } from './styles/CyberScene';
import { CafeScene } from './styles/CafeScene';
import { ZenScene } from './styles/ZenScene';
import { GiantScene } from './styles/GiantScene';

interface TimerDisplayProps {
  isBreak: boolean;
  timeLeft: number;
  isRunning: boolean;
  progress: number;
  currentIteration: number;
  totalIterations: number;
  workColor: string;
  breakColor: string;
  accentColor?: string;
  presetName: string;
  waitingForManualStart?: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSaveAsPreset?: () => void;
  isCustom?: boolean;
  smoothProgress?: boolean;
  clockStyle?: ClockStyle;
}

export function TimerDisplay({
  isBreak,
  timeLeft,
  isRunning,
  progress,
  currentIteration,
  totalIterations,
  workColor,
  breakColor,
  accentColor,
  presetName,
  waitingForManualStart,
  onToggle,
  onReset,
  onSaveAsPreset,
  isCustom,
  smoothProgress = true,
  clockStyle = 'minimal'
}: TimerDisplayProps) {
  const activeColor = isBreak ? breakColor : workColor;
  const currentAccent = accentColor || activeColor;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const mode = isBreak ? 'break' : 'work';

  // Render non-minimal scene styles
  const renderClockStyle = () => {
    switch (clockStyle) {
      case 'lofi':
        return (
          <LofiScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            accentColor={currentAccent}
            themeColor={activeColor}
          />
        );
      case 'flip':
        return (
          <FlipClockScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            themeColor={activeColor}
          />
        );
      case 'cyber':
        return (
          <CyberScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            themeColor={activeColor}
          />
        );
      case 'cafe':
        return (
          <CafeScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            themeColor={activeColor}
          />
        );
      case 'zen':
        return (
          <ZenScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            themeColor={activeColor}
          />
        );
      case 'giant':
        return (
          <GiantScene
            minutes={minutes}
            seconds={seconds}
            mode={mode}
            progress={progress}
            isRunning={isRunning}
            themeColor={activeColor}
          />
        );
      case 'minimal':
      default:
        return (
          <CircularProgress 
            progress={progress} 
            isBreak={isBreak}
            workColor={workColor}
            breakColor={breakColor}
            size={420}
            smooth={smoothProgress}
            isRunning={isRunning}
          >
            <div className="flex flex-col items-center gap-2 text-center px-4">
              {/* Status Icon inside the circle */}
              <div 
                className="p-2.5 rounded-2xl border transition-all duration-500 shadow-lg -translate-y-[48px] -mb-[28px]"
                style={{
                  backgroundColor: `${activeColor}18`,
                  borderColor: `${activeColor}35`,
                  color: activeColor,
                  boxShadow: `0 0 25px -5px ${activeColor}55`
                }}
                title={isBreak ? 'Break Session' : 'Focus Session'}
              >
                {isBreak ? (
                  <Coffee size={22} className="animate-pulse" />
                ) : (
                  <Flame size={22} className="animate-pulse" />
                )}
              </div>

              {/* Time digits */}
              <div 
                className="text-7xl sm:text-8xl font-mono font-bold tracking-tighter text-white tabular-nums drop-shadow-lg -my-1"
              >
                {formatTime(timeLeft)}
              </div>
              
              {/* Dual Action Controls inside circle */}
              <div className="flex items-center gap-3 mt-1 translate-y-[26px] -mb-[12px]">
                {/* Reset Button */}
                <button
                  onClick={onReset}
                  className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.16] shadow-sm transition-all duration-200 flex items-center justify-center group"
                  title="Reset timer"
                >
                  <RotateCcw size={15} className="group-hover:-rotate-45 transition-transform duration-300" />
                </button>

                {/* Start / Pause Button */}
                <button
                  onClick={onToggle}
                  className="w-10 h-10 rounded-xl active:scale-95 shadow-md flex items-center justify-center transition-all duration-200 group"
                  style={{
                    background: isRunning 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : `linear-gradient(135deg, ${activeColor}, ${activeColor}dd)`,
                    color: '#ffffff',
                    border: isRunning ? '1px solid rgba(255, 255, 255, 0.14)' : `1px solid ${activeColor}`,
                    boxShadow: isRunning ? 'none' : `0 0 20px -3px ${activeColor}66`
                  }}
                  title={isRunning ? "Pause timer" : "Start timer"}
                >
                  {isRunning ? (
                    <Pause size={16} className="fill-current group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play size={16} className="fill-current ml-0.5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </CircularProgress>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 my-auto relative z-10 w-full max-w-2xl px-4">
      {/* Top Preset and Pause Status */}
      <div className="flex flex-col items-center gap-2">
        {waitingForManualStart && (
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
            Paused: Press Start to continue
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="px-3.5 py-1 rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-200 font-medium tracking-wide shadow-sm">
            {isCustom ? 'Custom Timer' : presetName}
          </span>
          {isCustom && onSaveAsPreset && (
            <button
              onClick={onSaveAsPreset}
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium hover:underline transition-all"
              title="Save custom timer as a preset"
            >
              <Save size={12} />
              Save preset
            </button>
          )}
        </div>
      </div>
      
      {/* Render Chosen Clock Style Scene */}
      {renderClockStyle()}

      {/* External Action Controls for Non-Minimal Styles */}
      {clockStyle !== 'minimal' && (
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={onReset}
            className="w-11 h-11 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.16] shadow-sm transition-all duration-200 flex items-center justify-center group"
            title="Reset timer"
          >
            <RotateCcw size={16} className="group-hover:-rotate-45 transition-transform duration-300" />
          </button>

          <button
            onClick={onToggle}
            className="px-6 h-11 rounded-2xl active:scale-95 shadow-md flex items-center gap-2 transition-all duration-200 group text-sm font-semibold"
            style={{
              background: isRunning 
                ? 'rgba(255, 255, 255, 0.08)' 
                : `linear-gradient(135deg, ${activeColor}, ${activeColor}dd)`,
              color: '#ffffff',
              border: isRunning ? '1px solid rgba(255, 255, 255, 0.14)' : `1px solid ${activeColor}`,
              boxShadow: isRunning ? 'none' : `0 0 20px -3px ${activeColor}66`
            }}
            title={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? (
              <>
                <Pause size={16} className="fill-current group-hover:scale-110 transition-transform" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={16} className="fill-current ml-0.5 group-hover:scale-110 transition-transform" />
                <span>Start</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Outside Elements: Session Iteration Status */}
      <div className="flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl">
        <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
          Session {currentIteration} of {totalIterations}
        </span>
        
        {/* Visual session dot indicators */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalIterations }).map((_, idx) => {
            const isCompleted = idx + 1 < currentIteration;
            const isCurrent = idx + 1 === currentIteration;
            return (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-6 bg-white shadow-sm'
                    : isCompleted
                    ? 'w-2.5 bg-neutral-400'
                    : 'w-2 bg-neutral-700/60'
                }`}
                style={isCurrent ? { backgroundColor: activeColor } : {}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}