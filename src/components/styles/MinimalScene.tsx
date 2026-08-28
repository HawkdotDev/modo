import { ReactElement } from 'react';
import { ClockSceneProps } from './types';
import { CircularProgress } from '../CircularProgress';

export function MinimalScene({
  progress,
  mode,
  themeColor,
  workColor,
  breakColor,
  isRunning,
  showGlow = true,
  showRing = true,
  children
}: ClockSceneProps): ReactElement {
  const isBreak = mode === 'break';
  const effectiveWorkColor = workColor || themeColor;
  const effectiveBreakColor = breakColor || '#10b981';

  return (
    <CircularProgress
      progress={progress}
      isBreak={isBreak}
      workColor={effectiveWorkColor}
      breakColor={effectiveBreakColor}
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
