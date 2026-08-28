import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { 
  TimerPreset, 
  PresetChain, 
  Schedule, 
  ClockStyle, 
  NotificationSettings,
  defaultPresets 
} from '../types/timer';
import { StorageService, CustomTimerSettings } from '../services/storageService';

interface SettingsContextValue {
  // Presets
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  selectPreset: (preset: TimerPreset) => void;
  savePreset: (newPreset: Omit<TimerPreset, 'id'>) => void;
  showPresetForm: boolean;
  setShowPresetForm: (show: boolean) => void;

  // Chains
  chains: PresetChain[];
  selectedChain: PresetChain | null;
  setSelectedChain: (chain: PresetChain | null) => void;
  saveChain: (chain: Omit<PresetChain, 'id'>) => void;
  editChain: (chain: PresetChain) => void;
  deleteChain: (chainId: string) => void;
  showChainForm: boolean;
  setShowChainForm: (show: boolean) => void;

  // Schedules
  schedules: Schedule[];
  saveSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  deleteSchedule: (scheduleId: string) => void;
  toggleSchedule: (scheduleId: string, enabled: boolean) => void;

  // Custom Mode
  isCustom: boolean;
  setIsCustom: (isCustom: boolean) => void;
  customSettings: CustomTimerSettings;
  updateCustomSetting: (key: keyof CustomTimerSettings, value: number | boolean) => void;

  // Active Timer Config (unified between Custom and Preset)
  activeSettings: {
    workMinutes: number;
    workSeconds: number;
    breakMinutes: number;
    breakSeconds: number;
    iterations: number;
    requireManualStart: boolean;
    smoothProgress: boolean;
  };

  // Appearance & Display Preferences
  clockStyle: ClockStyle;
  setClockStyle: (style: ClockStyle) => void;
  smoothProgress: boolean;
  setSmoothProgress: (enabled: boolean) => void;
  showGlow: boolean;
  setShowGlow: (enabled: boolean) => void;
  showRing: boolean;
  setShowRing: (enabled: boolean) => void;

