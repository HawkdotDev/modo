import { TimerMode } from '../../hooks/useTimer';
import { Coffee, Flame, Sparkles } from 'lucide-react';

interface CafeSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
}

export function CafeScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
  themeColor
}: CafeSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-[#251810] via-[#1c120c] to-[#0f0a06] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between select-none">
      {/* Background Warm Cafe Ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-600/15 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-orange-600/10 blur-3xl" />
        {/* Rainy Bokeh dots */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 rounded-full bg-amber-200/20 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-amber-400/15 blur-sm" />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-amber-500/20 text-amber-200 text-xs font-serif">
          <Coffee size={14} className="text-amber-400" />
          <span>Corner Coffeehouse</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-neutral-300">
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Center Warm Clock Card */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="p-7 rounded-3xl bg-black/50 border border-amber-500/25 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 font-serif">
            {isWork ? <Flame size={14} className="text-amber-400" /> : <Sparkles size={14} className="text-emerald-400" />}
            <span>{isWork ? 'Focused Reading' : 'Coffee Break'}</span>
          </div>

          <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-amber-50 drop-shadow-md flex items-center gap-1">
            <span>{formattedMinutes}</span>
            <span className={`text-amber-400 ${isRunning ? 'animate-pulse' : ''}`}>:</span>
            <span>{formattedSeconds}</span>
          </div>

          <div className="w-44 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: themeColor || '#f59e0b',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/60 pt-2 border-t border-amber-500/15 font-serif">
        <span>Steaming cup & mellow vibes</span>
        <span className="font-mono text-neutral-400">{isRunning ? 'Brewing Focus' : 'Paused'}</span>
      </div>
    </div>
  );
}
