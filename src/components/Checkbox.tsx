import React from 'react';

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className = '',
  required = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClasses = 'border rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6] cursor-pointer';
  
  const stateClasses = checked || indeterminate
    ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
    : 'bg-white border-[var(--border)] hover:border-[var(--primary)]';
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label className={`inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          required={required}
        />
        <div
          className={`${baseClasses} ${stateClasses} ${disabledClasses} ${sizeClasses[size]} flex items-center justify-center`}
          onClick={handleChange}
        >
          {(checked || indeterminate) && (
            <svg
              className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {indeterminate ? (
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              )}
            </svg>
          )}
        </div>
      </div>
      {label && (
        <span className={`ml-2 text-[var(--text-main)] ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}`}>
          {label}
          {required && <span className="text-[var(--text-error)] ml-1">*</span>}
        </span>
      )}
    </label>
  );
};

export default Checkbox; 