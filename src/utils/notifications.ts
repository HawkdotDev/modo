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
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = type === 'work' 
      ? [523.25, 659.25, 783.99] // C5, E5, G5
      : type === 'break' 
      ? [783.99, 659.25, 523.25] // G5, E5, C5
      : [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (session complete)

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.15);
      gain.gain.linearRampToValueAtTime(Math.max(0.01, volume * 0.3), ctx.currentTime + index * 0.15 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.15 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + index * 0.15 + 0.35);
    });
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