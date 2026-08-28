import { ReactNode, memo } from 'react';

interface CircularProgressProps {
  progress: number;
  isBreak: boolean;
  workColor: string;
  breakColor: string;
  children: ReactNode;
  size?: number;
  smooth?: boolean;
  isRunning?: boolean;
  showGlow?: boolean;
  showRing?: boolean;
}

export const CircularProgress = memo(function CircularProgress({
  progress,
  isBreak,
  workColor,
  breakColor,
  children,
  size = 420,
  smooth = true,
  isRunning = false,
  showGlow = true,
  showRing = true
}: CircularProgressProps) {
  const strokeWidth = 11;
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - Math.max(0, Math.min(1, progress)) * circumference;
  const activeColor = isBreak ? breakColor : workColor;
  const filterId = `glow-${isBreak ? 'break' : 'work'}`;

  return (
    <div className="relative inline-flex items-center justify-center select-none group will-change-transform" role="presentation">
      {/* Inner ambient glow with smooth GPU transitions */}
      <div 
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-out"
        style={{
          width: `${size * 0.78}px`,
          height: `${size * 0.78}px`,
          backgroundColor: activeColor,
          opacity: showGlow ? 0.07 : 0,
          filter: 'blur(36px)',
          transform: 'translateZ(0)'
        }}
      />

      {/* Inner Frosted Glass Disc */}
      <div 
        aria-hidden="true"
        className="absolute rounded-full border border-white/[0.07] bg-black/45 backdrop-blur-2xl shadow-2xl transition-all duration-500 ease-out"
        style={{
          width: `${size * 0.82}px`,
          height: `${size * 0.82}px`,
          transform: 'translateZ(0)'
        }}
      />

      <svg 
        aria-hidden="true"
        role="presentation"
        height={size} 
        width={size} 
        className="transform -rotate-90 relative z-10 will-change-transform"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          stroke={showRing ? 'rgba(255, 255, 255, 0.07)' : 'transparent'}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: 'stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
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
              ? 'stroke 0.4s ease'
              : 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
            willChange: 'stroke-dashoffset'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          filter={showGlow ? `url(#${filterId})` : undefined}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-auto">
        {children}
      </div>
    </div>
  );
});