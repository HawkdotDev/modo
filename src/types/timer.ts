import { z } from 'zod';

export interface TimerPreset {
  id: string;
  name: string;
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  isDefault?: boolean;
}

export interface ChainedPreset {
  preset: TimerPreset;
  delayMinutes: number;
  delaySeconds: number;
}

export interface PresetChain {
  id: string;
  name: string;
  presets: ChainedPreset[];
}

export interface ThemeColors {
  background: string;
  workColor: string;
  breakColor: string;
  text: string;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  volume: number;
  workComplete: boolean;
  breakComplete: boolean;
  sessionComplete: boolean;
}

export const RecurrenceType = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
} as const;

export type RecurrenceType = typeof RecurrenceType[keyof typeof RecurrenceType];

export interface Schedule {
  id: string;
  name: string;
  presetId: string;
  chainId?: string;
  startTime: string; // HH:mm format
  days?: number[]; // 0-6 for weekly, 1-31 for monthly
  recurrence: RecurrenceType;
  isEnabled: boolean;
}

export const scheduleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  presetId: z.string(),
  chainId: z.string().optional(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  days: z.array(z.number()).optional(),
  recurrence: z.enum([
    RecurrenceType.NONE,
    RecurrenceType.DAILY,
    RecurrenceType.WEEKLY,
    RecurrenceType.MONTHLY
  ]),
  isEnabled: z.boolean()
});

export const defaultPresets: TimerPreset[] = [
  {
    id: 'classic',
    name: 'Classic Pomodoro',
    workMinutes: 25,
    breakMinutes: 5,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 4,
    requireManualStart: false,
    isDefault: true
  },
  {
    id: 'short',
    name: 'Short Sessions',
    workMinutes: 15,
    breakMinutes: 3,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 6,
    requireManualStart: false
  },
  {
    id: 'long',
    name: 'Long Focus',
    workMinutes: 45,
    breakMinutes: 15,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 2,
    requireManualStart: false
  }
];

export const defaultNotificationSettings: NotificationSettings = {
  enabled: false,
  sound: true,
  volume: 0.7,
  workComplete: true,
  breakComplete: true,
  sessionComplete: true
};

export const lightTheme: ThemeColors = {
  background: '#f8fafc',
  workColor: '#f43f5e',
  breakColor: '#10b981',
  text: '#0f172a'
};

export const darkTheme: ThemeColors = {
  background: '#000000',
  workColor: '#f43f5e',
  breakColor: '#10b981',
  text: '#ffffff'
};