'use client';

import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  size = 'md',
  variant = 'outline',
  className = '',
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);

      if (currentPage <= halfVisible + 1) {
        end = maxVisiblePages;
      } else if (currentPage >= totalPages - halfVisible) {
        start = totalPages - maxVisiblePages + 1;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
  };

  const buttonSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const variantClasses = {
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    filled: 'bg-gray-100 hover:bg-gray-200',
  };

  const activeClasses = {
    outline: 'border-blue-500 bg-blue-50 text-blue-600',
    filled: 'bg-blue-600 text-white hover:bg-blue-700',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const renderButton = (
    content: React.ReactNode,
    onClick: () => void,
    isActive = false,
    isDisabled = false
  ) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex items-center justify-center rounded-lg font-medium transition-all duration-200
        ${sizeClasses[size]}
        ${buttonSizeClasses[size]}
        ${isActive ? activeClasses[variant] : variantClasses[variant]}
        ${isDisabled ? disabledClasses : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      {content}
    </button>
  );

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {showFirstLast && (
        <>
          {renderButton(
            '«',
            () => onPageChange(1),
            false,
            currentPage === 1
          )}
          <span className="w-2" />
        </>
      )}

      {showPrevNext && (
        <>
          {renderButton(
            '‹',
            () => onPageChange(currentPage - 1),
            false,
            currentPage === 1
          )}
          <span className="w-1" />
        </>
      )}

      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className={`flex items-center justify-center text-gray-400 ${buttonSizeClasses[size]}`}>
              ...
            </span>
          ) : (
            renderButton(
              page,
              () => onPageChange(page as number),
              page === currentPage
            )
          )}
        </div>
      ))}

      {showPrevNext && (
        <>
          <span className="w-1" />
          {renderButton(
            '›',
            () => onPageChange(currentPage + 1),
            false,
            currentPage === totalPages
          )}
        </>
      )}

      {showFirstLast && (
        <>
          <span className="w-2" />
          {renderButton(
            '»',
            () => onPageChange(totalPages),
            false,
            currentPage === totalPages
          )}
        </>
      )}
    </div>
  );
} 