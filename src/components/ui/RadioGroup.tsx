'use client';

import { useState } from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  name,
  size = 'md',
  layout = 'vertical',
  className = '',
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleChange = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const layoutClasses = {
    vertical: 'flex flex-col space-y-3',
    horizontal: 'flex flex-row space-x-6',
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-start cursor-pointer group
            ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={option.disabled}
            className="sr-only"
          />
          <div
            className={`
              relative flex-shrink-0 rounded-full border-2 transition-colors duration-200
              ${sizeClasses[size]}
              ${selectedValue === option.value
                ? 'border-blue-600 bg-blue-600'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
              ${option.disabled ? 'border-gray-200 bg-gray-100' : ''}
            `}
          >
            {selectedValue === option.value && (
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  ${size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-100' : 'scale-90'}
                `}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            )}
          </div>
          <div className="ml-3 flex-1">
            <div className={`font-medium text-gray-900 ${labelSizeClasses[size]}`}>
              {option.label}
            </div>
            {option.description && (
              <div className={`text-gray-500 mt-1 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
                {option.description}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
} 