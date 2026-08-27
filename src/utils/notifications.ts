import { audioEngine, ChimeStyle } from './audioEngine';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export function playNotificationSound(type: 'work' | 'break' | 'session' | 'test' = 'test', volume: number = 0.7) {
  try {
    let savedStyle: ChimeStyle = 'zen';
    try {
      savedStyle = (localStorage.getItem('modo_chime_style') as ChimeStyle) || 'zen';
    } catch (e) {
      console.warn('Failed to retrieve chime style preference:', e);
    }

    audioEngine.playChime(savedStyle, type, volume);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

export function playSound(soundUrl: string, volume: number = 1) {
  if (soundUrl) {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.play().catch(() => {
      // Fallback to synthesized sound if file not found
      playNotificationSound('test', volume);
    });
  } else {
    playNotificationSound('test', volume);
  }
}