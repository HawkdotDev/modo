import { StyleSelector } from '../StyleSelector';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';

interface StylesTabProps {
  onClose?: () => void;
}

export function StylesTab({ onClose }: StylesTabProps) {
  const { clockStyle, setClockStyle } = useSettings();
  const { colors } = useTheme();

  return (
    <StyleSelector
      currentStyle={clockStyle}
      onSelectStyle={setClockStyle}
      accentColor={colors.accentColor}
      onClose={onClose}
    />
  );
}
