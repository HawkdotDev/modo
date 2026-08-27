import { 
  SlidersHorizontal, 
  Link2, 
  Sparkles, 
  Clock, 
  Palette, 
  Bell, 
  ChevronLeft,
  X,
  Plus, 
  Minus, 
  Flame, 
  Coffee, 
  Layers, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { Switch } from './Switch';
import { PresetSelector } from './PresetSelector';
import { PresetForm } from './PresetForm';
import { PresetChainList } from './PresetChainList';
import { PresetChainForm } from './PresetChainForm';
import { ScheduleManager } from './scheduling/ScheduleManager';
import { ColorPicker } from './ColorPicker';
import { NotificationSettings } from './NotificationSettings';
import { 
  TimerPreset, 
  PresetChain, 
  ThemeColors, 
  Schedule, 
  NotificationSettings as NotificationSettingsType 
} from '../types/timer';

export type FloatingTabType = 'quick' | 'chains' | 'presets' | 'schedules' | 'theme' | 'alerts';

interface QuickSettingsContentProps {
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  onWorkMinutesChange: (value: number) => void;
  onWorkSecondsChange: (value: number) => void;
  onBreakMinutesChange: (value: number) => void;
  onBreakSecondsChange: (value: number) => void;
  onIterationsChange: (value: number) => void;
  onRequireManualStartChange: (value: boolean) => void;
  soundEnabled?: boolean;
  volume?: number;
  onToggleSound?: (enabled: boolean) => void;
  onVolumeChange?: (volume: number) => void;
  disabled?: boolean;
  onClose?: () => void;
}

export function QuickSettingsContent({
  workMinutes,
  workSeconds,
  breakMinutes,
  breakSeconds,
  iterations,
  requireManualStart,
  onWorkMinutesChange,
  onWorkSecondsChange,
  onBreakMinutesChange,
  onBreakSecondsChange,
  onIterationsChange,
  onRequireManualStartChange,
  soundEnabled = true,
  volume = 0.5,
  onToggleSound,
  onVolumeChange,
  disabled = false,
  onClose
}: QuickSettingsContentProps) {
  const quickTemplates = [
    { name: 'Classic', work: 25, break: 5, iterations: 4 },
    { name: 'Deep Focus', work: 50, break: 10, iterations: 3 },
    { name: 'Sprint', work: 15, break: 3, iterations: 4 },
    { name: 'Ultradian', work: 90, break: 20, iterations: 2 },
  ];

  const adjustWorkMinutes = (delta: number) => {
    onWorkMinutesChange(Math.max(1, Math.min(120, workMinutes + delta)));
  };

  const adjustBreakMinutes = (delta: number) => {
    onBreakMinutesChange(Math.max(1, Math.min(60, breakMinutes + delta)));
  };

  const adjustIterations = (delta: number) => {
    onIterationsChange(Math.max(1, Math.min(12, iterations + delta)));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Single Unified Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Quick Adjust</h3>
          <p className="text-xs text-neutral-400">Fine-tune your routine and active interval</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Section 1: Quick Routine Templates */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={13} className="text-amber-400" />
          Routine Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {quickTemplates.map((tmpl) => {
            const isActive = workMinutes === tmpl.work && breakMinutes === tmpl.break;
            return (
              <button
                key={tmpl.name}
                type="button"
                onClick={() => {
                  onWorkMinutesChange(tmpl.work);
                  onWorkSecondsChange(0);
                  onBreakMinutesChange(tmpl.break);
                  onBreakSecondsChange(0);
                  onIterationsChange(tmpl.iterations);
                }}
                disabled={disabled}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-rose-500/15 border-rose-500/50 text-white shadow-sm'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-neutral-300'
                }`}
              >
                <div className="text-sm font-semibold text-white">{tmpl.name}</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">{tmpl.work}m / {tmpl.break}m</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Work (Focus) Time Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 hover:border-white/[0.1] transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-neutral-200">
            <Flame size={15} className="text-rose-400" />
            <span className="text-sm font-semibold">Focus Duration</span>
          </div>
          <span className="font-mono text-sm font-bold text-rose-400">
            {workMinutes}m {workSeconds > 0 ? `${workSeconds}s` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustWorkMinutes(-5)}
              disabled={disabled || workMinutes <= 5}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Subtract 5 minutes"
            >
              -5m
            </button>
            <button
              type="button"
              onClick={() => adjustWorkMinutes(-1)}
              disabled={disabled || workMinutes <= 1}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Subtract 1 minute"
            >
              <Minus size={13} />
            </button>
          </div>

          {/* Centered Min/Sec Inputs */}
          <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/[0.1]">
            <input
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) => onWorkMinutesChange(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Focus Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={workSeconds}
              onChange={(e) => onWorkSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={disabled}
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Focus Seconds"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustWorkMinutes(1)}
              disabled={disabled || workMinutes >= 120}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Add 1 minute"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={() => adjustWorkMinutes(5)}
              disabled={disabled || workMinutes >= 115}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Add 5 minutes"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Break Time Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 hover:border-white/[0.1] transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-neutral-200">
            <Coffee size={15} className="text-emerald-400" />
            <span className="text-sm font-semibold">Break Duration</span>
          </div>
          <span className="font-mono text-sm font-bold text-emerald-400">
            {breakMinutes}m {breakSeconds > 0 ? `${breakSeconds}s` : ''}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustBreakMinutes(-5)}
              disabled={disabled || breakMinutes <= 5}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Subtract 5 minutes"
            >
              -5m
            </button>
            <button
              type="button"
              onClick={() => adjustBreakMinutes(-1)}
              disabled={disabled || breakMinutes <= 1}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Subtract 1 minute"
            >
              <Minus size={13} />
            </button>
          </div>

          {/* Centered Min/Sec Inputs */}
          <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/[0.1]">
            <input
              type="number"
              min="1"
              max="60"
              value={breakMinutes}
              onChange={(e) => onBreakMinutesChange(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Break Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={breakSeconds}
              onChange={(e) => onBreakSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={disabled}
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Break Seconds"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustBreakMinutes(1)}
              disabled={disabled || breakMinutes >= 60}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Add 1 minute"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={() => adjustBreakMinutes(5)}
              disabled={disabled || breakMinutes >= 55}
              className="px-2 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-semibold text-neutral-200 hover:text-white border border-white/[0.08] transition-all"
              title="Add 5 minutes"
            >
              +5m
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Total Rounds Stepper */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
            <Layers size={16} className="text-neutral-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Total Rounds</span>
            <span className="text-xs text-neutral-400">{iterations} iteration{iterations > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/[0.1]">
          <button
            type="button"
            onClick={() => adjustIterations(-1)}
            disabled={disabled || iterations <= 1}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white transition-all"
          >
            <Minus size={13} />
          </button>
          <span className="w-6 text-center font-mono text-sm font-bold text-white">
            {iterations}
          </span>
          <button
            type="button"
            onClick={() => adjustIterations(1)}
            disabled={disabled || iterations >= 12}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed text-neutral-200 hover:text-white transition-all"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>

      {/* Section 5: Audio Chimes & Volume */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 hover:border-white/[0.1] transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
              {soundEnabled ? (
                <Volume2 size={16} className="text-rose-400" />
              ) : (
                <VolumeX size={16} className="text-neutral-500" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-white block">Audio Chimes</span>
              <span className="text-xs text-neutral-400">Synthesized audio cues</span>
            </div>
          </div>
          {onToggleSound && (
            <Switch
              checked={soundEnabled}
              onChange={onToggleSound}
              disabled={disabled}
            />
          )}
        </div>
        {soundEnabled && onVolumeChange && (
          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-rose-500"
              disabled={disabled}
              title="Adjust chime volume"
            />
            <span className="text-xs font-mono font-semibold text-neutral-300 w-9 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Section 6: Manual Interval Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div>
          <span className="text-sm font-semibold text-white block">Manual Interval</span>
          <span className="text-xs text-neutral-400">Wait for button click to advance</span>
        </div>
        <Switch
          checked={requireManualStart || false}
          onChange={onRequireManualStartChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

interface FloatingSidebarProps {
  activeTab: FloatingTabType | null;
  onSelectTab: (tab: FloatingTabType | null) => void;
  // Quick settings props
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  onWorkMinutesChange: (value: number) => void;
  onWorkSecondsChange: (value: number) => void;
  onBreakMinutesChange: (value: number) => void;
  onBreakSecondsChange: (value: number) => void;
  onIterationsChange: (value: number) => void;
  onRequireManualStartChange: (value: boolean) => void;
  soundEnabled?: boolean;
  volume?: number;
  onToggleSound?: (enabled: boolean) => void;
  onVolumeChange?: (volume: number) => void;
  disabled?: boolean;
  // Presets props
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  onSelectPreset: (preset: TimerPreset) => void;
  showPresetForm: boolean;
  onOpenPresetForm: () => void;
  onSavePreset: (preset: Omit<TimerPreset, 'id'>) => void;
  onCancelPresetForm: () => void;
  // Chains props
  chains: PresetChain[];
  selectedChain: PresetChain | null;
  onSelectChain: (chain: PresetChain) => void;
  showChainForm: boolean;
  onOpenChainForm: () => void;
  onEditChain: (chain: PresetChain) => void;
  onSaveChain: (chain: Omit<PresetChain, 'id'>) => void;
  onCancelChainForm: () => void;
  onDeleteChain: (chainId: string) => void;
  // Schedules props
  schedules: Schedule[];
  onSaveSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onToggleSchedule: (scheduleId: string, enabled: boolean) => void;
  // Appearance & Notifications
  isDark?: boolean;
  onToggleTheme?: () => void;
  colors: ThemeColors;
  onColorChange: (colors: ThemeColors) => void;
  notificationSettings: NotificationSettingsType;
  onUpdateNotificationSettings: (settings: NotificationSettingsType) => void;
}

export function FloatingSidebar({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  workMinutes,
  workSeconds,
  breakMinutes,
  breakSeconds,
  iterations,
  requireManualStart,
  onWorkMinutesChange,
  onWorkSecondsChange,
  onBreakMinutesChange,
  onBreakSecondsChange,
  onIterationsChange,
  onRequireManualStartChange,
  soundEnabled = true,
  volume = 0.5,
  onToggleSound,
  onVolumeChange,
  disabled = false,
  presets,
  selectedPreset,
  onSelectPreset,
  showPresetForm,
  onOpenPresetForm,
  onSavePreset,
  onCancelPresetForm,
  chains,
  selectedChain,
  onSelectChain,
  showChainForm,
  onOpenChainForm,
  onEditChain,
  onSaveChain,
  onCancelChainForm,
  onDeleteChain,
  schedules,
  onSaveSchedule,
  onDeleteSchedule,
  onToggleSchedule,
  colors,
  onColorChange,
  notificationSettings,
  onUpdateNotificationSettings,
}: FloatingSidebarProps) {
  const isExpanded = activeTab !== null;

  const tabs: { id: FloatingTabType; label: string; icon: typeof SlidersHorizontal }[] = [
    { id: 'quick', label: 'Quick Adjust', icon: SlidersHorizontal },
    { id: 'chains', label: 'Preset Chains', icon: Link2 },
    { id: 'presets', label: 'Focus Presets', icon: Sparkles },
    { id: 'schedules', label: 'Schedules', icon: Clock },
    { id: 'theme', label: 'Aesthetics', icon: Palette },
    { id: 'alerts', label: 'Notifications', icon: Bell },
  ];

  const handleTabClick = (tabId: FloatingTabType) => {
    if (activeTab === tabId) {
      onSelectTab(null); // collapse if already open
    } else {
      onSelectTab(tabId);
    }
  };

  const handleClose = () => {
    onSelectTab(null);
  };

  return (
    <div className="fixed right-4 sm:right-6 top-4 bottom-4 sm:top-5 sm:bottom-5 z-30 flex items-stretch transition-all duration-300">
      {/* Floating Main Content Glass Panel (Left of Tab Strip) */}
      <aside
        aria-label="Floating Settings Panel"
        className={`h-full flex flex-col glass-panel rounded-2xl sm:rounded-l-3xl sm:rounded-r-none border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? 'w-[340px] sm:w-[360px] opacity-100 p-5 border-r-0 border pointer-events-auto'
            : 'w-0 opacity-0 p-0 border-0 pointer-events-none'
        }`}
      >
        <div className="w-[300px] sm:w-[320px] h-full flex flex-col">
          {/* Dynamic Content Views with Constant Scrollable Area - Single Header inside each view */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1.5 space-y-4">
            {activeTab === 'quick' && (
              <QuickSettingsContent
                workMinutes={workMinutes}
                workSeconds={workSeconds}
                breakMinutes={breakMinutes}
                breakSeconds={breakSeconds}
                iterations={iterations}
                requireManualStart={requireManualStart}
                onWorkMinutesChange={onWorkMinutesChange}
                onWorkSecondsChange={onWorkSecondsChange}
                onBreakMinutesChange={onBreakMinutesChange}
                onBreakSecondsChange={onBreakSecondsChange}
                onIterationsChange={onIterationsChange}
                onRequireManualStartChange={onRequireManualStartChange}
                soundEnabled={soundEnabled}
                volume={volume}
                onToggleSound={onToggleSound}
                onVolumeChange={onVolumeChange}
                disabled={disabled}
                onClose={handleClose}
              />
            )}

            {activeTab === 'chains' && (
              showChainForm ? (
                <PresetChainForm
                  presets={presets}
                  onSave={onSaveChain}
                  onCancel={onCancelChainForm}
                  initialValues={selectedChain}
                />
              ) : (
                <PresetChainList
                  chains={chains}
                  onSelectChain={onSelectChain}
                  onCreateChain={onOpenChainForm}
                  onEditChain={onEditChain}
                  onDeleteChain={onDeleteChain}
                  onClose={handleClose}
                />
              )
            )}

            {activeTab === 'presets' && (
              showPresetForm ? (
                <PresetForm
                  onSave={onSavePreset}
                  onCancel={onCancelPresetForm}
                  existingPresets={presets}
                />
              ) : (
                <PresetSelector
                  presets={presets}
                  selectedPreset={selectedPreset}
                  onSelectPreset={onSelectPreset}
                  onOpenPresetForm={onOpenPresetForm}
                  onClose={handleClose}
                />
              )
            )}

            {activeTab === 'schedules' && (
              <ScheduleManager
                schedules={schedules}
                presets={presets}
                chains={chains}
                onSave={onSaveSchedule}
                onDelete={onDeleteSchedule}
                onToggle={onToggleSchedule}
                onClose={handleClose}
              />
            )}

            {activeTab === 'theme' && (
              <ColorPicker 
                colors={colors} 
                onChange={onColorChange} 
                isDark={isDark}
                onToggleTheme={onToggleTheme}
                onClose={handleClose}
              />
            )}

            {activeTab === 'alerts' && (
              <NotificationSettings
                settings={notificationSettings}
                onUpdate={onUpdateNotificationSettings}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </aside>

      {/* Vertical Floating Tab Strip (Right Edge) */}
      <div className={`flex flex-col items-center justify-between p-2 glass-panel transition-all duration-300 ${
        isExpanded ? 'rounded-2xl sm:rounded-r-3xl sm:rounded-l-none border-l-0' : 'rounded-2xl sm:rounded-3xl'
      } border border-white/10 shadow-2xl z-40 backdrop-blur-2xl h-full`}>
        <div className="flex flex-col items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-2.5 rounded-xl transition-all duration-200 relative group flex items-center justify-center ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-glow-rose scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                }`}
                title={tab.label}
              >
                <Icon size={16} className={isActive ? 'rotate-0' : 'group-hover:scale-110 transition-transform'} />
                
                {/* Tooltip on hover */}
                <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Collapse Tab toggle */}
        <button
          onClick={() => onSelectTab(isExpanded ? null : 'quick')}
          className="mt-auto pt-2 border-t border-white/[0.08] p-2 rounded-xl text-neutral-400 hover:text-white transition-all w-full flex items-center justify-center hover:bg-white/[0.08]"
          title={isExpanded ? "Collapse Panel" : "Expand Panel"}
        >
          <ChevronLeft 
            size={16} 
            className={`transition-transform duration-300 ease-out ${isExpanded ? 'rotate-180 text-rose-400' : 'rotate-0 text-neutral-400'}`} 
          />
        </button>
      </div>
    </div>
  );
}
