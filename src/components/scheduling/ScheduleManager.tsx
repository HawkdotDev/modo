import { useState } from 'react';
import { Plus, Calendar, Clock, Trash2, Edit3 } from 'lucide-react';
import { Schedule, TimerPreset, PresetChain, RecurrenceType } from '../../types/timer';
import { ScheduleForm } from './ScheduleForm';
import { Switch } from '../Switch';

interface ScheduleManagerProps {
  schedules: Schedule[];
  presets: TimerPreset[];
  chains: PresetChain[];
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
  onDelete: (scheduleId: string) => void;
  onToggle: (scheduleId: string, enabled: boolean) => void;
  onClose?: () => void;
}

export function ScheduleManager({
  schedules,
  presets,
  chains,
  onSave,
  onDelete,
  onToggle,
  onClose
}: ScheduleManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleSave = (schedule: Omit<Schedule, 'id'>) => {
    onSave(schedule);
    setShowForm(false);
    setEditingSchedule(null);
  };

  const formatRecurrence = (schedule: Schedule) => {
    switch (schedule.recurrence) {
      case RecurrenceType.DAILY:
        return 'Daily';
      case RecurrenceType.WEEKLY:
        if (schedule.days && schedule.days.length > 0) {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return `${schedule.days.map(d => days[d]).join(', ')}`;
        }
        return 'Weekly';
      case RecurrenceType.MONTHLY:
        if (schedule.days && schedule.days.length > 0) {
          return `Monthly on ${schedule.days.map(d => formatOrdinal(d)).join(', ')}`;
        }
        return 'Monthly';
      default:
        return 'One-off';
    }
  };

  const formatOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const getItemName = (schedule: Schedule) => {
    if (schedule.chainId) {
      const chain = chains.find(c => c.id === schedule.chainId);
      return chain ? `Chain: ${chain.name}` : 'Custom Chain';
    } else {
      const preset = presets.find(p => p.id === schedule.presetId);
      return preset ? `Preset: ${preset.name}` : 'Custom Preset';
    }
  };

  if (showForm) {
    return (
      <ScheduleForm
        presets={presets}
        chains={chains}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingSchedule(null);
        }}
        initialValues={editingSchedule || undefined}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Scheduled Triggers</h3>
          <p className="text-xs text-neutral-400">Automate your focus routine at specific times</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/[0.1] shadow-sm transition-all"
          >
            <Plus size={14} />
            New
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
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm text-white">{schedule.name}</h4>
                <p className="text-xs text-neutral-400">{getItemName(schedule)}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="flex items-center gap-1 font-mono text-neutral-300">
                    <Clock size={12} className="text-rose-400" />
                    {schedule.startTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <Calendar size={12} />
                    {formatRecurrence(schedule)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={schedule.isEnabled}
                  onChange={(enabled) => onToggle(schedule.id, enabled)}
                />
                <button
                  onClick={() => handleEdit(schedule)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                  title="Edit schedule"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => onDelete(schedule.id)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete schedule"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {schedules.length === 0 && (
          <div className="text-center py-10 px-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] space-y-2">
            <Clock size={28} className="mx-auto text-neutral-600" />
            <p className="text-sm font-medium text-neutral-400">No scheduled sessions</p>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Set alarms and automatic start triggers for your daily habits and work blocks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}