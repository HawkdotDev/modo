import { TimerMode } from '../../hooks/useTimer';
import { Trees, Sun, Sparkles } from 'lucide-react';

interface ZenSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
}

export function ZenScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
}: ZenSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="relative w-full max-w-[460px] aspect-square rounded-full overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-[#0a1b14] via-[#081510] to-[#040b08] shadow-[0_0_60px_rgba(16,185,129,0.15)] p-8 flex flex-col items-center justify-between select-none">
      {/* Background Zen Rings & Nature Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className={`w-72 h-72 rounded-full border border-emerald-500/20 transition-all duration-1000 ${isRunning ? 'scale-105 opacity-70' : 'scale-95 opacity-30'}`} />
        <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/15" />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs">
        <Trees size={13} />
        <span>{isWork ? 'Mindful Focus' : 'Serene Breath'}</span>
      </div>

      {/* Center Stone Dial */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        <div className="font-mono text-6xl sm:text-7xl font-light tracking-wide text-emerald-100 drop-shadow-md flex items-center gap-1">
          <span>{formattedMinutes}</span>
          <span className={`text-emerald-400 font-normal ${isRunning ? 'animate-pulse' : ''}`}>:</span>
          <span>{formattedSeconds}</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-emerald-400/80">
          <Sparkles size={11} />
          <span>{Math.round(progress)}% Harmonized</span>
        </div>
      </div>

      {/* Bottom breathing cue */}
      <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-emerald-300/60 font-mono">
        <Sun size={12} className={isRunning ? 'animate-spin' : ''} />
        <span>{isRunning ? 'Inhale • Focus • Exhale' : 'Stillness'}</span>
      </div>
    </div>
  );
}
