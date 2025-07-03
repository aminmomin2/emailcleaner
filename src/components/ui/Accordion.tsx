'use client';

import { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bordered' | 'separated';
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  size = 'md',
  variant = 'bordered',
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const variantClasses = {
    bordered: 'border border-gray-200 rounded-lg',
    separated: 'border-b border-gray-200 last:border-b-0',
  };

  const isOpen = (itemId: string) => openItems.includes(itemId);

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`
            ${variantClasses[variant]}
            ${item.disabled ? 'opacity-50' : ''}
          `}
        >
          <button
            onClick={() => !item.disabled && toggleItem(item.id)}
            disabled={item.disabled}
            className={`
              w-full flex items-center justify-between text-left transition-colors duration-200
              ${paddingClasses[size]}
              ${sizeClasses[size]}
              ${item.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
            `}
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <svg
              className={`
                w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0
                ${isOpen(item.id) ? 'rotate-180' : ''}
              `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            id={`accordion-content-${item.id}`}
            className={`
              overflow-hidden transition-all duration-200 ease-in-out
              ${isOpen(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className={`${paddingClasses[size]} pt-0`}>
              <div className="text-gray-600">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 