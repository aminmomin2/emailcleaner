'use client';

import { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = '',
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  };

  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const thumbTranslateClasses = {
    sm: isChecked ? 'translate-x-4' : 'translate-x-0.5',
    md: isChecked ? 'translate-x-5' : 'translate-x-0.5',
    lg: isChecked ? 'translate-x-7' : 'translate-x-0.5',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${sizeClasses[size]}
          ${isChecked 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-200 hover:bg-gray-300'
          }
          ${disabled && 'opacity-50 cursor-not-allowed'}
        `}
      >
        <span
          className={`
            inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
            ${thumbSizeClasses[size]}
            ${thumbTranslateClasses[size]}
          `}
        />
      </button>
      {label && (
        <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </div>
  );
} 