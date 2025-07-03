'use client';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
  className?: string;
}

export default function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'gray',
  size = 'md',
  spacing = 'md',
  label,
  labelPosition = 'center',
  className = '',
}: DividerProps) {
  const colorClasses = {
    gray: 'border-gray-200',
    blue: 'border-blue-200',
    green: 'border-green-200',
    red: 'border-red-200',
    yellow: 'border-yellow-200',
    purple: 'border-purple-200',
  };

  const sizeClasses = {
    sm: 'border-t',
    md: 'border-t-2',
    lg: 'border-t-4',
  };

  const spacingClasses = {
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-8',
  };

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const labelPositionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`
          inline-block h-full
          ${size === 'sm' ? 'border-l' : size === 'lg' ? 'border-l-4' : 'border-l-2'}
          ${variantClasses[variant]}
          ${colorClasses[color]}
          ${className}
        `}
      />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
        <div
          className={`
            flex-1
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${colorClasses[color]}
          `}
        />
        <span className={`px-3 text-sm font-medium text-gray-500 ${labelPositionClasses[labelPosition]}`}>
          {label}
        </span>
        <div
          className={`
            flex-1
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${colorClasses[color]}
          `}
        />
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${colorClasses[color]}
        ${spacingClasses[spacing]}
        ${className}
      `}
    />
  );
} 