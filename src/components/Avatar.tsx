import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  
  const baseClasses = 'inline-flex items-center justify-center rounded-full bg-[var(--gray-light)] text-[var(--text-secondary)] font-medium overflow-hidden';
  
  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={combinedClasses}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{fallback ? getInitials(fallback) : 'U'}</span>
      )}
    </div>
  );
};

export default Avatar; 