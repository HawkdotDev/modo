import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/[0.06] hover:border-white/[0.12] transition-all"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} className="hover:rotate-45 transition-transform" /> : <Moon size={18} />}
    </button>
  );
}