  // Notifications
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: NotificationSettings) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Presets
  const [presets, setPresets] = useState<TimerPreset[]>(() => StorageService.getPresets());
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(() => {
    const savedId = StorageService.getSelectedPresetId();
    const found = presets.find(p => p.id === savedId);
    return found || presets[0] || defaultPresets[0];
  });
  const [showPresetForm, setShowPresetForm] = useState(false);

  // Chains
  const [chains, setChains] = useState<PresetChain[]>(() => StorageService.getChains());
  const [selectedChain, setSelectedChain] = useState<PresetChain | null>(null);
  const [showChainForm, setShowChainForm] = useState(false);

  // Schedules
  const [schedules, setSchedules] = useState<Schedule[]>(() => StorageService.getSchedules());

  // Custom Settings
  const [isCustom, setIsCustom] = useState(false);
  const [customSettings, setCustomSettings] = useState<CustomTimerSettings>(() => StorageService.getCustomSettings());

  // Display Preferences
  const [clockStyle, setClockStyleState] = useState<ClockStyle>(() => StorageService.getClockStyle());
  const [smoothProgress, setSmoothProgressState] = useState<boolean>(() => StorageService.getSmoothDial());
  const [showGlow, setShowGlowState] = useState<boolean>(() => StorageService.getShowGlow());
  const [showRing, setShowRingState] = useState<boolean>(() => StorageService.getShowRing());

  // Notifications
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => 
    StorageService.getNotificationSettings()
  );

  // Auto-sync state to StorageService
  useEffect(() => { StorageService.setPresets(presets); }, [presets]);
  useEffect(() => { StorageService.setChains(chains); }, [chains]);
  useEffect(() => { StorageService.setSchedules(schedules); }, [schedules]);
  useEffect(() => { StorageService.setCustomSettings(customSettings); }, [customSettings]);
  useEffect(() => { StorageService.setSelectedPresetId(selectedPreset.id); }, [selectedPreset]);
  useEffect(() => { StorageService.setClockStyle(clockStyle); }, [clockStyle]);
  useEffect(() => { StorageService.setSmoothDial(smoothProgress); }, [smoothProgress]);
  useEffect(() => { StorageService.setShowGlow(showGlow); }, [showGlow]);
  useEffect(() => { StorageService.setShowRing(showRing); }, [showRing]);
  useEffect(() => { StorageService.setNotificationSettings(notificationSettings); }, [notificationSettings]);

  const selectPreset = useCallback((preset: TimerPreset) => {
    setSelectedPreset(preset);
    setSelectedChain(null);
    setIsCustom(false);
  }, []);

  const savePreset = useCallback((newPreset: Omit<TimerPreset, 'id'>) => {
    const preset: TimerPreset = {
      ...newPreset,
      id: Date.now().toString(),
      workSeconds: 0,
      breakSeconds: 0
    };
    setPresets(prev => [...prev, preset]);
    setSelectedPreset(preset);
    setShowPresetForm(false);
    setIsCustom(false);
  }, []);

  const saveChain = useCallback((chain: Omit<PresetChain, 'id'>) => {
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
  }, [selectedChain]);

  const editChain = useCallback((chain: PresetChain) => {
    setSelectedChain(chain);
    setShowChainForm(true);
  }, []);

  const deleteChain = useCallback((chainId: string) => {
    setChains(prev => prev.filter(c => c.id !== chainId));
    setSelectedChain(prev => (prev?.id === chainId ? null : prev));
  }, []);

  const saveSchedule = useCallback((newSchedule: Omit<Schedule, 'id'>) => {
    const schedule: Schedule = {
      ...newSchedule,
      id: Date.now().toString()
    };
    setSchedules(prev => [...prev, schedule]);
  }, []);

  const deleteSchedule = useCallback((scheduleId: string) => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
  }, []);

  const toggleSchedule = useCallback((scheduleId: string, enabled: boolean) => {
    setSchedules(prev => prev.map(s => s.id === scheduleId ? { ...s, isEnabled: enabled } : s));
  }, []);

  const updateCustomSetting = useCallback((key: keyof CustomTimerSettings, value: number | boolean) => {
    setCustomSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setIsCustom(true);
  }, []);

  const setClockStyle = useCallback((style: ClockStyle) => setClockStyleState(style), []);
  const setSmoothProgress = useCallback((enabled: boolean) => setSmoothProgressState(enabled), []);
  const setShowGlow = useCallback((enabled: boolean) => setShowGlowState(enabled), []);
  const setShowRing = useCallback((enabled: boolean) => setShowRingState(enabled), []);

  const updateNotificationSettings = useCallback((settings: NotificationSettings) => {
    setNotificationSettings(settings);
  }, []);

  const baseConfig = isCustom ? customSettings : selectedPreset;
  const activeSettings = useMemo(() => ({
    workMinutes: baseConfig.workMinutes,
    workSeconds: baseConfig.workSeconds || 0,
    breakMinutes: baseConfig.breakMinutes,
    breakSeconds: baseConfig.breakSeconds || 0,
    iterations: baseConfig.iterations,
    requireManualStart: baseConfig.requireManualStart ?? false,
    smoothProgress
  }), [baseConfig, smoothProgress]);

  const value = useMemo(() => ({
    presets,
    selectedPreset,
    selectPreset,
    savePreset,
    showPresetForm,
    setShowPresetForm,
    chains,
    selectedChain,
    setSelectedChain,
    saveChain,
    editChain,
    deleteChain,
    showChainForm,
    setShowChainForm,
    schedules,
    saveSchedule,
    deleteSchedule,
    toggleSchedule,
    isCustom,
    setIsCustom,
    customSettings,
    updateCustomSetting,
    activeSettings,
    clockStyle,
    setClockStyle,
    smoothProgress,
    setSmoothProgress,
    showGlow,
    setShowGlow,
    showRing,
    setShowRing,
    notificationSettings,
    updateNotificationSettings
  }), [
    presets,
    selectedPreset,
    selectPreset,
    savePreset,
    showPresetForm,
    chains,
    selectedChain,
    saveChain,
    editChain,
    deleteChain,
    showChainForm,
    schedules,
    saveSchedule,
    deleteSchedule,
    toggleSchedule,
    isCustom,
    customSettings,
    updateCustomSetting,
    activeSettings,
    clockStyle,
    setClockStyle,
    smoothProgress,
    setSmoothProgress,
    showGlow,
    setShowGlow,
    showRing,
    setShowRing,
    notificationSettings,
    updateNotificationSettings
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
