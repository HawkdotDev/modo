import { useState, FormEvent } from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';
import { TimerPreset, ChainedPreset, PresetChain } from '../types/timer';
import { TimeInput } from './TimeInput';

interface PresetChainFormProps {
  presets: TimerPreset[];
  onSave: (chain: Omit<PresetChain, 'id'>) => void;
  onCancel: () => void;
  initialValues?: PresetChain | null;
}

export function PresetChainForm({ presets, onSave, onCancel, initialValues }: PresetChainFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [chainedPresets, setChainedPresets] = useState<ChainedPreset[]>(
    initialValues?.presets ?? [
      { preset: presets[0] || { id: 'classic', name: 'Classic Pomodoro', workMinutes: 25, breakMinutes: 5, workSeconds: 0, breakSeconds: 0, iterations: 4 }, delayMinutes: 0, delaySeconds: 0 }
    ]
  );

  const addPreset = () => {
    setChainedPresets(prev => [...prev, {
      preset: presets[0],
      delayMinutes: 0,
      delaySeconds: 0
    }]);
  };

  const removePreset = (index: number) => {
    setChainedPresets(prev => prev.filter((_, i) => i !== index));
  };

  const updateChainedPreset = (index: number, updates: Partial<ChainedPreset>) => {
    setChainedPresets(prev => prev.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ name: name.trim() || 'Focus Chain', presets: chainedPresets });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div>
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Layers size={16} className="text-rose-400" />
          {initialValues ? 'Edit Preset Chain' : 'Create Preset Chain'}
        </h3>
        <p className="text-xs text-neutral-400">Chain presets together with customizable intermissions</p>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-neutral-300">Chain Name</label>
        <input
          type="text"
          value={name}
          placeholder="e.g. Morning Deep Flow"
          onChange={(e) => setName(e.target.value)}
          className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
          required
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Stages ({chainedPresets.length})</label>
        </div>

        {chainedPresets.map((chainedPreset, index) => (
          <div key={index} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Stage {index + 1}</span>
              {chainedPresets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePreset(index)}
                  className="p-1 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-neutral-400">Select Preset</label>
                <select
                  value={chainedPreset.preset.id}
                  onChange={(e) => updateChainedPreset(index, {
                    preset: presets.find(p => p.id === e.target.value)!
                  })}
                  className="px-3 py-2 bg-black/50 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-rose-500/50"
                >
                  {presets.map(preset => (
                    <option key={preset.id} value={preset.id} className="bg-neutral-900 text-white">
                      {preset.name} ({preset.workMinutes}m/{preset.breakMinutes}m)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-neutral-400">Delay Before Start</label>
                <TimeInput
                  label=""
                  minutes={chainedPreset.delayMinutes}
                  seconds={chainedPreset.delaySeconds}
                  onMinutesChange={(value) => updateChainedPreset(index, { delayMinutes: value })}
                  onSecondsChange={(value) => updateChainedPreset(index, { delaySeconds: value })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPreset}
        className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/[0.12] text-xs font-semibold text-neutral-300 transition-all"
      >
        <Plus size={14} />
        Add Stage
      </button>

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
        >
          {initialValues ? 'Update Chain' : 'Save Chain'}
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