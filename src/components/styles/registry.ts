import { ClockStyleDefinition } from './types';
import { GiantScene } from './GiantScene';
import { MinimalScene } from './MinimalScene';

export const CLOCK_STYLES_REGISTRY: Record<string, ClockStyleDefinition> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal Ring',
    category: 'Modern Glass',
    desc: '420px glowing circular dial with millisecond progress',
    tag: 'Default',
    component: MinimalScene,
    isAvailable: true
  },
  giant: {
    id: 'giant',
    name: 'Giant Focus Digits',
    category: 'Ultra-Minimal',
    desc: 'Huge edge-to-edge typography for distraction-free flow',
    component: GiantScene,
    isAvailable: true
  }
};

export function getClockStyleDefinition(styleId: string): ClockStyleDefinition {
  return CLOCK_STYLES_REGISTRY[styleId] || CLOCK_STYLES_REGISTRY.minimal;
}

export function getAvailableClockStyles(): ClockStyleDefinition[] {
  return Object.values(CLOCK_STYLES_REGISTRY).filter(s => s.isAvailable);
}
