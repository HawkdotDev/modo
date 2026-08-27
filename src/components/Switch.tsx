interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 shrink-0 items-center rounded-full
        transition-all duration-200 focus:outline-none
        ${checked ? 'bg-rose-500 shadow-glow-rose' : 'bg-white/[0.12] hover:bg-white/[0.18]'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      disabled={disabled}
    >
      <span
        className={`
          inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-all duration-200 shadow-md
          ${checked ? 'translate-x-4.5 bg-white' : 'translate-x-0.75 bg-neutral-300'}
        `}
      />
    </button>
  );
}