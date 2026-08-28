import { 
  TimerPreset, 
  PresetChain, 
  Schedule, 
  ClockStyle, 
  ThemeColors, 
  NotificationSettings,
  defaultPresets, 
  darkTheme, 
  defaultNotificationSettings 
} from '../types/timer';
import { VideoBackgroundConfig } from '../types/video';
import { defaultVideoConfig, videoPresets } from '../data/videoPresets';
import { ChimeStyle } from '../utils/audioEngine';

export interface CustomTimerSettings {
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart: boolean;
}

const DEFAULT_CUSTOM_SETTINGS: CustomTimerSettings = {
  workMinutes: 25,
  workSeconds: 0,
  breakMinutes: 5,
  breakSeconds: 0,
  iterations: 4,
  requireManualStart: false
};

const STORAGE_KEYS = {
  PRESETS: 'modo_presets',
  CHAINS: 'modo_chains',
  SCHEDULES: 'modo_schedules',
  CUSTOM_SETTINGS: 'modo_custom_settings',
  SELECTED_PRESET_ID: 'modo_selected_preset_id',
  CLOCK_STYLE: 'modo_clock_style',
  SMOOTH_DIAL: 'modo_smooth_dial',
  SHOW_GLOW: 'modo_show_glow',
  SHOW_RING: 'modo_show_ring',
  THEME_COLORS: 'modo_theme_colors',
  IS_DARK: 'modo_is_dark',
  NOTIFICATION_SETTINGS: 'modo_notification_settings',
  VIDEO_BG_CONFIG: 'modo_video_bg_config',
  CHIME_STYLE: 'modo_chime_style',
  AUTOPAUSE_SOUNDSCAPE: 'modo_autopause_soundscape',
  ACTIVE_SIDEBAR_TAB: 'modo_active_sidebar_tab',
} as const;

function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save key "${key}" to localStorage:`, e);
  }
}

function getRawItem(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function setRawItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Failed to save raw key "${key}" to localStorage:`, e);
  }
}

