import { useState, useEffect } from 'react';
import { NotificationSettings as NotificationSettingsType } from '../types/timer';
import { Switch } from './Switch';
import { Bell, Volume2, Play, AlertCircle } from 'lucide-react';
import { playNotificationSound } from '../utils/notifications';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onUpdate: (settings: NotificationSettingsType) => void;
  onClose?: () => void;
}

export function NotificationSettings({ settings, onUpdate, onClose }: NotificationSettingsProps) {
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionDenied(Notification.permission === 'denied');
    }
  }, []);

  const handleToggleNotifications = async () => {
    if (!settings.enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPermissionDenied(false);
          onUpdate({ ...settings, enabled: true });
        } else {
          setPermissionDenied(true);
        }
      } else {
        console.warn('Notifications not supported in this browser');
      }
    } else {
      onUpdate({ ...settings, enabled: false });
    }
  };

  const handleTestSound = () => {
    playNotificationSound('test', settings.volume);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Notifications & Sound</h3>
          <p className="text-xs text-neutral-400">Desktop alerts and audible cues</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Master Notification Toggle */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Bell size={18} />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Desktop Notifications</span>
                <span className="text-xs text-neutral-400">Alerts when session transitions</span>
              </div>
            </div>
            <Switch checked={settings.enabled} onChange={handleToggleNotifications} />
          </div>
          
          {permissionDenied && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              <AlertCircle size={14} className="shrink-0" />
              <span>Notifications blocked by browser. Please enable permissions in address bar.</span>
            </div>
          )}
        </div>

        {/* Sound Controls */}
        <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4 transition-opacity ${
          settings.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Volume2 size={18} />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Audio Chimes</span>
                <span className="text-xs text-neutral-400">Synthesized acoustic bell cues</span>
              </div>
            </div>
            <Switch
              checked={settings.sound}
              onChange={(checked) => onUpdate({ ...settings, sound: checked })}
              disabled={!settings.enabled}
            />
          </div>

          {settings.sound && (
            <div className="pt-2 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-300">Volume</span>
                <button
                  onClick={handleTestSound}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-neutral-200 transition-all"
                  title="Test sound chime"
                  disabled={!settings.enabled}
                >
                  <Play size={12} />
                  Test Chime
                </button>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                onChange={(e) => onUpdate({ ...settings, volume: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-rose-500"
                disabled={!settings.enabled}
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>Mute</span>
                <span>{Math.round(settings.volume * 100)}%</span>
                <span>Max</span>
              </div>
            </div>
          )}
        </div>

        {/* Granular Triggers */}
        <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 transition-opacity ${
          settings.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">Trigger Triggers</span>
          
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-neutral-300">Focus round completed</span>
            <Switch
              checked={settings.workComplete}
              onChange={(checked) => onUpdate({ ...settings, workComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-neutral-300">Break interval completed</span>
            <Switch
              checked={settings.breakComplete}
              onChange={(checked) => onUpdate({ ...settings, breakComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-neutral-300">All iterations completed</span>
            <Switch
              checked={settings.sessionComplete}
              onChange={(checked) => onUpdate({ ...settings, sessionComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}