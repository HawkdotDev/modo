interface TimeInputProps {
  label: string;
  minutes: number;
  seconds: number;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
  disabled?: boolean;
}

export function TimeInput({
  label,
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
  disabled = false
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-1 items-center">
      {label && <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">{label}</label>}
      <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="120"
            value={minutes}
            onChange={(e) => onMinutesChange(Math.max(0, Math.min(120, parseInt(e.target.value) || 0)))}
            disabled={disabled}
            className="w-12 text-center py-1 bg-black/40 border border-white/[0.08] rounded-lg text-white font-mono text-sm font-semibold focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 disabled:opacity-40 transition-all"
            title="Minutes"
          />
        </div>
        <span className="text-neutral-500 font-mono text-sm font-bold">:</span>
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => onSecondsChange(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            disabled={disabled}
            className="w-12 text-center py-1 bg-black/40 border border-white/[0.08] rounded-lg text-white font-mono text-sm font-semibold focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 disabled:opacity-40 transition-all"
            title="Seconds"
          />
        </div>
      </div>
    </div>
  );
}