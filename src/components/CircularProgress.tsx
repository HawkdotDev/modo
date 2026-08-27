import { ReactNode } from 'react';

interface CircularProgressProps {
  progress: number;
  isBreak: boolean;
  workColor: string;
  breakColor: string;
  children: ReactNode;
  size?: number;
  smooth?: boolean;
  isRunning?: boolean;
}

export function CircularProgress({
  progress,
  isBreak,
  workColor,
  breakColor,
  children,
  size = 420,
  smooth = true,
  isRunning = false
}: CircularProgressProps) {
  const strokeWidth = 11;
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - Math.max(0, Math.min(1, progress)) * circumference;
  const activeColor = isBreak ? breakColor : workColor;
  const filterId = `glow-${isBreak ? 'break' : 'work'}`;

  return (
    <div className="relative inline-flex items-center justify-center select-none group">
      {/* Inner ambient glow */}
      <div 
        className="absolute rounded-full pointer-events-none transition-all duration-1000"
        style={{
          width: `${size * 0.78}px`,
          height: `${size * 0.78}px`,
          backgroundColor: activeColor,
          opacity: 0.06,
          filter: 'blur(35px)'
        }}
      />

      {/* Inner Frosted Glass Disc */}
      <div 
        className="absolute rounded-full border border-white/[0.06] bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-500"
        style={{
          width: `${size * 0.82}px`,
          height: `${size * 0.82}px`,
        }}
      />

      <svg height={size} width={size} className="transform -rotate-90 relative z-10">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          stroke="rgba(255, 255, 255, 0.06)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Active Progress Arc */}
        <circle
          stroke={activeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ 
            strokeDashoffset,
            transition: smooth && isRunning
              ? 'stroke 0.5s ease'
              : 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          filter={`url(#${filterId})`}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute z-20 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}