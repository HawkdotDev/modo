import { TimerMode } from '../../hooks/useTimer';
import { Flame, Coffee } from 'lucide-react';

interface LofiSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  accentColor?: string;
  themeColor: string;
}

export function LofiScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
  accentColor = '#f43f5e',
  themeColor
}: LofiSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';

  return (
    <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#141226] via-[#1a152e] to-[#0f0c1b] p-6 flex flex-col justify-between select-none">
      {/* Background Room & Window Scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rainy Night Window */}
        <div className="absolute top-4 left-6 right-6 h-36 rounded-2xl bg-[#0a0818]/80 border border-white/[0.08] overflow-hidden">
          {/* Distant City Skyline Lights */}
          <div className="absolute bottom-0 inset-x-0 h-16 flex items-end justify-around opacity-40">
            <div className="w-6 h-12 bg-purple-500/30 rounded-t-sm" />
            <div className="w-8 h-14 bg-amber-400/20 rounded-t-sm" />
            <div className="w-5 h-8 bg-blue-400/30 rounded-t-sm" />
            <div className="w-10 h-16 bg-rose-500/20 rounded-t-sm" />
            <div className="w-7 h-10 bg-emerald-400/20 rounded-t-sm" />
          </div>

          {/* Rain Streaks Animation */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] bg-[length:100%_40px] animate-pulse opacity-60" />
          
          {/* Warm Ambient Moon Glow */}
          <div className="absolute top-3 right-6 w-10 h-10 rounded-full bg-amber-100/20 blur-md" />
        </div>

        {/* Cozy Room Wall Lights */}
        <div className="absolute top-1/2 left-8 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="absolute top-1/3 right-8 w-40 h-40 rounded-full bg-purple-600/15 blur-3xl" />
      </div>

      {/* Top Banner: Lofi Study Girl Status */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-medium text-neutral-200">
            {isWork ? 'Lofi Girl Studying' : 'Break Time Chill'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-neutral-300">
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Main Desk Stage: Embedded Retro Wooden Desk Clock & Study Scene */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Animated Cozy Study Illustration Silhouette */}
        <div className="relative mb-3 flex items-center justify-center">
          {/* Desk Lamp Ambient Glow */}
          <div 
            className="absolute -top-6 -left-8 w-24 h-24 rounded-full blur-xl opacity-60 transition-colors duration-500"
            style={{ backgroundColor: isWork ? '#f59e0b' : '#10b981' }}
          />

          {/* Steaming Mug & Cat Sleeping Badges */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 mb-1">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <Coffee size={13} className="text-amber-400 animate-bounce" />
              Warm Tea
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <span className="text-xs">🐱</span>
              Napping Cat
            </span>
          </div>
        </div>

        {/* The Desk Pomodoro Clock Card */}
        <div 
          className="px-8 py-5 rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-500 flex flex-col items-center gap-2"
          style={{
            backgroundColor: 'rgba(10, 8, 22, 0.75)',
            borderColor: `${themeColor}60`,
            boxShadow: `0 0 30px ${themeColor}25`
          }}
        >
          {/* Phase Badge */}
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {isWork ? <Flame size={14} style={{ color: themeColor }} /> : <Coffee size={14} className="text-emerald-400" />}
            <span style={{ color: themeColor }}>{isWork ? 'Focus Session' : 'Rest Break'}</span>
          </div>

          {/* Glowing Digital Time Display */}
          <div 
            className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md flex items-center gap-1"
          >
            <span>{formattedMinutes}</span>
            <span className={`transition-opacity duration-300 ${isRunning ? 'animate-pulse' : 'opacity-80'}`} style={{ color: themeColor }}>:</span>
            <span>{formattedSeconds}</span>
          </div>

          {/* Smooth Desk Clock Progress Bar */}
          <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: themeColor,
                boxShadow: `0 0 10px ${themeColor}`
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Desk Strip: Aesthetic study items */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          Lofi Study Atmosphere
        </span>
        <span className="font-mono text-neutral-400">
          {isRunning ? 'Relaxed Focus' : 'Paused on Desk'}
        </span>
      </div>
    </div>
  );
}
