import { AudioSettings } from '../AudioSettings';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { useTimerContext } from '../../context/TimerContext';

interface AudioTabProps {
  onClose?: () => void;
}

export function AudioTab({ onClose }: AudioTabProps) {
  const { notificationSettings, updateNotificationSettings } = useSettings();
  const { colors } = useTheme();
  const { isRunning } = useTimerContext();

  return (
    <AudioSettings
      soundEnabled={notificationSettings.sound}
      volume={notificationSettings.volume}
      onToggleSound={(enabled) => updateNotificationSettings({ ...notificationSettings, sound: enabled })}
      onVolumeChange={(volume) => updateNotificationSettings({ ...notificationSettings, volume })}
      workCompleteChime={notificationSettings.workComplete}
      breakCompleteChime={notificationSettings.breakComplete}
      sessionCompleteChime={notificationSettings.sessionComplete}
      onToggleWorkCompleteChime={(val) => updateNotificationSettings({ ...notificationSettings, workComplete: val })}
      onToggleBreakCompleteChime={(val) => updateNotificationSettings({ ...notificationSettings, breakComplete: val })}
      onToggleSessionCompleteChime={(val) => updateNotificationSettings({ ...notificationSettings, sessionComplete: val })}
      accentColor={colors.accentColor}
      isRunning={isRunning}
      onClose={onClose}
    />
  );
}
