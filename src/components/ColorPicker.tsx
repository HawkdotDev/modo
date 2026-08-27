import { ThemeColors } from '../types/timer';
import { Sun, Moon, Palette } from 'lucide-react';

interface ColorPickerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onClose?: () => void;
}

export function ColorPicker({ colors, onChange, isDark, onToggleTheme, onClose }: ColorPickerProps) {
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  const presetPalettes = [
    { name: 'Neon Rose', work: '#f43f5e', rest: '#10b981', accent: '#f43f5e' },
    { name: 'Cyber Amber', work: '#f59e0b', rest: '#06b6d4', accent: '#f59e0b' },
    { name: 'Electric Violet', work: '#8b5cf6', rest: '#10b981', accent: '#8b5cf6' },
    { name: 'Pure Crimson', work: '#ef4444', rest: '#3b82f6', accent: '#ef4444' },
    { name: 'Emerald Mint', work: '#10b981', rest: '#3b82f6', accent: '#10b981' },
    { name: 'Sky Cyan', work: '#06b6d4', rest: '#f43f5e', accent: '#06b6d4' },
  ];

  const colorConfig: { key: keyof ThemeColors; title: string; desc: string }[] = [
    { key: 'accentColor', title: 'App Accent Color', desc: 'Logo, active tab dock, switches & highlights' },
    { key: 'workColor', title: 'Focus (Work) Glow', desc: 'Active focus dial and ambient aura' },
    { key: 'breakColor', title: 'Break (Rest) Glow', desc: 'Rest session dial and secondary aura' },
    { key: 'background', title: 'Background Color', desc: 'App backdrop canvas fill' },
    { key: 'text', title: 'Typography Color', desc: 'Primary text color' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Color Aesthetics</h3>
          <p className="text-xs text-neutral-400">Personalize your timer glow, accent, and theme</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      {/* Dark / Light Theme Mode Toggle Button */}
      {onToggleTheme !== undefined && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
              {isDark ? <Moon size={16} style={{ color: colors.accentColor || '#f43f5e' }} /> : <Sun size={16} className="text-amber-400" />}
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">
                {isDark ? 'Dark Theme (OLED)' : 'Light Theme'}
              </span>
              <span className="text-[10px] text-neutral-400">
                {isDark ? 'High-contrast pitch black mode' : 'Crisp high-key contrast'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold active:scale-95 transition-all shadow-sm ${
              isDark
                ? 'bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/15'
                : 'bg-white text-black hover:bg-neutral-200 border-transparent'
            }`}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      )}

      {/* Quick Color Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Palette size={13} style={{ color: colors.accentColor || '#f43f5e' }} />
          Color Palettes
        </label>
        <div className="grid grid-cols-2 gap-2">
          {presetPalettes.map((pal) => (
            <button
              key={pal.name}
              type="button"
              onClick={() => onChange({ 
                ...colors, 
                workColor: pal.work, 
                breakColor: pal.rest, 
                accentColor: pal.accent 
              })}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs font-medium text-neutral-300"
            >
              <span>{pal.name}</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: pal.accent }} title="Accent" />
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: pal.work }} title="Work" />
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: pal.rest }} title="Break" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Key-Value Pickers */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Fine-tune Colors</label>
        {colorConfig.map(({ key, title, desc }) => {
          const currentColor = colors[key] || (key === 'accentColor' ? '#f43f5e' : '#ffffff');
          return (
            <div key={key} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-all">
              <label htmlFor={`color-picker-${key}`} className="pr-2 cursor-pointer">
                <span className="text-xs font-semibold text-white block">
                  {title}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {desc}
                </span>
              </label>
              <div className="flex items-center gap-2 shrink-0">
                <div 
                  className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-md"
                  style={{ boxShadow: `0 0 10px ${currentColor}40` }}
                >
                  <input
                    id={`color-picker-${key}`}
                    name={`color_${key}`}
                    type="color"
                    value={currentColor}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    aria-label={`Choose ${title} color`}
                    className="absolute -top-2 -left-2 w-11 h-11 cursor-pointer border-0 p-0"
                    title={`Pick ${title}`}
                  />
                </div>
                <input
                  id={`color-hex-${key}`}
                  name={`hex_${key}`}
                  type="text"
                  value={currentColor}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  aria-label={`${title} hex code`}
                  className="w-20 px-2 py-1 bg-black/50 border border-white/[0.1] rounded-lg text-[11px] font-mono text-white uppercase focus:outline-none focus:border-white/40 text-center"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}