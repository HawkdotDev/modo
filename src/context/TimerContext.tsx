import { createContext, useContext, useMemo, ReactNode, useCallback } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from './SettingsContext';
import { NotificationService } from '../services/notificationService';
import { useScheduler } from '../hooks/useScheduler';

export interface TimerState {
  timeLeft: number;
  progress: number;
  isBreak: boolean;
  isRunning: boolean;
  currentIteration: number;
  isComplete: boolean;
  waitingForManualStart: boolean;
}

export interface TimerActions {
  toggleTimer: () => void;
  toggle: () => void;
  reset: () => void;
  updateSettings: (settings: Parameters<ReturnType<typeof useTimer>['updateSettings']>[0]) => void;
}

interface TimerContextValue extends TimerState, TimerActions {}

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const { activeSettings, notificationSettings, schedules, presets, chains, selectPreset, setSelectedChain } = useSettings();

  const handleWorkComplete = useCallback(() => {
    NotificationService.notifyWorkComplete(
      notificationSettings.enabled && notificationSettings.workComplete,
      notificationSettings.sound,
      notificationSettings.volume
    );
  }, [notificationSettings]);

  const handleBreakComplete = useCallback(() => {
    NotificationService.notifyBreakComplete(
      notificationSettings.enabled && notificationSettings.breakComplete,
      notificationSettings.sound,
      notificationSettings.volume
    );
  }, [notificationSettings]);

  const handleSessionComplete = useCallback(() => {
    NotificationService.notifySessionComplete(
      notificationSettings.enabled && notificationSettings.sessionComplete,
      notificationSettings.sound,
      notificationSettings.volume
    );
  }, [notificationSettings]);

  const timer = useTimer(activeSettings, {
    onWorkComplete: handleWorkComplete,
    onBreakComplete: handleBreakComplete,
    onSessionComplete: handleSessionComplete
  });

  const handleScheduleStart = useCallback((presetId: string, chainId?: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      selectPreset(preset);
      timer.reset();
      timer.toggleTimer();
    }
    if (chainId) {
      const chain = chains.find(c => c.id === chainId);
      if (chain) {
        setSelectedChain(chain);
      }
    }
  }, [presets, chains, selectPreset, setSelectedChain, timer]);

  useScheduler(schedules, handleScheduleStart);

  const value = useMemo<TimerContextValue>(() => ({
    timeLeft: timer.timeLeft,
    progress: timer.progress,
    isBreak: timer.isBreak,
    isRunning: timer.isRunning,
    currentIteration: timer.currentIteration,
    isComplete: timer.isComplete,
    waitingForManualStart: timer.waitingForManualStart,
    toggleTimer: timer.toggleTimer,
    toggle: timer.toggleTimer,
    reset: timer.reset,
    updateSettings: timer.updateSettings
  }), [
    timer.timeLeft,
    timer.progress,
    timer.isBreak,
    timer.isRunning,
    timer.currentIteration,
    timer.isComplete,
    timer.waitingForManualStart,
    timer.toggleTimer,
    timer.reset,
    timer.updateSettings
  ]);

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimerContext(): TimerContextValue {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}
