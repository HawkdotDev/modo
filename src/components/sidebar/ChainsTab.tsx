import { PresetChainForm } from '../PresetChainForm';
import { PresetChainList } from '../PresetChainList';
import { useSettings } from '../../context/SettingsContext';

interface ChainsTabProps {
  onClose?: () => void;
}

export function ChainsTab({ onClose }: ChainsTabProps) {
  const {
    presets,
    chains,
    selectedChain,
    setSelectedChain,
    showChainForm,
    setShowChainForm,
    saveChain,
    editChain,
    deleteChain,
    selectPreset
  } = useSettings();

  if (showChainForm) {
    return (
      <PresetChainForm
        presets={presets}
        onSave={saveChain}
        onCancel={() => setShowChainForm(false)}
        initialValues={selectedChain}
      />
    );
  }

  return (
    <PresetChainList
      chains={chains}
      onSelectChain={(chain) => {
        setSelectedChain(chain);
        if (chain.presets.length > 0) {
          selectPreset(chain.presets[0].preset);
        }
      }}
      onCreateChain={() => {
        setSelectedChain(null);
        setShowChainForm(true);
      }}
      onEditChain={editChain}
      onDeleteChain={deleteChain}
      onClose={onClose}
    />
  );
}
