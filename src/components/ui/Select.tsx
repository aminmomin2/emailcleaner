'use client'
import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  size = 'md',
  fullWidth = false,
  className = '',
  label,
  helperText,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const baseClasses = 'border rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6] cursor-pointer';
  
  const stateClasses = error 
    ? 'border-[var(--text-error)] focus-visible:ring-[var(--text-error)]' 
    : 'border-[var(--border)] focus:border-[var(--primary)]';
  
  const disabledClasses = disabled ? 'bg-[var(--gray-light)] cursor-not-allowed opacity-50' : 'bg-white';
  
  const widthClass = fullWidth ? 'w-full' : '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
          {label}
          {required && <span className="text-[var(--text-error)] ml-1">*</span>}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <button
          type="button"
          className={`${baseClasses} ${stateClasses} ${disabledClasses} ${sizeClasses[size]} ${widthClass} flex items-center justify-between`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedOption ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 ml-2 text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--border)] rounded-md shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-[var(--border)]">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--primary)]"
                autoFocus
              />
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full px-4 py-2 text-left hover:bg-[var(--gray-light)] transition-colors ${
                      option.value === value ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-main)]'
                    } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-[var(--text-secondary)]">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select; 