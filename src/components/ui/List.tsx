'use client';

interface ListItem {
  id: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface ListProps {
  items: ListItem[];
  variant?: 'unordered' | 'ordered' | 'none';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'loose';
  markerColor?: 'gray' | 'blue' | 'green' | 'red' | 'yellow';
  className?: string;
}

export default function List({
  items,
  variant = 'unordered',
  size = 'md',
  spacing = 'normal',
  markerColor = 'gray',
  className = '',
}: ListProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const spacingClasses = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-3',
  };

  const markerColorClasses = {
    gray: 'text-gray-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
  };

  const getMarker = (index: number) => {
    switch (variant) {
      case 'ordered':
        return `${index + 1}.`;
      case 'unordered':
        return '•';
      case 'none':
      default:
        return null;
    }
  };

  const getListTag = () => {
    switch (variant) {
      case 'ordered':
        return 'ol';
      case 'unordered':
      case 'none':
      default:
        return 'ul';
    }
  };

  const ListTag = getListTag();

  return (
    <ListTag className={`${spacingClasses[spacing]} ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`
            flex items-start
            ${sizeClasses[size]}
            ${item.disabled ? 'opacity-50' : ''}
          `}
        >
          {variant !== 'none' && (
            <span
              className={`
                flex-shrink-0 mr-2 mt-0.5 font-medium
                ${markerColorClasses[markerColor]}
              `}
            >
              {getMarker(index)}
            </span>
          )}
          <span className={item.disabled ? 'text-gray-400' : 'text-gray-900'}>
            {item.content}
          </span>
        </li>
      ))}
    </ListTag>
  );
} 