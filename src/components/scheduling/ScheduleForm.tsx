import { useState, FormEvent } from 'react';
import { TimerPreset, PresetChain, Schedule, RecurrenceType, scheduleSchema } from '../../types/timer';
import { Switch } from '../Switch';
import { ArrowLeft, Calendar } from 'lucide-react';

interface ScheduleFormProps {
  presets: TimerPreset[];
  chains: PresetChain[];
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Partial<Schedule>;
}

export function ScheduleForm({
  presets,
  chains,
  onSave,
  onCancel,
  initialValues
}: ScheduleFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [selectedType, setSelectedType] = useState<'preset' | 'chain'>(
    initialValues?.chainId ? 'chain' : 'preset'
  );
  const [selectedId, setSelectedId] = useState(
    initialValues?.chainId || initialValues?.presetId || presets[0]?.id || ''
  );
  const [startTime, setStartTime] = useState(initialValues?.startTime ?? '09:00');
  const [recurrence, setRecurrence] = useState<RecurrenceType>(
    initialValues?.recurrence ?? RecurrenceType.NONE
  );
  const [days, setDays] = useState<number[]>(initialValues?.days ?? []);
  const [isEnabled, setIsEnabled] = useState(initialValues?.isEnabled ?? true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const schedule = {
      name: name.trim() || 'Focus Alarm',
      presetId: selectedType === 'preset' ? selectedId : '',
      chainId: selectedType === 'chain' ? selectedId : undefined,
      startTime,
      days: days.length > 0 ? days : undefined,
      recurrence,
      isEnabled
    };

    try {
      scheduleSchema.parse(schedule);
      onSave(schedule);
    } catch (error) {
      console.error('Invalid schedule:', error);
    }
  };

  const handleDayToggle = (day: number) => {
    setDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Calendar size={16} className="text-rose-400" />
            {initialValues ? 'Edit Schedule' : 'Create Schedule'}
          </h3>
          <p className="text-xs text-neutral-400">Trigger timers automatically at scheduled times</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-300">Schedule Label</label>
          <input
            type="text"
            value={name}
            placeholder="e.g. Daily Standup Focus"
            onChange={(e) => setName(e.target.value)}
            className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-300">Target Type</label>
          <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <button
              type="button"
              onClick={() => {
                setSelectedType('preset');
                if (presets[0]) setSelectedId(presets[0].id);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'preset'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Preset
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('chain');
                if (chains[0]) setSelectedId(chains[0].id);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'chain'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Chain
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Select {selectedType === 'preset' ? 'Preset' : 'Chain'}
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 bg-black/50 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-rose-500/50"
          >
            {selectedType === 'preset' ? (
              presets.map(preset => (
                <option key={preset.id} value={preset.id} className="bg-neutral-900 text-white">
                  {preset.name} ({preset.workMinutes}m/{preset.breakMinutes}m)
                </option>
              ))
            ) : (
              chains.map(chain => (
                <option key={chain.id} value={chain.id} className="bg-neutral-900 text-white">
                  {chain.name} ({chain.presets.length} stages)
                </option>
              ))
            )}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-300">Trigger Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-3.5 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500/50"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-300">Frequency</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
              className="px-3 py-2 bg-black/50 border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-rose-500/50"
            >
              <option value={RecurrenceType.NONE} className="bg-neutral-900">One-time</option>
              <option value={RecurrenceType.DAILY} className="bg-neutral-900">Every day</option>
              <option value={RecurrenceType.WEEKLY} className="bg-neutral-900">Weekly</option>
              <option value={RecurrenceType.MONTHLY} className="bg-neutral-900">Monthly</option>
            </select>
          </div>
        </div>

        {recurrence === RecurrenceType.WEEKLY && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-300">Active Days</label>
            <div className="flex gap-1.5 flex-wrap">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(index)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    days.includes(index)
                      ? 'bg-rose-500 text-white font-semibold shadow-glow-rose'
                      : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <span className="text-xs font-medium text-neutral-300 block">Enable Schedule</span>
            <span className="text-[11px] text-neutral-500">Timer will automatically start</span>
          </div>
          <Switch checked={isEnabled} onChange={setIsEnabled} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
          >
            {initialValues ? 'Update Schedule' : 'Save Schedule'}
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
    </div>
  );
}