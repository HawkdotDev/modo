import { memo } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
}

export const Switch = memo(function Switch({ checked, onChange, disabled = false, activeColor }: SwitchProps) {
  const customActive = activeColor || '#f43f5e';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-[2px]
        transition-all duration-300 ease-out focus:outline-none select-none
        ${checked ? '' : 'bg-white/[0.14] hover:bg-white/[0.22]'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-90'}
      `}
      style={checked ? {
        backgroundColor: customActive,
        boxShadow: `0 0 16px ${customActive}90`
      } : {}}
      disabled={disabled}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${checked ? 'translate-x-4 shadow-[0_2px_8px_rgba(0,0,0,0.35)]' : 'translate-x-0'}
        `}
      />
    </button>
  );
});