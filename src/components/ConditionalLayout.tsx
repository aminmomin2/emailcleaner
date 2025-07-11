'use client';

import { usePathname } from 'next/navigation';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';

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
  
  // For non-auth pages, render with Topbar and Sidebar
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar - full width at the top */}
      <Topbar />
      
      {/* Main content area with sidebar and content */}
      <div className="flex-1 flex">
        {/* Sidebar - fixed width on the left, starts below topbar */}
        <Sidebar className="pt-5"/>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 