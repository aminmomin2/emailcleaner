'use client';

interface TagProps {
  children: React.ReactNode;
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Tag({
  children,
  color = 'gray',
  size = 'md',
  variant = 'soft',
  closable = false,
  onClose,
  className = '',
}: TagProps) {
  const colorClasses = {
    gray: {
      solid: 'bg-gray-500 text-white',
      outline: 'border border-gray-300 text-gray-700 bg-white',
      soft: 'bg-gray-100 text-gray-800',
    },
    blue: {
      solid: 'bg-blue-500 text-white',
      outline: 'border border-blue-300 text-blue-700 bg-white',
      soft: 'bg-blue-100 text-blue-800',
    },
    green: {
      solid: 'bg-green-500 text-white',
      outline: 'border border-green-300 text-green-700 bg-white',
      soft: 'bg-green-100 text-green-800',
    },
    red: {
      solid: 'bg-red-500 text-white',
      outline: 'border border-red-300 text-red-700 bg-white',
      soft: 'bg-red-100 text-red-800',
    },
    yellow: {
      solid: 'bg-yellow-500 text-white',
      outline: 'border border-yellow-300 text-yellow-700 bg-white',
      soft: 'bg-yellow-100 text-yellow-800',
    },
    purple: {
      solid: 'bg-purple-500 text-white',
      outline: 'border border-purple-300 text-purple-700 bg-white',
      soft: 'bg-purple-100 text-purple-800',
    },
    pink: {
      solid: 'bg-pink-500 text-white',
      outline: 'border border-pink-300 text-pink-700 bg-white',
      soft: 'bg-pink-100 text-pink-800',
    },
    indigo: {
      solid: 'bg-indigo-500 text-white',
      outline: 'border border-indigo-300 text-indigo-700 bg-white',
      soft: 'bg-indigo-100 text-indigo-800',
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const closeButtonSizeClasses = {
    sm: 'w-3 h-3 ml-1',
    md: 'w-4 h-4 ml-1.5',
    lg: 'w-5 h-5 ml-2',
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${sizeClasses[size]}
        ${colorClasses[color][variant]}
        ${className}
      `}
    >
      {children}
      {closable && (
        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 rounded-full hover:bg-black hover:bg-opacity-10
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
            ${closeButtonSizeClasses[size]}
          `}
          aria-label="Remove tag"
        >
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
} 