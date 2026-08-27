import { useState, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingSidebar, FloatingTabType } from './components/FloatingSidebar';
import { TimerDisplay } from './components/TimerDisplay';
import { VideoBackground } from './components/VideoBackground';
import { useTimer } from './hooks/useTimer';
import { useScheduler } from './hooks/useScheduler';
import { useNotificationSettings } from './hooks/useNotificationSettings';
import { useVideoBackground } from './hooks/useVideoBackground';
import { showNotification, playNotificationSound } from './utils/notifications';
import { 
  TimerPreset, 
  PresetChain, 
  ThemeColors, 
  defaultPresets, 
  darkTheme,
  lightTheme,
  Schedule,
  ClockStyle,
  defaultNotificationSettings
} from './types/timer';
import { Trophy, RotateCcw } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeFloatingTab, setActiveFloatingTab] = useState<FloatingTabType | null>('quick');
  const [presets, setPresets] = useState<TimerPreset[]>(defaultPresets);
  const [chains, setChains] = useState<PresetChain[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(defaultPresets[0]);
  const [selectedChain, setSelectedChain] = useState<PresetChain | null>(null);
  const [showPresetForm, setShowPresetForm] = useState(false);
  const [showChainForm, setShowChainForm] = useState(false);
  const [colors, setColors] = useState<ThemeColors>(darkTheme);
  const [isCustom, setIsCustom] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    workMinutes: 25,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    iterations: 4,
    requireManualStart: false
  });

  const [clockStyle, setClockStyle] = useState<ClockStyle>(() => {
    try {
      return (localStorage.getItem('modo_clock_style') as ClockStyle) || 'minimal';
    } catch {
      return 'minimal';
    }
  });

  const handleSelectClockStyle = (style: ClockStyle) => {
    setClockStyle(style);
    try {
      localStorage.setItem('modo_clock_style', style);
    } catch (e) {
      console.warn('Failed to save clock style:', e);
    }
  };

  const [smoothProgress, setSmoothProgress] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('modo_smooth_dial');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const handleToggleSmoothProgress = (enabled: boolean) => {
    setSmoothProgress(enabled);
    try {
      localStorage.setItem('modo_smooth_dial', String(enabled));
    } catch (e) {
      console.warn('Failed to save smooth progress preference:', e);
    }
  };

  const { settings: notificationSettings, updateSettings: updateNotificationSettings } = 
    useNotificationSettings(defaultNotificationSettings);

  const {
    config: videoConfig,
    updateConfig: updateVideoConfig,
    toggleEnabled: toggleVideoEnabled,
    selectVideo,
    addCustomVideo,
    removeCustomVideo,
    setLocalFileVideo
  } = useVideoBackground();
  
  const baseSettings = isCustom ? customSettings : selectedPreset;
  const activeSettings = useMemo(() => ({
    ...baseSettings,
    smoothProgress
  }), [baseSettings, smoothProgress]);

  const handleWorkComplete = useCallback(() => {
    if (notificationSettings.enabled) {
      if (notificationSettings.workComplete) {
        showNotification('Work Session Complete!', { body: 'Time to take a break.' });
      }
      if (notificationSettings.sound) {
        playNotificationSound('work', notificationSettings.volume);
      }
    }
  }, [notificationSettings]);

  const handleBreakComplete = useCallback(() => {
    if (notificationSettings.enabled) {
      if (notificationSettings.breakComplete) {
        showNotification('Break Session Complete!', { body: 'Ready to focus again?' });
      }
      if (notificationSettings.sound) {
        playNotificationSound('break', notificationSettings.volume);
      }
    }
  }, [notificationSettings]);

  const handleSessionComplete = useCallback(() => {
    if (notificationSettings.enabled) {
      if (notificationSettings.sessionComplete) {
        showNotification('Session Finished!', { body: 'All Pomodoro iterations completed.' });
      }
      if (notificationSettings.sound) {
        playNotificationSound('session', notificationSettings.volume);
      }
    }
  }, [notificationSettings]);
  
  const {
    isBreak,
    timeLeft,
    isRunning,
    progress,
    currentIteration,
    isComplete,
    waitingForManualStart,
    toggleTimer,
    reset,
    updateSettings
  } = useTimer(activeSettings, {
    onWorkComplete: handleWorkComplete,
    onBreakComplete: handleBreakComplete,
    onSessionComplete: handleSessionComplete
  });

  const handleScheduleStart = (presetId: string, chainId?: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(preset);
      setIsCustom(false);
      reset();
      toggleTimer();
    }
    if (chainId) {
      const chain = chains.find(c => c.id === chainId);
      if (chain) {
        setSelectedChain(chain);
      }
    }
  };

  useScheduler(schedules, handleScheduleStart);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
    setColors(prev => prev.background === darkTheme.background ? lightTheme : darkTheme);
  };

  const handleSavePreset = (newPreset: Omit<TimerPreset, 'id'>) => {
    const preset: TimerPreset = {
      ...newPreset,
      id: Date.now().toString(),
      workSeconds: 0,
      breakSeconds: 0
    };
    setPresets((prev) => [...prev, preset]);
    setSelectedPreset(preset);
    setShowPresetForm(false);
    setIsCustom(false);
  };

  const handleSaveChain = (chain: Omit<PresetChain, 'id'>) => {
    if (selectedChain) {
      setChains(prev => prev.map(c => c.id === selectedChain.id ? { ...chain, id: selectedChain.id } : c));
      setSelectedChain(null);
    } else {
      const newChain: PresetChain = {
        ...chain,
        id: Date.now().toString()
      };
      setChains(prev => [...prev, newChain]);
    }
    setShowChainForm(false);
  };

  const handleEditChain = (chain: PresetChain) => {
    setSelectedChain(chain);
    setShowChainForm(true);
    setActiveFloatingTab('chains');
  };

  const handleDeleteChain = (chainId: string) => {
    setChains(prev => prev.filter(chain => chain.id !== chainId));
    if (selectedChain?.id === chainId) {
      setSelectedChain(null);
    }
  };

  const handleSaveSchedule = (newSchedule: Omit<Schedule, 'id'>) => {
    const schedule: Schedule = {
      ...newSchedule,
      id: Date.now().toString()
    };
    setSchedules(prev => [...prev, schedule]);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
  };

  const handleToggleSchedule = (scheduleId: string, enabled: boolean) => {
    setSchedules(prev => prev.map(s => 
      s.id === scheduleId ? { ...s, isEnabled: enabled } : s
    ));
  };

  const handleCustomSettingChange = (
    key: keyof typeof customSettings,
    value: number | boolean
  ) => {
    setCustomSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      updateSettings(newSettings);
      return newSettings;
    });
    setIsCustom(true);
  };

  const handlePresetSelect = (preset: TimerPreset) => {
    setSelectedPreset(preset);
    setSelectedChain(null);
    setIsCustom(false);
  };

  const handleSaveCustomAsPreset = () => {
    setShowPresetForm(true);
    setActiveFloatingTab('presets');
  };

  const activeColor = isBreak ? colors.breakColor : colors.workColor;

  return (
    <div 
      className="min-h-screen h-screen transition-colors duration-500 pb-0 relative overflow-hidden bg-black text-white selection:bg-rose-500/30 flex flex-col justify-between"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Video Background Layer */}
      <VideoBackground config={videoConfig} isRunning={isRunning} />

      {/* Ambient background glow aura (animated multi-layer & shifts in sync with timer) */}
      <div className={`ambient-glow-wrapper ${activeFloatingTab !== null ? 'shifted' : ''}`}>
        <div 
          className="ambient-glow-main" 
          style={{ 
            backgroundColor: activeColor,
            opacity: videoConfig.enabled ? (isRunning ? 0.16 : 0.08) : (isRunning ? 0.28 : 0.14)
          }} 
        />
        <div 
          className="ambient-glow-secondary" 
          style={{ 
            backgroundColor: isBreak ? colors.workColor : colors.breakColor,
            opacity: videoConfig.enabled ? (isRunning ? 0.12 : 0.05) : (isRunning ? 0.20 : 0.08)
          }} 
        />
      </div>

      <Navbar accentColor={colors.accentColor} />

      <main className={`flex-1 flex items-center justify-center relative z-10 px-4 transition-all duration-300 ease-in-out ${
        activeFloatingTab !== null ? 'lg:pr-[390px]' : 'pr-0'
      }`}>
        <div className="max-w-7xl w-full mx-auto flex items-center justify-center">
          <div className="flex items-center justify-center w-full">
            {isComplete ? (
              <div className="text-center p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 shadow-2xl max-w-md w-full animate-scale-in space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
                  <Trophy size={32} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Focus Session Complete!</h2>
                  <p className="text-sm text-neutral-400">
                    Outstanding focus! You finished all {activeSettings.iterations} iterations.
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black font-semibold text-sm rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-xl"
                >
                  <RotateCcw size={16} />
                  Start New Session
                </button>
              </div>
            ) : (
              <TimerDisplay
                isBreak={isBreak}
                timeLeft={timeLeft}
                isRunning={isRunning}
                progress={progress}
                currentIteration={currentIteration}
                totalIterations={activeSettings.iterations}
                workColor={colors.workColor}
                breakColor={colors.breakColor}
                accentColor={colors.accentColor}
                presetName={selectedPreset.name}
                onToggle={toggleTimer}
                onReset={reset}
                onSaveAsPreset={isCustom ? handleSaveCustomAsPreset : undefined}
                isCustom={isCustom}
                waitingForManualStart={waitingForManualStart}
                smoothProgress={smoothProgress}
                clockStyle={clockStyle}
              />
            )}
          </div>
        </div>
      </main>

      {/* Unified Vertical Floating Sidebar with Icon Tabs */}
      <FloatingSidebar
        activeTab={activeFloatingTab}
        onSelectTab={setActiveFloatingTab}
        clockStyle={clockStyle}
        onSelectClockStyle={handleSelectClockStyle}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        workMinutes={activeSettings.workMinutes}
        workSeconds={activeSettings.workSeconds}
        breakMinutes={activeSettings.breakMinutes}
        breakSeconds={activeSettings.breakSeconds}
        iterations={activeSettings.iterations}
        requireManualStart={activeSettings.requireManualStart}
        onWorkMinutesChange={(value) => handleCustomSettingChange('workMinutes', value)}
        onWorkSecondsChange={(value) => handleCustomSettingChange('workSeconds', value)}
        onBreakMinutesChange={(value) => handleCustomSettingChange('breakMinutes', value)}
        onBreakSecondsChange={(value) => handleCustomSettingChange('breakSeconds', value)}
        onIterationsChange={(value) => handleCustomSettingChange('iterations', value)}
        onRequireManualStartChange={(value) => handleCustomSettingChange('requireManualStart', value)}
        soundEnabled={notificationSettings.sound}
        volume={notificationSettings.volume}
        onToggleSound={(enabled) => updateNotificationSettings({ ...notificationSettings, sound: enabled })}
        onVolumeChange={(vol) => updateNotificationSettings({ ...notificationSettings, volume: vol })}
        smoothProgress={smoothProgress}
        onToggleSmoothProgress={handleToggleSmoothProgress}
        disabled={isRunning}
        isRunning={isRunning}
        presets={presets}
        selectedPreset={selectedPreset}
        onSelectPreset={handlePresetSelect}
        showPresetForm={showPresetForm}
        onOpenPresetForm={() => setShowPresetForm(true)}
        onSavePreset={handleSavePreset}
        onCancelPresetForm={() => setShowPresetForm(false)}
        chains={chains}
        selectedChain={selectedChain}
        onSelectChain={(chain) => {
          setSelectedChain(chain);
          // start first preset of chain
          if (chain.presets.length > 0) {
            handlePresetSelect(chain.presets[0].preset);
          }
        }}
        showChainForm={showChainForm}
        onOpenChainForm={() => {
          setSelectedChain(null);
          setShowChainForm(true);
        }}
        onEditChain={handleEditChain}
        onSaveChain={handleSaveChain}
        onCancelChainForm={() => {
          setShowChainForm(false);
          setSelectedChain(null);
        }}
        onDeleteChain={handleDeleteChain}
        schedules={schedules}
        onSaveSchedule={handleSaveSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onToggleSchedule={handleToggleSchedule}
        colors={colors}
        onColorChange={setColors}
        notificationSettings={notificationSettings}
        onUpdateNotificationSettings={updateNotificationSettings}
        videoConfig={videoConfig}
        onToggleVideoEnabled={toggleVideoEnabled}
        onSelectVideo={selectVideo}
        onUpdateVideoConfig={updateVideoConfig}
        onAddCustomVideo={addCustomVideo}
        onRemoveCustomVideo={removeCustomVideo}
        onSetLocalFileVideo={setLocalFileVideo}
      />
    </div>
  );
}