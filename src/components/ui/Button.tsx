import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost' | 'transparent' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6] cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 active:bg-[var(--primary)]/80',
    secondary: 'bg-[var(--gray-light)] text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--gray-light)]/90 active:bg-[var(--gray-light)]/80',
    accent: 'bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/90 active:bg-[var(--accent)]/80',
    outline: 'bg-gray-light text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white active:bg-[var(--primary)]/80 active:text-white',
    transparent: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-transparent active:bg-transparent',
    ghost: 'bg-transparent text-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--primary)]/90 active:bg-[var(--accent)]/80 active:text-[var(--primary)]',
    danger: 'bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 active:bg-[var(--danger)]/80',
    neutral: 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--gray-light)]',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button; 