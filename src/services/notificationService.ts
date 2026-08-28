import { audioEngine } from '../utils/audioEngine';
import { StorageService } from './storageService';

export const NotificationService = {
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  showNotification(title: string, options?: NotificationOptions): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  },

  playCompletionSound(type: 'work' | 'break' | 'session' | 'test' = 'test', volume: number = 0.7): void {
    try {
      const chimeStyle = StorageService.getChimeStyle();
      audioEngine.playChime(chimeStyle, type, volume);
    } catch (err) {
      console.warn('Audio completion sound playback error:', err);
    }
  },

  notifyWorkComplete(enabled: boolean, hasSound: boolean, volume: number): void {
    if (!enabled) return;
    this.showNotification('Work Session Complete!', { body: 'Time to take a well-deserved break.' });
    if (hasSound) {
      this.playCompletionSound('work', volume);
    }
  },

  notifyBreakComplete(enabled: boolean, hasSound: boolean, volume: number): void {
    if (!enabled) return;
    this.showNotification('Break Session Complete!', { body: 'Ready to refocus?' });
    if (hasSound) {
      this.playCompletionSound('break', volume);
    }
  },

  notifySessionComplete(enabled: boolean, hasSound: boolean, volume: number): void {
    if (!enabled) return;
    this.showNotification('Focus Session Finished!', { body: 'All Pomodoro rounds completed! Outstanding focus.' });
    if (hasSound) {
      this.playCompletionSound('session', volume);
    }
  }
};
