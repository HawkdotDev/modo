import { useState, useEffect } from 'react';
import { NotificationSettings as NotificationSettingsType } from '../types/timer';
import { Switch } from './Switch';
import { Bell, AlertCircle, Sparkles } from 'lucide-react';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onUpdate: (settings: NotificationSettingsType) => void;
  accentColor?: string;
  onClose?: () => void;
}

export function NotificationSettings({ settings, onUpdate, accentColor = '#f43f5e', onClose }: NotificationSettingsProps) {
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

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Desktop Notifications</h3>
          <p className="text-xs text-neutral-400">System banners when timer transitions</p>
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

      <div className="space-y-3">
        {/* Master Notification Toggle */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 hover:border-white/[0.1] transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08]"
                style={{ color: accentColor }}
              >
                <Bell size={16} />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Desktop Alerts</span>
                <span className="text-xs text-neutral-400">OS notifications on background tabs</span>
              </div>
            </div>
            <Switch
              checked={settings.enabled}
              onChange={handleToggleNotifications}
              activeColor={accentColor}
            />
          </div>
          
          {permissionDenied && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              <AlertCircle size={14} className="shrink-0" />
              <span>Notifications blocked by browser. Please allow notifications in site permissions.</span>
            </div>
          )}
        </div>

        {/* Granular Notification Triggers */}
        <div className={`p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 transition-all ${
          settings.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-1">
            <Sparkles size={12} style={{ color: accentColor }} />
            Notification Triggers
          </span>
          
          <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">Focus round completed</span>
              <span className="text-[10px] text-neutral-400">Alert when work session ends</span>
            </div>
            <Switch
              checked={settings.workComplete}
              onChange={(checked) => onUpdate({ ...settings, workComplete: checked })}
              disabled={!settings.enabled}
              activeColor={accentColor}
            />
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">Break interval completed</span>
              <span className="text-[10px] text-neutral-400">Alert when rest period ends</span>
            </div>
            <Switch
              checked={settings.breakComplete}
              onChange={(checked) => onUpdate({ ...settings, breakComplete: checked })}
              disabled={!settings.enabled}
              activeColor={accentColor}
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">All iterations completed</span>
              <span className="text-[10px] text-neutral-400">Alert when full session finishes</span>
            </div>
            <Switch
              checked={settings.sessionComplete}
              onChange={(checked) => onUpdate({ ...settings, sessionComplete: checked })}
              disabled={!settings.enabled}
              activeColor={accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}