import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerPreset, TimerMode } from '../types/timer';

export type { TimerMode };

interface TimerSettings extends Partial<TimerPreset> {
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  smoothProgress?: boolean;
}

interface TimerCallbacks {
  onWorkComplete?: () => void;
  onBreakComplete?: () => void;
  onSessionComplete?: () => void;
}

export function useTimer(initialSettings: TimerSettings, callbacks?: TimerCallbacks) {
  const [settings, setSettings] = useState(initialSettings);
  const [isBreak, setIsBreak] = useState(false);
  
  const initialTotalSeconds = initialSettings.workMinutes * 60 + initialSettings.workSeconds;
  const [timeLeft, setTimeLeft] = useState(initialTotalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [waitingForManualStart, setWaitingForManualStart] = useState(false);

  // Milliseconds precision state ref
  const remainingMsRef = useRef(initialTotalSeconds * 1000);
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const prevSecondsRef = useRef<number>(initialTotalSeconds);

  const callbacksRef = useRef(callbacks);
  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  const smoothProgress = settings.smoothProgress ?? true;

  const totalSeconds = isBreak 
    ? settings.breakMinutes * 60 + settings.breakSeconds
    : settings.workMinutes * 60 + settings.workSeconds;
  const totalMs = totalSeconds * 1000;

  const totalMsRef = useRef(totalMs);
  totalMsRef.current = totalMs;
  const totalSecondsRef = useRef(totalSeconds);
  totalSecondsRef.current = totalSeconds;
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const isBreakRef = useRef(isBreak);
  isBreakRef.current = isBreak;
  const currentIterationRef = useRef(currentIteration);
  currentIterationRef.current = currentIteration;

  const prevSettingsRef = useRef(initialSettings);

  const reset = useCallback(() => {
    setIsBreak(false);
    const initialSec = settings.workMinutes * 60 + settings.workSeconds;
    setTimeLeft(initialSec);
    prevSecondsRef.current = initialSec;
    remainingMsRef.current = initialSec * 1000;
    setIsRunning(false);
    setProgress(1);
    setCurrentIteration(1);
    setIsComplete(false);
    setWaitingForManualStart(false);
    lastTimeRef.current = null;
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, [settings.workMinutes, settings.workSeconds]);

  const updateSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    prevSettingsRef.current = newSettings;
    if (!isRunning) {
      const newTotal = isBreak
        ? newSettings.breakMinutes * 60 + newSettings.breakSeconds
        : newSettings.workMinutes * 60 + newSettings.workSeconds;
      setTimeLeft(newTotal);
      prevSecondsRef.current = newTotal;
      remainingMsRef.current = newTotal * 1000;
      setProgress(1);
    }
  }, [isRunning, isBreak]);

  const toggleTimer = () => {
    if (waitingForManualStart) {
      setWaitingForManualStart(false);
    }
    setIsRunning((prev) => !prev);
  };

  // Only update timeLeft if initialSettings actually changed (preset / durations changed)
  useEffect(() => {
    const prev = prevSettingsRef.current;
    const hasChanged = 
      prev.workMinutes !== initialSettings.workMinutes ||
      prev.workSeconds !== initialSettings.workSeconds ||
      prev.breakMinutes !== initialSettings.breakMinutes ||
      prev.breakSeconds !== initialSettings.breakSeconds ||
      prev.iterations !== initialSettings.iterations ||
      prev.requireManualStart !== initialSettings.requireManualStart ||
      prev.smoothProgress !== initialSettings.smoothProgress;

    if (hasChanged) {
      prevSettingsRef.current = initialSettings;
      setSettings(initialSettings);
      if (!isRunning) {
        const newTotal = isBreak
          ? initialSettings.breakMinutes * 60 + initialSettings.breakSeconds
          : initialSettings.workMinutes * 60 + initialSettings.workSeconds;
        setTimeLeft(newTotal);
        prevSecondsRef.current = newTotal;
        remainingMsRef.current = newTotal * 1000;
        setProgress(1);
      }
    }
  }, [initialSettings, isRunning, isBreak]);

  // High-precision Continuous Animation Frame Loop (60 FPS)
  useEffect(() => {
    if (!isRunning || waitingForManualStart) {
      lastTimeRef.current = null;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      return;
    }

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      remainingMsRef.current = Math.max(0, remainingMsRef.current - delta);
      const currentRemaining = remainingMsRef.current;

      const currentSeconds = Math.ceil(currentRemaining / 1000);
      if (prevSecondsRef.current !== currentSeconds) {
        prevSecondsRef.current = currentSeconds;
        setTimeLeft(currentSeconds);
      }

      const curTotalMs = totalMsRef.current;
      const curTotalSec = totalSecondsRef.current;

      if (smoothProgress) {
        setProgress(curTotalMs > 0 ? currentRemaining / curTotalMs : 0);
      } else {
        setProgress(curTotalSec > 0 ? currentSeconds / curTotalSec : 0);
      }

      if (currentRemaining <= 0) {
        const curBreak = isBreakRef.current;
        const curIteration = currentIterationRef.current;
        const curSettings = settingsRef.current;

        if (curBreak) {
          callbacksRef.current?.onBreakComplete?.();
          setIsBreak(false);
          const nextSec = curSettings.workMinutes * 60 + curSettings.workSeconds;
          setTimeLeft(nextSec);
          prevSecondsRef.current = nextSec;
          remainingMsRef.current = nextSec * 1000;
          setProgress(1);
          setCurrentIteration((prev) => prev + 1);
          if (curSettings.requireManualStart) {
            setWaitingForManualStart(true);
            setIsRunning(false);
          }
        } else {
          if (curIteration < curSettings.iterations) {
            callbacksRef.current?.onWorkComplete?.();
            setIsBreak(true);
            const nextBreakSec = curSettings.breakMinutes * 60 + curSettings.breakSeconds;
            setTimeLeft(nextBreakSec);
            prevSecondsRef.current = nextBreakSec;
            remainingMsRef.current = nextBreakSec * 1000;
            setProgress(1);
            if (curSettings.requireManualStart) {
              setWaitingForManualStart(true);
              setIsRunning(false);
            }
          } else {
            callbacksRef.current?.onSessionComplete?.();
            setIsComplete(true);
            setIsRunning(false);
          }
        }
        lastTimeRef.current = null;
        return;
      }

      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [isRunning, waitingForManualStart, smoothProgress]);

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