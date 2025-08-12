'use client';

import { usePathname } from 'next/navigation';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth');
  
  if (isAuthPage) {
    // For auth pages, render children directly without navigation
    return <>{children}</>;
  }
  
  // For non-auth pages, render children directly (no sidebar/topbar)
  return <>{children}</>;
} 