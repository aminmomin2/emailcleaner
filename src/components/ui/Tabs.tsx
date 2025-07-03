'use client'
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const variantClasses = {
    default: {
      tab: 'border-b-2 border-transparent hover:border-[var(--border)] hover:text-[var(--text-main)] transition-all duration-200',
      active: 'border-[var(--primary)] text-[var(--primary)] font-semibold bg-[var(--border)] bg-opacity-10',
      disabled: 'text-[var(--text-secondary)] cursor-not-allowed opacity-50',
    },
    pills: {
      tab: 'rounded-md hover:bg-[var(--gray-light)] hover:text-[var(--text-main)] transition-all duration-200 border border-transparent',
      active: 'bg-[var(--primary)] text-white font-semibold shadow-sm border-[var(--primary)]',
      disabled: 'text-[var(--text-secondary)] cursor-not-allowed opacity-50',
    },
    underline: {
      tab: 'border-b-2 border-transparent hover:border-[var(--border)] hover:text-[var(--text-main)] transition-all duration-200 relative',
      active: 'border-[var(--accent)] text-[var(--accent)] font-semibold',
      disabled: 'text-[var(--text-secondary)] cursor-not-allowed opacity-50',
    },
  };

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-[var(--border)] mb-6">
        <nav className="flex space-x-8" role="tablist">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const isDisabled = tab.disabled;
            
            const tabClasses = [
              sizeClasses[size],
              'font-medium transition-all duration-200 cursor-pointer relative',
              variantClasses[variant].tab,
              isActive && variantClasses[variant].active,
              isDisabled && variantClasses[variant].disabled,
            ].filter(Boolean).join(' ');

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-disabled={isDisabled}
                className={tabClasses}
                onClick={() => !isDisabled && setActiveTab(tab.id)}
                disabled={isDisabled}
              >
                {tab.label}
                {/* Active indicator dot for pills variant */}
                {variant === 'pills' && isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"></span>
                )}
                {/* Active indicator line for underline variant */}
                {variant === 'underline' && isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs; 