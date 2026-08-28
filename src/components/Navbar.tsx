import { memo } from 'react';

export function PomodoroIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
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

export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
      />
    </svg>
  );
}

interface NavbarProps {
  accentColor?: string;
}

export const Navbar = memo(function Navbar({ accentColor = '#f43f5e' }: NavbarProps) {
  return (
    <header className="fixed top-5 left-5 sm:top-6 sm:left-6 z-40 flex items-center gap-3 select-none pointer-events-auto">
      {/* Brand Icon & Title */}
      <div className="flex items-center gap-2.5 group cursor-default">
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
          Modo
        </h1>
      </div>

      {/* Pipe Separator */}
      <span className="text-white/20 font-extralight text-sm select-none" aria-hidden="true">
        |
      </span>

      {/* GitHub Repository Link */}
      <a
        href="https://github.com/HawkdotDev/modo"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.1] border border-white/[0.06] hover:border-white/20 backdrop-blur-xl shadow-sm transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center group"
        title="View Modo on GitHub"
        aria-label="View Modo on GitHub"
      >
        <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:rotate-6 transition-all duration-200" />
      </a>
    </header>
  );
});