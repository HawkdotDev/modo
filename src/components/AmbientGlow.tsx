import { memo } from 'react';
import { useTimerContext } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

interface AmbientGlowProps {
  isVideoEnabled?: boolean;
  isShifted?: boolean;
}

export const AmbientGlow = memo(function AmbientGlow({
  isVideoEnabled = false,
  isShifted = false
}: AmbientGlowProps) {
  const { isBreak, isRunning } = useTimerContext();
  const { colors } = useTheme();

  const activeColor = isBreak ? colors.breakColor : colors.workColor;
  const secondaryColor = isBreak ? colors.workColor : colors.breakColor;

  return (
    <div className={`ambient-glow-wrapper ${isShifted ? 'shifted' : ''}`}>
      <div 
        className="ambient-glow-main" 
        style={{ 
          backgroundColor: activeColor,
          opacity: isVideoEnabled ? (isRunning ? 0.16 : 0.08) : (isRunning ? 0.28 : 0.14)
        }} 
      />
      <div 
        className="ambient-glow-secondary" 
        style={{ 
          backgroundColor: secondaryColor,
          opacity: isVideoEnabled ? (isRunning ? 0.12 : 0.05) : (isRunning ? 0.20 : 0.08)
        }} 
      />
    </div>
  );
});
