import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-[var(--gray-light)] text-[var(--text-secondary)]',
    primary: 'bg-[var(--primary)] text-white',
    accent: 'bg-[var(--accent)] text-[var(--primary)]',
    success: 'bg-[var(--text-success)] text-white',
    warning: 'bg-[var(--warning)] text-white',
    danger: 'bg-[var(--danger)] text-white',
    outline: 'bg-transparent text-[var(--primary)] border border-[var(--primary)]',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
};

export default Badge; 