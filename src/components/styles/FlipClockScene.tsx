import { TimerMode } from '../../hooks/useTimer';
import { Flame, Coffee } from 'lucide-react';

interface FlipClockSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
}

function FlipCard({ digit, label }: { digit: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 sm:w-28 h-28 sm:h-32 rounded-2xl bg-gradient-to-b from-[#222226] via-[#18181b] to-[#121214] border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
        {/* Top/Bottom Card Split Horizon Line */}
        <div className="absolute inset-x-0 top-1/2 h-[2px] bg-black/80 z-20 shadow-[0_1px_1px_rgba(255,255,255,0.06)]" />

        {/* Side Hinges */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-neutral-600 rounded-r-sm z-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-neutral-600 rounded-l-sm z-30" />

        {/* Gloss Overlay Top Half */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/[0.04] pointer-events-none z-10" />

        {/* Bold Flap Number */}
        <span className="font-mono text-5xl sm:text-6xl font-black text-white tracking-wider drop-shadow-lg select-none">
          {digit}
        </span>
      </div>
      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
        {label}
      </span>
    </div>
  );
}

export function FlipClockScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
  themeColor
}: FlipClockSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="flex flex-col items-center gap-6 select-none max-w-lg w-full">
      {/* Top Status Header */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-sm">
        {isWork ? <Flame size={14} style={{ color: themeColor }} /> : <Coffee size={14} className="text-emerald-400" />}
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {isWork ? 'Focus Round' : 'Break Time'}
        </span>
        <span className="text-neutral-500">•</span>
        <span className="text-xs font-mono font-bold" style={{ color: themeColor }}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* Mechanical Flip Cards Pair */}
      <div className="flex items-center gap-4 sm:gap-6">
        <FlipCard digit={formattedMinutes} label="Minutes" />
        
        {/* Colon separator */}
        <div className="flex flex-col gap-3 -mt-6">
          <span 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isRunning ? 'animate-ping' : ''
            }`}
            style={{ backgroundColor: themeColor }}
          />
          <span 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        <FlipCard digit={formattedSeconds} label="Seconds" />
      </div>

      {/* Retro Mechanical Progress Track */}
      <div className="w-full max-w-xs space-y-1.5">
        <div className="w-full h-2 rounded-full bg-black/60 border border-white/10 p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: themeColor,
              boxShadow: `0 0 12px ${themeColor}`
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-neutral-500 px-1">
          <span>00:00</span>
          <span>{isRunning ? 'FLIPPING' : 'PAUSED'}</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
