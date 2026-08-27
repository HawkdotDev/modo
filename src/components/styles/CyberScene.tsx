import { TimerMode } from '../../hooks/useTimer';
import { Cpu, Zap, Activity } from 'lucide-react';

interface CyberSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
}

export function CyberScene({
  minutes,
  seconds,
  mode,
  progress,
  isRunning,
}: CyberSceneProps) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const isWork = mode === 'work';
  const cyberColor = isWork ? '#06b6d4' : '#10b981'; // Cyan for cyber focus, Emerald for rest

  return (
    <div className="relative w-full max-w-[460px] aspect-square rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#060814] shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 flex flex-col items-center justify-between select-none">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1e38_1px,transparent_1px),linear-gradient(to_bottom,#0e1e38_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
      
      {/* Holographic Concentric Rings */}
      <div className="absolute inset-8 rounded-full border border-cyan-500/20 pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-16 rounded-full border border-dashed border-cyan-500/30 pointer-events-none" />

      {/* Top HUD bar */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
          <Cpu size={12} className={isRunning ? 'animate-spin' : ''} />
          <span>CYBER.CORE v2.4</span>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: cyberColor }}>
          <Activity size={13} className="animate-pulse" />
          <span>{isWork ? 'OVERDRIVE_FOCUS' : 'RECHARGE_MODE'}</span>
        </div>
      </div>

      {/* Center Hologram Dial Display */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        {/* Glowing HUD Digital Numbers */}
        <div 
          className="font-mono text-6xl sm:text-7xl font-black tracking-widest flex items-center gap-1"
          style={{
            color: '#ffffff',
            textShadow: `0 0 20px ${cyberColor}, 0 0 40px ${cyberColor}80`
          }}
        >
          <span>{formattedMinutes}</span>
          <span className={`transition-opacity ${isRunning ? 'animate-pulse' : 'opacity-70'}`} style={{ color: cyberColor }}>:</span>
          <span>{formattedSeconds}</span>
        </div>

        {/* Phase Code Tag */}
        <div className="flex items-center gap-2 mt-2 font-mono text-xs px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300">
          <Zap size={11} className="fill-current" />
          <span>STATUS: {Math.round(progress)}% EXECUTED</span>
        </div>
      </div>

      {/* Bottom Circular Radar Bar */}
      <div className="relative z-10 w-full space-y-1.5 font-mono">
        <div className="w-full h-2 rounded bg-cyan-950/80 border border-cyan-500/30 p-0.5 overflow-hidden">
          <div
            className="h-full rounded transition-all duration-200"
            style={{
              width: `${progress}%`,
              backgroundColor: cyberColor,
              boxShadow: `0 0 15px ${cyberColor}`
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-cyan-500/70">
          <span>INITIALIZE</span>
          <span>[SYSTEM_SYNC]</span>
          <span>TERMINATE</span>
        </div>
      </div>
    </div>
  );
}
