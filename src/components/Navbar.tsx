import { memo } from 'react';

export function PomodoroIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tomato round body with warm glow fill */}
      <path 
        d="M12 21.5C6.5 21.5 3 17.5 3 13C3 8.5 7 6.8 12 6.8C17 6.8 21 8.5 21 13C21 17.5 17.5 21.5 12 21.5Z" 
        fill="currentColor" 
        fillOpacity="0.25"
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Curved tomato surface contour line */}
      <path 
        d="M12 7C10.2 10.5 10.2 17.5 12 21.2" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      {/* Green stem & star leaf calyx */}
      <path 
        d="M12 6.5V2.5" 
        stroke="#10b981" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M12 6.5C10.5 4.5 8 4.8 6.5 5.5C8 7 10 7.2 12 6.5Z" 
        fill="#10b981" 
        stroke="#10b981" 
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path 
        d="M12 6.5C13.5 4.5 16 4.8 17.5 5.5C16 7 14 7.2 12 6.5Z" 
        fill="#10b981" 
        stroke="#10b981" 
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface NavbarProps {
  accentColor?: string;
}

export const Navbar = memo(function Navbar({ accentColor = '#f43f5e' }: NavbarProps) {
  return (
    <header className="fixed top-5 left-5 sm:top-6 sm:left-6 z-40 flex items-center gap-2.5 select-none pointer-events-auto group cursor-default">
      <div 
        style={{ 
          color: accentColor, 
          filter: `drop-shadow(0 0 12px ${accentColor}80)` 
        }}
        className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95"
      >
        <PomodoroIcon className="w-7 h-7" />
      </div>
      <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300 m-0 leading-none">
        modo
      </h1>
    </header>
  );
});