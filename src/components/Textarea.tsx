'use client';

import { forwardRef, useState } from 'react';

interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    value = '',
    onChange,
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    rows = 4,
    maxLength,
    size = 'md',
    variant = 'outline',
    className = '',
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-4 py-4 text-lg',
    };

    const variantClasses = {
      outline: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-50',
    };

    const stateClasses = {
      default: variant === 'outline' ? 'border-gray-300' : 'bg-gray-50',
      focused: variant === 'outline' ? 'border-blue-500 ring-1 ring-blue-500' : 'bg-white border border-blue-500 ring-1 ring-blue-500',
      error: variant === 'outline' ? 'border-red-500 ring-1 ring-red-500' : 'bg-red-50 border border-red-500 ring-1 ring-red-500',
      disabled: 'opacity-50 cursor-not-allowed bg-gray-100',
    };

    const getStateClass = () => {
      if (disabled) return stateClasses.disabled;
      if (error) return stateClasses.error;
      if (isFocused) return stateClasses.focused;
      return stateClasses.default;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            className={`
              w-full rounded-lg transition-all duration-200 resize-none
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              ${getStateClass()}
              focus:outline-none
              ${disabled ? 'cursor-not-allowed' : 'cursor-text'}
            `}
          />
          {maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {value.length}/{maxLength}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea; 