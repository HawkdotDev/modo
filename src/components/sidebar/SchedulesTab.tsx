import { ScheduleManager } from '../scheduling/ScheduleManager';
import { useSettings } from '../../context/SettingsContext';

interface SchedulesTabProps {
  onClose?: () => void;
}

export function SchedulesTab({ onClose }: SchedulesTabProps) {
  const {
    schedules,
    presets,
    chains,
    saveSchedule,
    deleteSchedule,
    toggleSchedule
  } = useSettings();

  return (
    <ScheduleManager
      schedules={schedules}
      presets={presets}
      chains={chains}
      onSave={saveSchedule}
      onDelete={deleteSchedule}
      onToggle={toggleSchedule}
      onClose={onClose}
    />
  );
}
