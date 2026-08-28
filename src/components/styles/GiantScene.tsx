import { memo } from 'react';
import { ClockSceneProps } from './types';
import { Flame, Coffee } from 'lucide-react';

export const GiantScene = memo(function GiantScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
  themeColor
}: ClockSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none w-full max-w-2xl py-6 will-change-transform">
      {/* Massive Bold Typography */}
      <div className="font-mono text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center">
        <span>{formattedMinutes}</span>
        <span className={`transition-opacity duration-300 ${isRunning ? 'animate-pulse' : 'opacity-60'}`} style={{ color: themeColor }}>:</span>
        <span>{formattedSeconds}</span>
      </div>

      {/* Minimal progress line */}
      <div className="w-64 sm:w-80 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out will-change-transform"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: themeColor,
            boxShadow: `0 0 12px ${themeColor}`
          }}
        />
      </div>

      {/* Status indicator below progress bar */}
      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] transition-all duration-300">
        {isWork ? <Flame size={14} style={{ color: themeColor }} /> : <Coffee size={14} className="text-emerald-400" />}
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-300">
          {isWork ? 'DEEP WORK' : 'RECOVERY'}
        </span>
        <span className="text-neutral-500">•</span>
        <span className="text-xs font-mono font-bold" style={{ color: themeColor }}>
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
});
