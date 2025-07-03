'use client';

import { useState } from 'react';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  sortable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'simple' | 'bordered';
  className?: string;
}

export default function Table({
  columns,
  data,
  sortable = false,
  striped = false,
  hoverable = true,
  size = 'md',
  variant = 'simple',
  className = '',
}: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    if (!sortable) return;

    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    simple: 'border-b border-gray-200',
    bordered: 'border border-gray-200',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortable || !columns.find(col => col.key === columnKey)?.sortable) {
      return null;
    }

    if (sortConfig?.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }

    return (
      <svg 
        className={`w-4 h-4 ${sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-blue-600 rotate-180'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  ${sizeClasses[size]}
                  ${variantClasses[variant]}
                  ${alignClasses[column.align || 'left']}
                  font-medium text-gray-900
                  ${sortable && column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  ${column.width ? `w-${column.width}` : ''}
                `}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                ${hoverable ? 'hover:bg-gray-50' : ''}
                transition-colors duration-150
              `}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`
                    ${sizeClasses[size]}
                    ${variantClasses[variant]}
                    ${alignClasses[column.align || 'left']}
                    text-gray-900
                  `}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
} 