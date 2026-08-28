import { ReactElement } from 'react';
import { ClockSceneProps } from './types';
import { CircularProgress } from '../CircularProgress';

export function MinimalScene({
  progress,
  mode,
  themeColor,
  accentColor,
  isRunning,
  showGlow = true,
  showRing = true,
  children
}: ClockSceneProps): ReactElement {
  const isBreak = mode === 'break';
  const activeColor = accentColor || themeColor;

  return (
    <CircularProgress
      progress={progress}
      isBreak={isBreak}
      workColor={themeColor}
      breakColor={activeColor}
      size={420}
      isRunning={isRunning}
      showGlow={showGlow}
      showRing={showRing}
    >
      {children}
    </CircularProgress>
  );
}

export default MinimalScene;
