import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerPreset } from '../types/timer';

interface TimerSettings extends Partial<TimerPreset> {
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
}

interface TimerCallbacks {
  onWorkComplete?: () => void;
  onBreakComplete?: () => void;
  onSessionComplete?: () => void;
}

export function useTimer(initialSettings: TimerSettings, callbacks?: TimerCallbacks) {
  const [settings, setSettings] = useState(initialSettings);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    initialSettings.workMinutes * 60 + initialSettings.workSeconds
  );
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [waitingForManualStart, setWaitingForManualStart] = useState(false);

  const callbacksRef = useRef(callbacks);
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  const totalSeconds = isBreak 
    ? settings.breakMinutes * 60 + settings.breakSeconds
    : settings.workMinutes * 60 + settings.workSeconds;

  const prevSettingsRef = useRef(initialSettings);

  const reset = useCallback(() => {
    setIsBreak(false);
    setTimeLeft(settings.workMinutes * 60 + settings.workSeconds);
    setIsRunning(false);
    setProgress(1);
    setCurrentIteration(1);
    setIsComplete(false);
    setWaitingForManualStart(false);
  }, [settings.workMinutes, settings.workSeconds]);

  const updateSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    prevSettingsRef.current = newSettings;
    if (!isRunning) {
      const newTotal = isBreak
        ? newSettings.breakMinutes * 60 + newSettings.breakSeconds
        : newSettings.workMinutes * 60 + newSettings.workSeconds;
      setTimeLeft(newTotal);
      setProgress(1);
    }
  }, [isRunning, isBreak]);

  const toggleTimer = () => {
    if (waitingForManualStart) {
      setWaitingForManualStart(false);
    }
    setIsRunning((prev) => !prev);
  };

  // Only update timeLeft if initialSettings actually changed, NOT on isRunning toggle (pause/play)
  useEffect(() => {
    const prev = prevSettingsRef.current;
    const hasChanged = 
      prev.workMinutes !== initialSettings.workMinutes ||
      prev.workSeconds !== initialSettings.workSeconds ||
      prev.breakMinutes !== initialSettings.breakMinutes ||
      prev.breakSeconds !== initialSettings.breakSeconds ||
      prev.iterations !== initialSettings.iterations ||
      prev.requireManualStart !== initialSettings.requireManualStart;

    if (hasChanged) {
      prevSettingsRef.current = initialSettings;
      setSettings(initialSettings);
      if (!isRunning) {
        const newTotal = isBreak
          ? initialSettings.breakMinutes * 60 + initialSettings.breakSeconds
          : initialSettings.workMinutes * 60 + initialSettings.workSeconds;
        setTimeLeft(newTotal);
        setProgress(1);
      }
    }
  }, [initialSettings, isRunning, isBreak]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0 && !waitingForManualStart) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(totalSeconds > 0 ? newTime / totalSeconds : 0);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      if (isBreak) {
        // After break, start next work session
        callbacksRef.current?.onBreakComplete?.();
        setIsBreak(false);
        setTimeLeft(settings.workMinutes * 60 + settings.workSeconds);
        setProgress(1);
        setCurrentIteration(prev => prev + 1);
        if (settings.requireManualStart) {
          setWaitingForManualStart(true);
          setIsRunning(false);
        }
      } else {
        // After work session
        if (currentIteration < settings.iterations) {
          // If not the last iteration, start break
          callbacksRef.current?.onWorkComplete?.();
          setIsBreak(true);
          setTimeLeft(settings.breakMinutes * 60 + settings.breakSeconds);
          setProgress(1);
          if (settings.requireManualStart) {
            setWaitingForManualStart(true);
            setIsRunning(false);
          }
        } else {
          // If last iteration, complete the session
          callbacksRef.current?.onSessionComplete?.();
          setIsComplete(true);
          setIsRunning(false);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, settings, currentIteration, totalSeconds, waitingForManualStart]);

  return {
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
  };
}