import { TimerPreset } from '../types/timer';
import { Plus, Check, Clock } from 'lucide-react';

interface PresetSelectorProps {
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  onSelectPreset: (preset: TimerPreset) => void;
  onOpenPresetForm: () => void;
  onClose?: () => void;
}

export function PresetSelector({
  presets,
  selectedPreset,
  onSelectPreset,
  onOpenPresetForm,
  onClose
}: PresetSelectorProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Focus Presets</h3>
          <p className="text-xs text-neutral-400">Choose or configure your routine</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresetForm}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/[0.1] shadow-sm transition-all"
          >
            <Plus size={14} />
            New Preset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
              title="Close panel"
            >
              <span className="sr-only">Close</span>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {presets.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden group ${
                isSelected
                  ? 'bg-white/[0.09] border-rose-500/50 shadow-glow-rose'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{preset.name}</span>
                    {preset.isDefault && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1 font-mono text-neutral-300">
                      <Clock size={12} className="text-rose-400" />
                      {preset.workMinutes}m focus
                    </span>
                    <span>•</span>
                    <span className="font-mono text-emerald-400">
                      {preset.breakMinutes}m break
                    </span>
                    <span>•</span>
                    <span className="font-mono text-neutral-400">
                      {preset.iterations} rounds
                    </span>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-rose-500 text-white shadow-sm' 
                    : 'bg-white/[0.04] text-transparent group-hover:text-neutral-500 border border-white/[0.08]'
                }`}>
                  <Check size={14} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}