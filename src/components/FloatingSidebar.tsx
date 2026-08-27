import { 
  SlidersHorizontal, 
  Link2, 
  Sparkles, 
  Clock, 
  Palette, 
  Bell, 
  Headphones,
  Layout,
  Video as VideoIcon,
  ChevronLeft,
  X,
  Plus, 
  Minus, 
  Flame, 
  Coffee, 
  Layers 
} from 'lucide-react';
import { Switch } from './Switch';
import { PresetSelector } from './PresetSelector';
import { PresetForm } from './PresetForm';
import { PresetChainList } from './PresetChainList';
import { PresetChainForm } from './PresetChainForm';
import { ScheduleManager } from './scheduling/ScheduleManager';
import { ColorPicker } from './ColorPicker';
import { NotificationSettings } from './NotificationSettings';
import { AudioSettings } from './AudioSettings';
import { StyleSelector } from './StyleSelector';
import { VideoSettings } from './VideoSettings';
import { 
  TimerPreset, 
  PresetChain, 
  ThemeColors, 
  Schedule, 
  ClockStyle,
  NotificationSettings as NotificationSettingsType 
} from '../types/timer';
import { VideoItem, VideoBackgroundConfig } from '../types/video';

export type FloatingTabType = 'quick' | 'chains' | 'presets' | 'schedules' | 'styles' | 'videos' | 'theme' | 'alerts' | 'audio';

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
  smoothProgress?: boolean;
  onToggleSmoothProgress?: (enabled: boolean) => void;
  accentColor?: string;
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
  smoothProgress = true,
  onToggleSmoothProgress,
  accentColor = '#f43f5e',
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
                    ? 'text-white shadow-sm'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-neutral-300'
                }`}
                style={isActive ? {
                  backgroundColor: `${accentColor}20`,
                  borderColor: `${accentColor}80`
                } : {}}
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
            <Flame size={15} style={{ color: accentColor }} />
            <span className="text-sm font-semibold">Focus Duration</span>
          </div>
          <span className="font-mono text-sm font-bold" style={{ color: accentColor }}>
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
              id="sidebar-focus-minutes"
              name="workMinutes"
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) => onWorkMinutesChange(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              aria-label="Focus Minutes"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Focus Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              id="sidebar-focus-seconds"
              name="workSeconds"
              type="number"
              min="0"
              max="59"
              value={workSeconds}
              onChange={(e) => onWorkSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={disabled}
              aria-label="Focus Seconds"
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
              id="sidebar-break-minutes"
              name="breakMinutes"
              type="number"
              min="1"
              max="60"
              value={breakMinutes}
              onChange={(e) => onBreakMinutesChange(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
              disabled={disabled}
              aria-label="Break Minutes"
              className="w-8 text-center bg-transparent text-white font-mono text-sm font-bold focus:outline-none"
              title="Break Minutes"
            />
            <span className="text-neutral-500 font-mono text-xs">:</span>
            <input
              id="sidebar-break-seconds"
              name="breakSeconds"
              type="number"
              min="0"
              max="59"
              value={breakSeconds}
              onChange={(e) => onBreakSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              disabled={disabled}
              aria-label="Break Seconds"
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

      {/* Section 5: Manual Interval Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div>
          <span className="text-sm font-semibold text-white block">Manual Interval</span>
          <span className="text-xs text-neutral-400">Wait for button click to advance</span>
        </div>
        <Switch
          checked={requireManualStart || false}
          onChange={onRequireManualStartChange}
          disabled={disabled}
          activeColor={accentColor}
        />
      </div>

      {/* Section 6: Continuous Dial Motion Toggle */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div>
          <span className="text-sm font-semibold text-white block">Continuous Dial Motion</span>
          <span className="text-xs text-neutral-400">Smooth millisecond ring vs second-by-second ticks</span>
        </div>
        {onToggleSmoothProgress && (
          <Switch
            checked={smoothProgress}
            onChange={onToggleSmoothProgress}
            disabled={disabled}
            activeColor={accentColor}
          />
        )}
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
  smoothProgress?: boolean;
  onToggleSmoothProgress?: (enabled: boolean) => void;
  disabled?: boolean;
  isRunning?: boolean;
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
  // Clock Style & Appearance
  clockStyle?: ClockStyle;
  onSelectClockStyle?: (style: ClockStyle) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  colors: ThemeColors;
  onColorChange: (colors: ThemeColors) => void;
  notificationSettings: NotificationSettingsType;
  onUpdateNotificationSettings: (settings: NotificationSettingsType) => void;
  // Video Backgrounds props
  videoConfig?: VideoBackgroundConfig;
  onToggleVideoEnabled?: (enabled?: boolean) => void;
  onSelectVideo?: (video: VideoItem) => void;
  onUpdateVideoConfig?: (partial: Partial<VideoBackgroundConfig>) => void;
  onAddCustomVideo?: (video: Omit<VideoItem, 'id' | 'isCustom'>) => VideoItem;
  onRemoveCustomVideo?: (id: string) => void;
  onSetLocalFileVideo?: (file: File) => VideoItem;
}

export function FloatingSidebar({
  activeTab,
  onSelectTab,
  clockStyle = 'minimal',
  onSelectClockStyle,
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
  smoothProgress = true,
  onToggleSmoothProgress,
  disabled = false,
  isRunning = false,
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
  videoConfig,
  onToggleVideoEnabled,
  onSelectVideo,
  onUpdateVideoConfig,
  onAddCustomVideo,
  onRemoveCustomVideo,
  onSetLocalFileVideo,
}: FloatingSidebarProps) {
  const isExpanded = activeTab !== null;

  const tabs: { id: FloatingTabType; label: string; icon: typeof SlidersHorizontal }[] = [
    { id: 'quick', label: 'Quick Adjust', icon: SlidersHorizontal },
    { id: 'chains', label: 'Preset Chains', icon: Link2 },
    { id: 'presets', label: 'Focus Presets', icon: Sparkles },
    { id: 'schedules', label: 'Schedules', icon: Clock },
    { id: 'styles', label: 'Clock Styles', icon: Layout },
    { id: 'videos', label: 'Video Backgrounds', icon: VideoIcon },
    { id: 'theme', label: 'Aesthetics', icon: Palette },
    { id: 'alerts', label: 'Notifications', icon: Bell },
    { id: 'audio', label: 'Audio & Soundscapes', icon: Headphones },
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
        className={`h-full flex flex-col glass-panel rounded-2xl sm:rounded-3xl border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? 'w-[340px] sm:w-[360px] opacity-100 p-5 border pointer-events-auto mr-3'
            : 'w-0 opacity-0 p-0 border-0 pointer-events-none mr-0'
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
                smoothProgress={smoothProgress}
                onToggleSmoothProgress={onToggleSmoothProgress}
                accentColor={colors.accentColor}
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

            {activeTab === 'styles' && (
              <StyleSelector
                currentStyle={clockStyle || 'minimal'}
                onSelectStyle={onSelectClockStyle || (() => {})}
                accentColor={colors.accentColor}
                onClose={handleClose}
              />
            )}

            {activeTab === 'videos' && videoConfig && (
              <VideoSettings
                config={videoConfig}
                onToggleEnabled={onToggleVideoEnabled || (() => {})}
                onSelectVideo={onSelectVideo || (() => {})}
                onUpdateConfig={onUpdateVideoConfig || (() => {})}
                onAddCustomVideo={onAddCustomVideo || ((v) => ({ ...v, id: 'temp', isCustom: true }))}
                onRemoveCustomVideo={onRemoveCustomVideo || (() => {})}
                onSetLocalFileVideo={onSetLocalFileVideo || ((f) => ({ id: 'temp', title: f.name, type: 'local', url: '', isCustom: true }))}
                accentColor={colors.accentColor}
                isRunning={isRunning}
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
                accentColor={colors.accentColor}
                onClose={handleClose}
              />
            )}

            {activeTab === 'audio' && (
              <AudioSettings
                soundEnabled={soundEnabled}
                volume={volume}
                onToggleSound={onToggleSound || (() => {})}
                onVolumeChange={onVolumeChange || (() => {})}
                workCompleteChime={notificationSettings.workComplete}
                breakCompleteChime={notificationSettings.breakComplete}
                sessionCompleteChime={notificationSettings.sessionComplete}
                onToggleWorkCompleteChime={(val) => onUpdateNotificationSettings({ ...notificationSettings, workComplete: val })}
                onToggleBreakCompleteChime={(val) => onUpdateNotificationSettings({ ...notificationSettings, breakComplete: val })}
                onToggleSessionCompleteChime={(val) => onUpdateNotificationSettings({ ...notificationSettings, sessionComplete: val })}
                accentColor={colors.accentColor}
                isRunning={isRunning}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </aside>

      {/* Vertical Floating Tab Strip (Right Edge) - Transparent dock for true floating effect */}
      <div className="flex flex-col items-center justify-center gap-2 z-40 my-auto py-1">
        <div className="flex flex-col items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const currentAccent = colors.accentColor || '#f43f5e';
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-2.5 rounded-2xl transition-all duration-200 relative group flex items-center justify-center ${
                  isActive
                    ? 'scale-110 shadow-lg'
                    : 'text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-md'
                }`}
                style={isActive ? {
                  backgroundColor: currentAccent,
                  boxShadow: `0 0 18px ${currentAccent}90`,
                  borderColor: `${currentAccent}cc`,
                  color: '#ffffff'
                } : {}}
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
          className="mt-1 p-2 rounded-xl text-neutral-400 hover:text-white transition-all flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.1] border border-white/[0.06] backdrop-blur-md shadow-sm"
          title={isExpanded ? "Collapse Panel" : "Expand Panel"}
        >
          <ChevronLeft 
            size={15} 
            className={`transition-transform duration-300 ease-out ${isExpanded ? 'rotate-180' : 'rotate-0 text-neutral-400'}`} 
            style={isExpanded ? { color: colors.accentColor || '#f43f5e' } : {}}
          />
        </button>
      </div>
    </div>
  );
}
