'use client';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case 'circular':
        return { width: 'w-12', height: 'h-12' };
      case 'rectangular':
        return { width: 'w-full', height: 'h-32' };
      case 'text':
      default:
        return { width: 'w-full', height: 'h-4' };
    }
  };

  const defaultDims = getDefaultDimensions();
  const customWidth = width ? (typeof width === 'number' ? `w-${width}` : width) : defaultDims.width;
  const customHeight = height ? (typeof height === 'number' ? `h-${height}` : height) : defaultDims.height;

  return (
    <div
      className={`
        animate-pulse bg-gray-200
        ${getVariantClasses()}
        ${customWidth}
        ${customHeight}
        ${className}
      `}
    />
  );
} 