export const StorageService = {
  // Presets
  getPresets(): TimerPreset[] {
    return getItem<TimerPreset[]>(STORAGE_KEYS.PRESETS, defaultPresets);
  },
  setPresets(presets: TimerPreset[]): void {
    setItem(STORAGE_KEYS.PRESETS, presets);
  },

  // Chains
  getChains(): PresetChain[] {
    return getItem<PresetChain[]>(STORAGE_KEYS.CHAINS, []);
  },
  setChains(chains: PresetChain[]): void {
    setItem(STORAGE_KEYS.CHAINS, chains);
  },

  // Schedules
  getSchedules(): Schedule[] {
    return getItem<Schedule[]>(STORAGE_KEYS.SCHEDULES, []);
  },
  setSchedules(schedules: Schedule[]): void {
    setItem(STORAGE_KEYS.SCHEDULES, schedules);
  },

  // Custom Settings
  getCustomSettings(): CustomTimerSettings {
    return getItem<CustomTimerSettings>(STORAGE_KEYS.CUSTOM_SETTINGS, DEFAULT_CUSTOM_SETTINGS);
  },
  setCustomSettings(settings: CustomTimerSettings): void {
    setItem(STORAGE_KEYS.CUSTOM_SETTINGS, settings);
  },

  // Selected Preset ID
  getSelectedPresetId(): string | null {
    return getRawItem(STORAGE_KEYS.SELECTED_PRESET_ID, defaultPresets[0].id);
  },
  setSelectedPresetId(id: string): void {
    setRawItem(STORAGE_KEYS.SELECTED_PRESET_ID, id);
  },

  // Clock Style
  getClockStyle(): ClockStyle {
    const style = getRawItem(STORAGE_KEYS.CLOCK_STYLE, 'minimal') as ClockStyle;
    return ['minimal', 'giant'].includes(style) ? style : 'minimal';
  },
  setClockStyle(style: ClockStyle): void {
    setRawItem(STORAGE_KEYS.CLOCK_STYLE, style);
  },

  // Display toggles
  getSmoothDial(): boolean {
    const raw = getRawItem(STORAGE_KEYS.SMOOTH_DIAL, 'true');
    return raw === 'true';
  },
  setSmoothDial(enabled: boolean): void {
    setRawItem(STORAGE_KEYS.SMOOTH_DIAL, String(enabled));
  },

  getShowGlow(): boolean {
    const raw = getRawItem(STORAGE_KEYS.SHOW_GLOW, 'true');
    return raw === 'true';
  },
  setShowGlow(enabled: boolean): void {
    setRawItem(STORAGE_KEYS.SHOW_GLOW, String(enabled));
  },

  getShowRing(): boolean {
    const raw = getRawItem(STORAGE_KEYS.SHOW_RING, 'true');
    return raw === 'true';
  },
  setShowRing(enabled: boolean): void {
    setRawItem(STORAGE_KEYS.SHOW_RING, String(enabled));
  },

  // Theme
  getThemeColors(): ThemeColors {
    return getItem<ThemeColors>(STORAGE_KEYS.THEME_COLORS, darkTheme);
  },
  setThemeColors(colors: ThemeColors): void {
    setItem(STORAGE_KEYS.THEME_COLORS, colors);
  },

  getIsDark(): boolean {
    const raw = getRawItem(STORAGE_KEYS.IS_DARK, 'true');
    return raw === 'true';
  },
  setIsDark(isDark: boolean): void {
    setRawItem(STORAGE_KEYS.IS_DARK, String(isDark));
  },

  // Notifications
  getNotificationSettings(): NotificationSettings {
    return getItem<NotificationSettings>(STORAGE_KEYS.NOTIFICATION_SETTINGS, defaultNotificationSettings);
  },
  setNotificationSettings(settings: NotificationSettings): void {
    setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, settings);
  },

  // Video Background Config
  getVideoBackgroundConfig(): VideoBackgroundConfig {
    const parsed = getItem<Partial<VideoBackgroundConfig> | null>(STORAGE_KEYS.VIDEO_BG_CONFIG, null);
    if (!parsed) return defaultVideoConfig;
    return {
      ...defaultVideoConfig,
      ...parsed,
      selectedVideo: parsed.selectedVideo || videoPresets[0],
      customVideos: parsed.customVideos || []
    };
  },
  setVideoBackgroundConfig(config: VideoBackgroundConfig): void {
    const cleanConfig = {
      ...config,
      selectedVideo: config.selectedVideo?.url?.startsWith('blob:')
        ? videoPresets[0]
        : config.selectedVideo,
      customVideos: config.customVideos.filter(v => !v.url?.startsWith('blob:'))
    };
    setItem(STORAGE_KEYS.VIDEO_BG_CONFIG, cleanConfig);
  },

  // Audio / Chimes
  getChimeStyle(): ChimeStyle {
    return (getRawItem(STORAGE_KEYS.CHIME_STYLE, 'zen') as ChimeStyle) || 'zen';
  },
  setChimeStyle(style: ChimeStyle): void {
    setRawItem(STORAGE_KEYS.CHIME_STYLE, style);
  },

  getAutoPauseSoundscape(): boolean {
    const raw = getRawItem(STORAGE_KEYS.AUTOPAUSE_SOUNDSCAPE, 'true');
    return raw === 'true';
  },
  setAutoPauseSoundscape(enabled: boolean): void {
    setRawItem(STORAGE_KEYS.AUTOPAUSE_SOUNDSCAPE, String(enabled));
  },

  // Sidebar State (open/close & active tab)
  getActiveSidebarTab<T extends string>(): T | null {
    const raw = getRawItem(STORAGE_KEYS.ACTIVE_SIDEBAR_TAB, 'quick');
    if (raw === 'closed' || raw === 'null' || !raw) return null;
    return raw as T;
  },
  setActiveSidebarTab(tab: string | null): void {
    setRawItem(STORAGE_KEYS.ACTIVE_SIDEBAR_TAB, tab ? tab : 'closed');
  }
};
