import { VideoSettings } from '../VideoSettings';
import { useVideoBackground } from '../../hooks/useVideoBackground';
import { useTheme } from '../../context/ThemeContext';
import { useTimerContext } from '../../context/TimerContext';

interface VideosTabProps {
  onClose?: () => void;
}

export function VideosTab({ onClose }: VideosTabProps) {
  const {
    config,
    updateConfig,
    toggleEnabled,
    selectVideo,
    addCustomVideo,
    removeCustomVideo,
    setLocalFileVideo
  } = useVideoBackground();

  const { colors } = useTheme();
  const { isRunning } = useTimerContext();

  return (
    <VideoSettings
      config={config}
      onToggleEnabled={toggleEnabled}
      onSelectVideo={selectVideo}
      onUpdateConfig={updateConfig}
      onAddCustomVideo={addCustomVideo}
      onRemoveCustomVideo={removeCustomVideo}
      onSetLocalFileVideo={setLocalFileVideo}
      accentColor={colors.accentColor}
      isRunning={isRunning}
      onClose={onClose}
    />
  );
}
