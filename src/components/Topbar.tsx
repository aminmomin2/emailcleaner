'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

interface TopbarProps {
  onSearch?: (query: string) => void;
  onQuickCommand?: (command: string) => void;
  onToggleAI?: (enabled: boolean) => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notificationCount?: number;
  aiEnabled?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({
  onSearch,
  onQuickCommand,
  onToggleAI,
  onNotificationsClick,
  notificationCount = 0,
  aiEnabled = true,
}) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [quickCommand, setQuickCommand] = useState('');
  const [isAIPaused, setIsAIPaused] = useState(!aiEnabled);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleQuickCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCommand.trim() && onQuickCommand) {
      onQuickCommand(quickCommand.trim());
      setQuickCommand('');
    }
  };

  const handleAIToggle = (enabled: boolean) => {
    setIsAIPaused(!enabled);
    onToggleAI?.(enabled);
  };

  return (
    <header className="bg-white border-b border-[var(--border)] shadow-sm sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Left Section: Logo */}
          <div className="flex items-center flex-shrink-0 mr-20">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[var(--primary)]">OmniDo</h1>
          </div>
          
          {/* Center Section: Global Search */}
          <div className="flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search my knowledge graph..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
                size="md"
              />
              <Button
                type="submit"
                variant="transparent"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-[var(--gray-light)]"
              >
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </form>
          </div>
          
          {/* Right Section: Quick Command and Controls */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Quick Command Bar */}
            <div className="hidden xl:block">
              <form onSubmit={handleQuickCommand} className="relative">
                <Input
                  type="text"
                  placeholder="Quick command..."
                  value={quickCommand}
                  onChange={(e) => setQuickCommand(e.target.value)}
                  className="w-80 pr-10"
                  size="md"
                />
                <Button
                  type="submit"
                  variant="transparent"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-[var(--gray-light)]"
                >
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Button>
              </form>
            </div>

            {/* AI Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={!isAIPaused}
                onChange={handleAIToggle}
                size="md"
                label={isAIPaused ? "Manual Mode" : "AI Active"}
                className="whitespace-nowrap"
              />
              {isAIPaused && (
                <Badge variant="warning" size="sm">
                  PAUSED
                </Badge>
              )}
            </div>

            {/* Notifications */}
            <Button
              onClick={onNotificationsClick}
              variant="neutral"
              size="icon"
              className="relative hover:bg-[var(--gray-light)]"
            >
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v4.5l2.5 2.5H2.5L5 14.25v-4.5a6 6 0 0 1 6-6z" />
              </svg>
              {notificationCount > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs"
                >
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            {isLoading ? (
              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="hidden lg:block">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-32 mt-1"></div>
                </div>
              </div>
            ) : isAuthenticated && user ? (
              <div className="relative">
                <Button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  variant="neutral"
                  size="icon"
                  className="flex items-center space-x-3 p-2 hover:bg-[var(--gray-light)] rounded-lg transition-colors"
                >
                  <Avatar
                    src={user.image || undefined}
                    fallback={user.name || 'User'}
                    size="md"
                  />
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-[var(--text-main)]">
                      {user.name || 'User'}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {user.email}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = '/auth/signin'}
                variant="primary"
                size="sm"
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
