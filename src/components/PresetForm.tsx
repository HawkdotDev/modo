import { useState, FormEvent } from 'react';
import { TimerPreset } from '../types/timer';
import { Switch } from './Switch';
import { Sparkles } from 'lucide-react';

interface PresetFormProps {
  onSave: (preset: Omit<TimerPreset, 'id'>) => void;
  onCancel: () => void;
  initialValues?: {
    workMinutes: number;
    breakMinutes: number;
    iterations: number;
    requireManualStart?: boolean;
  };
  existingPresets?: TimerPreset[];
}

export function PresetForm({
  onSave,
  onCancel,
  initialValues,
  existingPresets = []
}: PresetFormProps) {
  const [name, setName] = useState('');
  const [workMinutes, setWorkMinutes] = useState(initialValues?.workMinutes ?? 25);
  const [breakMinutes, setBreakMinutes] = useState(initialValues?.breakMinutes ?? 5);
  const [iterations, setIterations] = useState(initialValues?.iterations ?? 4);
  const [requireManualStart, setRequireManualStart] = useState(initialValues?.requireManualStart ?? false);
  const [isDefault, setIsDefault] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (isDefault && existingPresets) {
      existingPresets.forEach(preset => {
        if (preset.isDefault) {
          preset.isDefault = false;
        }
      });
    }
    
    onSave({
      name: name.trim() || 'Custom Session',
      workMinutes,
      breakMinutes,
      iterations,
      requireManualStart,
      workSeconds: 0,
      breakSeconds: 0,
      isDefault
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-rose-400" />
          Create Preset
        </h3>
        <p className="text-xs text-neutral-400">Save your custom routine for instant access</p>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="preset-form-name" className="text-xs font-semibold text-neutral-300 cursor-pointer">Preset Name</label>
        <input
          id="preset-form-name"
          name="presetName"
          type="text"
          value={name}
          placeholder="e.g. Ultra Focus"
          onChange={(e) => setName(e.target.value)}
          aria-label="Preset Name"
          className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preset-form-work-minutes" className="text-xs font-semibold text-neutral-300 cursor-pointer">Work Duration (m)</label>
          <input
            id="preset-form-work-minutes"
            name="workMinutes"
            type="number"
            min="1"
            max="120"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
            aria-label="Work Duration in Minutes"
            className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm font-mono text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="preset-form-break-minutes" className="text-xs font-semibold text-neutral-300 cursor-pointer">Break Duration (m)</label>
          <input
            id="preset-form-break-minutes"
            name="breakMinutes"
            type="number"
            min="1"
            max="60"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
            aria-label="Break Duration in Minutes"
            className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm font-mono text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="preset-form-iterations" className="text-xs font-semibold text-neutral-300 cursor-pointer">Number of Rounds</label>
        <input
          id="preset-form-iterations"
          name="iterations"
          type="number"
          min="1"
          max="12"
          value={iterations}
          onChange={(e) => setIterations(Math.max(1, parseInt(e.target.value) || 1))}
          aria-label="Number of Rounds"
          className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm font-mono text-white focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
        />
      </div>

      <div className="space-y-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-300 block">Manual Start</span>
            <span className="text-[11px] text-neutral-500">Wait for click between sessions</span>
          </div>
          <Switch
            checked={requireManualStart}
            onChange={setRequireManualStart}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div>
            <span className="text-xs font-medium text-neutral-300 block">Default Preset</span>
            <span className="text-[11px] text-neutral-500">Auto-load on startup</span>
          </div>
          <Switch
            checked={isDefault}
            onChange={setIsDefault}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
        >
          Save Preset
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-2.5 px-4 bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold rounded-xl border border-white/[0.08] transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}