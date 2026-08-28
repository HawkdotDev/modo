import { PresetForm } from '../PresetForm';
import { PresetSelector } from '../PresetSelector';
import { useSettings } from '../../context/SettingsContext';

interface PresetsTabProps {
  onClose?: () => void;
}

export function PresetsTab({ onClose }: PresetsTabProps) {
  const {
    presets,
    selectedPreset,
    selectPreset,
    showPresetForm,
    setShowPresetForm,
    savePreset
  } = useSettings();

  if (showPresetForm) {
    return (
      <PresetForm
        onSave={savePreset}
        onCancel={() => setShowPresetForm(false)}
        existingPresets={presets}
      />
    );
  }

  return (
    <PresetSelector
      presets={presets}
      selectedPreset={selectedPreset}
      onSelectPreset={selectPreset}
      onOpenPresetForm={() => setShowPresetForm(true)}
      onClose={onClose}
    />
  );
}
