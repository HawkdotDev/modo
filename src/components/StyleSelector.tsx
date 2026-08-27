import { Check, Sparkles, Circle, Monitor, Clock, Cpu, Coffee, Trees, Maximize2 } from 'lucide-react';
import { ClockStyle } from '../types/timer';

interface StyleSelectorProps {
  currentStyle: ClockStyle;
  onSelectStyle: (style: ClockStyle) => void;
  accentColor?: string;
  onClose?: () => void;
}

interface StyleOption {
  id: ClockStyle;
  name: string;
  category: string;
  desc: string;
  icon: typeof Circle;
  previewGradient: string;
  tag?: string;
}

const styleOptions: StyleOption[] = [
  {
    id: 'minimal',
    name: 'Minimal Ring',
    category: 'Modern Glass',
    desc: '420px glowing circular dial with millisecond progress',
    icon: Circle,
    previewGradient: 'from-rose-500/20 to-emerald-500/20',
    tag: 'Default'
  },
  {
    id: 'lofi',
    name: 'Lofi Study Room',
    category: 'Aesthetic Scene',
    desc: 'Cozy study girl desk with window rain & warm lamp',
    icon: Monitor,
    previewGradient: 'from-amber-600/30 to-purple-800/30',
    tag: 'Popular'
  },
  {
    id: 'flip',
    name: 'Retro Flip Clock',
    category: 'Mechanical',
    desc: 'Tactile split-flap cards with 3D mechanical roll',
    icon: Clock,
    previewGradient: 'from-neutral-800 to-neutral-900',
    tag: 'Vintage'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk HUD',
    category: 'Futuristic',
    desc: 'Laser holographic grid with glowing neon cyber dial',
    icon: Cpu,
    previewGradient: 'from-cyan-500/20 to-fuchsia-500/20',
    tag: 'Sci-Fi'
  },
  {
    id: 'cafe',
    name: 'Cozy Coffeehouse',
    category: 'Atmosphere',
    desc: 'Rainy cafe window sill with warm amber bokeh',
    icon: Coffee,
    previewGradient: 'from-amber-900/40 to-stone-900/40',
  },
  {
    id: 'zen',
    name: 'Zen Nature & Stone',
    category: 'Serenity',
    desc: 'Minimal Japanese stone circle with calm breathing pulse',
    icon: Trees,
    previewGradient: 'from-emerald-950 to-teal-900',
  },
  {
    id: 'giant',
    name: 'Giant Focus Digits',
    category: 'Ultra-Minimal',
    desc: 'Huge edge-to-edge typography for distraction-free flow',
    icon: Maximize2,
    previewGradient: 'from-neutral-900 to-black',
  },
];

export function StyleSelector({
  currentStyle,
  onSelectStyle,
  accentColor = '#f43f5e',
  onClose
}: StyleSelectorProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Clock Styles & Scenes</h3>
          <p className="text-xs text-neutral-400">Choose your pomodoro visual environment</p>
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

      {/* Style Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {styleOptions.map((style) => {
          const isSelected = currentStyle === style.id;
          const Icon = style.icon;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? 'border-white/30 shadow-lg'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] hover:border-white/15'
              }`}
              style={isSelected ? {
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}80`,
                boxShadow: `0 0 20px ${accentColor}30`
              } : {}}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2.5 rounded-xl border shrink-0 transition-all"
                    style={isSelected ? {
                      backgroundColor: `${accentColor}25`,
                      borderColor: `${accentColor}60`,
                      color: accentColor
                    } : {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#a3a3a3'
                    }}
                  >
                    <Icon size={18} className={isSelected ? 'animate-pulse' : ''} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{style.name}</span>
                      {style.tag && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border"
                          style={{
                            backgroundColor: `${accentColor}20`,
                            borderColor: `${accentColor}40`,
                            color: accentColor
                          }}
                        >
                          {style.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-tight">{style.desc}</p>
                    <span className="text-[10px] font-mono text-neutral-500 block pt-0.5">{style.category}</span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'text-white shadow-sm' : 'border border-white/15 bg-white/[0.02]'
                  }`}
                  style={isSelected ? { backgroundColor: accentColor } : {}}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-neutral-400 flex items-center gap-2">
        <Sparkles size={14} style={{ color: accentColor }} className="shrink-0" />
        <span>Switching styles changes the interactive stage and clock typography in real-time.</span>
      </div>
    </div>
  );
}
