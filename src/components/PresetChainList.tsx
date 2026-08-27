import { Play, Plus, Trash2, Edit3, Layers } from 'lucide-react';
import { PresetChain } from '../types/timer';
import { formatTime } from '../utils/timeFormat';

interface PresetChainListProps {
  chains: PresetChain[];
  onSelectChain: (chain: PresetChain) => void;
  onCreateChain: () => void;
  onEditChain: (chain: PresetChain) => void;
  onDeleteChain: (chainId: string) => void;
  onClose?: () => void;
}

export function PresetChainList({
  chains,
  onSelectChain,
  onCreateChain,
  onEditChain,
  onDeleteChain,
  onClose
}: PresetChainListProps) {
  const getTotalDuration = (chain: PresetChain) => {
    return chain.presets.reduce((total, { preset, delayMinutes, delaySeconds }) => {
      const presetDuration = (preset.workMinutes * 60 + preset.workSeconds) * preset.iterations +
                            (preset.breakMinutes * 60 + preset.breakSeconds) * (preset.iterations - 1);
      const delay = delayMinutes * 60 + delaySeconds;
      return total + presetDuration + delay;
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Preset Chains</h3>
          <p className="text-xs text-neutral-400">Sequential multi-stage timer workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateChain}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/[0.1] shadow-sm transition-all"
          >
            <Plus size={14} />
            New Chain
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
              title="Close panel"
            >
              <span className="sr-only">Close</span>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2.5">
        {chains.map((chain) => (
          <div
            key={chain.id}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-white">{chain.name}</h4>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 font-mono">
                    {chain.presets.length} stage{chain.presets.length === 1 ? '' : 's'}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-neutral-400">
                    Total {formatTime(getTotalDuration(chain))}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSelectChain(chain)}
                  className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white transition-all shadow-sm"
                  title="Run chain"
                >
                  <Play size={14} className="fill-current" />
                </button>
                <button
                  onClick={() => onEditChain(chain)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-all"
                  title="Edit chain"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => onDeleteChain(chain.id)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 transition-all"
                  title="Delete chain"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {chains.length === 0 && (
          <div className="text-center py-10 px-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] space-y-2">
            <Layers size={28} className="mx-auto text-neutral-600" />
            <p className="text-sm font-medium text-neutral-400">No preset chains created yet</p>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Combine multiple focus and break timers into automated sequential workflows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}