import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  size = 'md',
  fullWidth = false,
  className = '',
  label,
  helperText,
  required = false,
}) => {
  const baseClasses = 'border rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6]';
  
  const stateClasses = error 
    ? 'border-[var(--text-error)] focus-visible:ring-[var(--text-error)]' 
    : 'border-[var(--border)] focus:border-[var(--primary)]';
  
  const disabledClasses = disabled ? 'bg-[var(--gray-light)] cursor-not-allowed opacity-50' : 'bg-white';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const inputClasses = [
    baseClasses,
    stateClasses,
    disabledClasses,
    sizeClasses[size],
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
          {label}
          {required && <span className="text-[var(--text-error)] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
      />
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input; 