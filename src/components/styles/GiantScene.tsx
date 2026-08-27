import { TimerMode } from '../../hooks/useTimer';
import { Flame, Coffee } from 'lucide-react';

interface GiantSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
}

export function GiantScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
  themeColor
}: GiantSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none w-full max-w-2xl py-6">
      {/* Top minimal status indicator */}
      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
        {isWork ? <Flame size={14} style={{ color: themeColor }} /> : <Coffee size={14} className="text-emerald-400" />}
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-300">
          {isWork ? 'DEEP WORK' : 'RECOVERY'}
        </span>
        <span className="text-neutral-500">•</span>
        <span className="text-xs font-mono font-bold" style={{ color: themeColor }}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* Massive Bold Typography */}
      <div className="font-mono text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center">
        <span>{formattedMinutes}</span>
        <span className={`transition-opacity duration-300 ${isRunning ? 'animate-pulse' : 'opacity-60'}`} style={{ color: themeColor }}>:</span>
        <span>{formattedSeconds}</span>
      </div>

      {/* Minimal bottom progress line */}
      <div className="w-64 sm:w-80 h-1.5 rounded-full bg-white/10 overflow-hidden mt-2">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: themeColor,
            boxShadow: `0 0 12px ${themeColor}`
          }}
        />
      </div>
    </div>
  );
}
