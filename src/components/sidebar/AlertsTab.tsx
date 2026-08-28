import { NotificationSettings } from '../NotificationSettings';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';

interface AlertsTabProps {
  onClose?: () => void;
}

export function AlertsTab({ onClose }: AlertsTabProps) {
  const { notificationSettings, updateNotificationSettings } = useSettings();
  const { colors } = useTheme();

  return (
    <NotificationSettings
      settings={notificationSettings}
      onUpdate={updateNotificationSettings}
      accentColor={colors.accentColor}
      onClose={onClose}
    />
  );
}
