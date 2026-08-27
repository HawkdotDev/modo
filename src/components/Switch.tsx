interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
}

export function Switch({ checked, onChange, disabled = false, activeColor }: SwitchProps) {
  const customActive = activeColor || '#f43f5e';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-[2px]
        transition-all duration-300 ease-in-out focus:outline-none select-none
        ${checked ? '' : 'bg-white/[0.14] hover:bg-white/[0.22]'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
      `}
      style={checked ? {
        backgroundColor: customActive,
        boxShadow: `0 0 12px ${customActive}80`
      } : {}}
      disabled={disabled}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md
          transition-transform duration-300 ease-out
          ${checked ? 'translate-x-4' : 'translate-x-0'}
        `}
      />
    </button>
  );
}