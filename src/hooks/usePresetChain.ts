import { useState, useEffect, useCallback } from 'react';
import { PresetChain } from '../types/timer';

export function usePresetChain(chain: PresetChain) {
  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
  const [delayTimeLeft, setDelayTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentChainedPreset = chain.presets[currentPresetIndex];

  const startChain = useCallback(() => {
    if (currentChainedPreset) {
      setDelayTimeLeft(
        currentChainedPreset.delayMinutes * 60 + 
        currentChainedPreset.delaySeconds
      );
      setIsRunning(true);
    }
  }, [currentChainedPreset]);

  const nextPreset = useCallback(() => {
    if (currentPresetIndex < chain.presets.length - 1) {
      setCurrentPresetIndex(prev => prev + 1);
      startChain();
    } else {
      setIsComplete(true);
      setIsRunning(false);
    }
  }, [chain.presets.length, currentPresetIndex, startChain]);

  const reset = useCallback(() => {
    setCurrentPresetIndex(0);
    setDelayTimeLeft(0);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && delayTimeLeft > 0) {
      interval = setInterval(() => {
        setDelayTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, delayTimeLeft]);

  return {
    currentPreset: currentChainedPreset?.preset,
    delayTimeLeft,
    isRunning,
    isComplete,
    isDelaying: delayTimeLeft > 0,
    startChain,
    nextPreset,
    reset
  };
}