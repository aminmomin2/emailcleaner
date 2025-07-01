'use client';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: 'slash' | 'chevron' | 'arrow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Breadcrumb({
  items,
  separator = 'slash',
  size = 'md',
  className = '',
}: BreadcrumbProps) {
  const separatorIcons = {
    slash: '/',
    chevron: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const separatorSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <nav className={`flex items-center space-x-2 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className={`mx-2 text-gray-400 ${separatorSizeClasses[size]}`}>
                {separatorIcons[separator]}
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className={`
                  flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200
                  ${sizeClasses[size]}
                  ${index === items.length - 1 ? 'text-gray-900 font-medium' : ''}
                `}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </a>
            ) : (
              <span
                className={`
                  flex items-center space-x-1
                  ${sizeClasses[size]}
                  ${index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}
                `}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 