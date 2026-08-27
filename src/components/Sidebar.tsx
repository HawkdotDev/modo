import { useState } from 'react';
import { X, Clock, Bell, Palette, Sparkles } from 'lucide-react';
import { PresetSelector } from './PresetSelector';
import { PresetForm } from './PresetForm';
import { ColorPicker } from './ColorPicker';
import { NotificationSettings } from './NotificationSettings';
import { ScheduleManager } from './scheduling/ScheduleManager';
import { TimerPreset, ThemeColors, Schedule, PresetChain, NotificationSettings as NotificationSettingsType } from '../types/timer';

interface SidebarProps {
  show: boolean;
  onClose: () => void;
  showPresetForm: boolean;
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  onSelectPreset: (preset: TimerPreset) => void;
  onOpenPresetForm: () => void;
  onSavePreset: (preset: Omit<TimerPreset, 'id'>) => void;
  onCancelPresetForm: () => void;
  colors: ThemeColors;
  onColorChange: (colors: ThemeColors) => void;
  schedules: Schedule[];
  chains: PresetChain[];
  onSaveSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onToggleSchedule: (scheduleId: string, enabled: boolean) => void;
  notificationSettings: NotificationSettingsType;
  onUpdateNotificationSettings: (settings: NotificationSettingsType) => void;
}

export function Sidebar({
  show,
  onClose,
  showPresetForm,
  presets,
  selectedPreset,
  onSelectPreset,
  onOpenPresetForm,
  onSavePreset,
  onCancelPresetForm,
  colors,
  onColorChange,
  schedules,
  chains,
  onSaveSchedule,
  onDeleteSchedule,
  onToggleSchedule,
  notificationSettings,
  onUpdateNotificationSettings,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'schedules' | 'appearance' | 'notifications'>('presets');

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 z-40 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[32rem] bg-black/92 backdrop-blur-3xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out z-50 flex flex-col ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex-none p-6 border-b border-white/[0.08]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Preferences
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">Customize presets, schedules and notifications</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/[0.06] transition-all"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-1.5 mt-5 p-1 bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'presets' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Sparkles size={13} />
              Presets
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'schedules' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Clock size={13} />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'notifications' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Bell size={13} />
              Alerts
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'appearance' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Palette size={13} />
              Theme
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-lg mx-auto">
            {showPresetForm ? (
              <PresetForm
                onSave={onSavePreset}
                onCancel={onCancelPresetForm}
                existingPresets={presets}
              />
            ) : (
              <>
                {activeTab === 'presets' && (
                  <PresetSelector
                    presets={presets}
                    selectedPreset={selectedPreset}
                    onSelectPreset={onSelectPreset}
                    onOpenPresetForm={onOpenPresetForm}
                  />
                )}
                
                {activeTab === 'schedules' && (
                  <ScheduleManager
                    schedules={schedules}
                    presets={presets}
                    chains={chains}
                    onSave={onSaveSchedule}
                    onDelete={onDeleteSchedule}
                    onToggle={onToggleSchedule}
                  />
                )}
                
                {activeTab === 'notifications' && (
                  <NotificationSettings
                    settings={notificationSettings}
                    onUpdate={onUpdateNotificationSettings}
                  />
                )}
                
                {activeTab === 'appearance' && (
                  <ColorPicker colors={colors} onChange={onColorChange} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}