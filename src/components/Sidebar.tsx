'use client';

import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  // Map pathnames to nav item IDs
  const pathToNavId: Record<string, string> = {
    '/': '',
    '/myreviewqueue': 'myreviewqueue',
    '/activity-log': 'activity-log',
    '/knowledge-base': 'knowledge-base',
    '/preferencesandrules': 'preferencesandrules',
  };
  const initialActive = pathToNavId[pathname] || '';
  const [activeItem, setActiveItem] = useState(initialActive);

  // Keep activeItem in sync with route changes
  useEffect(() => {
    setActiveItem(initialActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const router = useRouter();

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    router.push(`/${itemId}`);
  };

  const navItems: NavItem[] = [
    {
      id: '',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      isActive: activeItem === '',
    },
    {
      id: 'myreviewqueue',
      label: 'My Review Queue',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badge: 3,
      isActive: activeItem === 'myreviewqueue',
    },
    {
      id: 'activity-log',
      label: 'Activity Log',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      isActive: activeItem === 'activity-log',
    },
    {
      id: 'knowledge-base',
      label: 'Knowledge Base',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      isActive: activeItem === 'knowledge-base',
    },
  ];

  const settingsItems: NavItem[] = [
    {
      id: 'preferencesandrules',
      label: 'Preferences & Rules',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      isActive: activeItem === 'preferencesandrules',
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      isActive: activeItem === 'integrations',
    },
  ];

  const supportItems: NavItem[] = [
    {
      id: 'help-support',
      label: 'Help & Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      isActive: activeItem === 'help-support',
    },
  ];

  const renderNavItem = (item: NavItem) => (
    <Button
      key={item.id}
      variant={item.isActive ? 'accent' : 'ghost'}
      size="md"
      fullWidth
      onClick={() => handleNavClick(item.id)}
      className={`justify-start text-left h-12 px-4 ${item.isActive ? 'bg-[var(--accent)] text-[var(--primary)]' : 'hover:bg-[var(--gray-light)]'}`}
    >
      <div className="flex items-center w-full">
        <span className={`mr-3 ${item.isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}>
          {item.icon}
        </span>
        <span className="flex-1 font-medium">{item.label}</span>
        {item.badge && (
          <span className="ml-auto bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
            {item.badge}
          </span>
        )}
      </div>
    </Button>
  );

  return (
    <div className={`w-70 bg-white border-r border-[var(--border)] h-full flex flex-col ${className}`}>
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Main Navigation */}
          <div className="space-y-2">
            {navItems.map(renderNavItem)}
            {settingsItems.map(renderNavItem)}
            {supportItems.map(renderNavItem)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
          <span>AI Assistant</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
