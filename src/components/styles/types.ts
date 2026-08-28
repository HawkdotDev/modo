import { ComponentType, ReactNode } from 'react';
import { TimerMode } from '../../types/timer';

export interface ClockSceneProps {
  minutes: number;
  seconds: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
  themeColor: string;
  workColor?: string;
  breakColor?: string;
  accentColor?: string;
  children?: ReactNode;
  showGlow?: boolean;
  showRing?: boolean;
}

export interface ClockStyleDefinition {
  id: string;
  name: string;
  category: string;
  desc: string;
  tag?: string;
  component: ComponentType<ClockSceneProps>;
  isAvailable: boolean; // For future scene toggle
}
