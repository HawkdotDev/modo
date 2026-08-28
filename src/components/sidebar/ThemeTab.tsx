import { ColorPicker } from '../ColorPicker';
import { useTheme } from '../../context/ThemeContext';

interface ThemeTabProps {
  onClose?: () => void;
}

export function ThemeTab({ onClose }: ThemeTabProps) {
  const { colors, isDark, setColors, toggleTheme } = useTheme();

  return (
    <ColorPicker
      colors={colors}
      onChange={setColors}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      onClose={onClose}
    />
  );
}
